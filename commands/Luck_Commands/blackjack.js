const { prefix } = require('../../config.json');

module.exports = {
    name: "blackjack",
    description: "play blackjack",
    aliases: ['bj'],
    cooldown: 0,
    async execute(message) {
        const DB = require('djs-economy');
        
        const user = message.author;
        const cash = await DB.GetCash(message.author.id).cash;
        const formatNumber = require('../../functions/regex');

        const args = message.content.slice(prefix.length).trim().split(/ /g);
        let bet = args[1];

        if (!bet) {
            return message.reply(`Invalid Syntax! ${prefix}hl <bet>`).then(m => m.delete({ timeout: 8000 }));
        }

        if (bet < 1 || !Number.isInteger(Number(bet))) {
            if (bet && bet.toLowerCase().includes('k')) {
              const givenKay = bet.replace(/k/g, '');
              if (!Number.isInteger(Number(givenKay * 1000)) || isNaN(givenKay * 1000)) {
                return message.reply('you have to bet a whole number');
              } else {
                bet = givenKay * 1000;
              }
            } else if (bet.toLowerCase() === 'all') {
              bet = cash;
            } else if (bet.toLowerCase() === 'max') {
              bet = Math.min(cash, 5000000);
            } else if (bet.toLowerCase() === 'half') {
              bet = Math.round(cash / 2);
            } else {
              return message.reply('You have to bet cash');
            }
        }

        if (cash === 0) {
            return message.reply('You dont have any cash to bet');
          }
          if (bet > cash) {
            return  message.reply(`You only have ${formatNumber(cash)}. You cant bet more than that`);
          }
          if (bet > 5000000) {
            return message.reply(`You can't bet more than **${formatNumber(5000000)} cash** at a time.`);
          }
          if (bet < 10000) {
            return message.reply(`You cant bet less than ${formatNumber(10000)} cash`);
        }

        let winnings = 0;

        const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    
        let stood = false;
        let first = true;
        
        function deal () {
            // eslint-disable-next-line prefer-const
            let card = { face: faces[Math.floor(Math.random() * faces.length)], suit: suits[Math.floor(Math.random() * suits.length)] };
            return card;
          }
      
          let cards = {
            bot: [deal(), deal()],
            user: [deal(), deal()]
          };
      
          while (addCards('user') === 21 || addCards('bot') === 21) { // redraw
            cards = {
              bot: [deal(), deal()],
              user: [deal(), deal()]
            };
        }
        
        function getRespectiveIcon (suit) {
            switch (suit) {
              case 'spades':
                return '♠';
              case 'hearts':
                return '♥';
              case 'diamonds':
                return '♦';
              case 'clubs':
                return '♣';
            }
        }

        function getValue (card) {
            return { value: values[faces.indexOf(card.face)], card };
        }

        function addCards (type) {
            return cards[type].sort((a, b) => getValue(b).value - getValue(a).value).reduce((p, c) => {
              let newCard = getValue(c).value;
              if (newCard === 1) {
                if (p + 11 <= 21) {
                  newCard = 11;
                }
              }
              return p + newCard;
            }, 0);
        }

        function score () {
            if (addCards('user') > 21) { // User busted
              return { result: false, emoji: 'nope', message: 'You lose! Busted!' };
            } else if (addCards('bot') > 21) { // Bot busted
              return { result: true, emoji: 'ok', message: 'You win! Your opponent busted!' };
            } else if (addCards('user') === 21) { // User has exactly 21
              return { result: true, emoji: 'ok', message: 'You win! You have 21!' };
            } else if (addCards('bot') === 21) { // Bot has exactly 21
              return { result: false, emoji: 'nope', message: 'You lose! Your opponent reached 21 before you!' };
            } else if (addCards('bot') === addCards('user') && stood) { // Tie
              return { result: null, emoji: 'empty', message: 'You tied with your opponent!' };
            } else if (addCards('user') <= 21 && cards.user.length === 5) { // User took more than 5 cards without going over 21
              return { result: true, emoji: 'ok', message: 'You win! You took 5 cards without going over 21.' };
            } else if (addCards('bot') <= 21 && cards.bot.length === 5) { // Bot took more than 5 cards without going over 21
              return { result: false, emoji: 'nope', message: 'You lose! Your opponent took 5 cards without going above 21.' };
            } else if (addCards('bot') > addCards('user') && stood) {
              // If the bot has a score of 17 or more and the user has less than the bot, and the user is also stood
              return { result: false, emoji: 'nope', message: `You lose! You have ${addCards('user')}, Dealer has ${addCards('bot')}.` };
            } else if (addCards('user') > addCards('bot') && stood) {
              // If the user has a higher score than the bot and they are
              return { result: true, emoji: 'nope', message: `You win! You have ${addCards('user')}, Dealer has ${addCards('bot')}.` };
            } else {
              return addCards('user'); // else
            }
          }
          
          const gambed = async (final) => {
            const status = score();
            let desc = '';
            if (status.constructor === Object) {
              const coinCheck = await DB.GetCash;
              if (bet > coinCheck.cash) {
                await DB.SubCash(message.author.id, (bet / 2));
                return message.reply(`You cant afford to pay your bet anymore. I took half your bet instead`);
              }
              let finalMsg = '';
              // Win
              if (status.result) {
                winnings = Math.ceil(bet); // ceil here to avoid winnings being 0
                winnings = Math.floor(bet)
                await DB.AddCash(message.author.id, winnings);
                const newCash = await DB.GetCash(message.author.id)
                finalMsg += `\nYou won **${winnings.toLocaleString()}** cash. You now have ${(formatNumber(newCash.cash))}.`;
              } else {
                // Tie
                if (status.result === null) {
                  const newCash = await DB.GetCash(message.author.id)
                  finalMsg += `Your cash hasn't changed! You have ${formatNumber(newCash.cash)} cash still.`;
                } else {
                  // Loss
                  await DB.SubCash(message.author.id, bet);
                  const newCash = await DB.GetCash(message.author.id);
                  finalMsg += `You lost **${Number(bet).toLocaleString()}** cash. You now have ${(formatNumber(newCash.cash)).toLocaleString()}.`;
                }
              }
              final = true;
              desc = `**${status.message}** ${finalMsg}`;
            }
            const satisfied = final;
            message.channel.send({ content: !final ? `${first ? 'What do you want to do?\n' : ''}Type \`h\` to **hit**, type \`s\` to **stand**, or type \`e\` to **end** the game.` : '',
              embed: {
                author:
                  {
                    name: `${user.username}'s blackjack game`,
                    icon_url: user.displayAvatarURL({ dynamic: true })
                  },
                color: final ? status.result === null ? 16757504 : (winnings ? 5025616 : 15022389) : 2533018,
                description: desc,
                fields: [
                  {
                    name:  message.author.username,
                    value: `Cards - **${cards.user.map(card => `[\`${getRespectiveIcon(card.suit)} ${card.face}\`](https://google.com)`).join('  ')}**\nTotal - \`${addCards('user')}\``,
                    inline: true
                  },
                  { // Always show the first card, all other cards are unknown until stood or final is called
                    name: 'WOK',
                    value: `Cards - **${cards.bot.slice(0, satisfied ? cards.bot.length : 2).map((card, i) => (!i || satisfied) ? `[\`${getRespectiveIcon(card.suit)} ${card.face}\`](https://google.com)` : '`?`').join('  ')}**\nTotal - \`${
                      satisfied ? addCards('bot') : ' ? '}\``,
                    inline: true
                  }
                ],
                footer: { text: !final ? 'K, Q, J = 10  |  A = 1 or 11' : '' }
              }
            });
            first = false;
            if (final) return;
            message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 2e4, errors: ['time'] }).then(choice => {
              switch (choice.first().content.toLowerCase().slice(0, 1)) {
                case 'h':
                  cards.user.push(deal());
                  return gambed();
                case 's':
                  stood = true;
                  return dealersTurn(stood);
                case 'e':
                  return message.reply('You ended the game');
                default:
                  return message.reply('Thats not a valid response');
              }
            }).catch((err) => {
              if (err) return message.reply('You need to respond to me');
            })
              
          };
      
          const dealersTurn = (end) => {
            if (addCards('user') > 21) {
              return gambed();
            }
            const thoughts = [];
            if (cards.bot.length < 5) {
              if (addCards('bot') <= 16) {
                thoughts.push('Drawing.');
                cards.bot.push(deal());
              } else {
                thoughts.push('Standing.');
              }

              if (end) {
                return dealersTurn();
              }
            }
            return gambed();
          };
          return gambed();      
      
    }
}