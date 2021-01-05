function eightBall() {
    let results = ["Yes", "No", "Ask again later", "Most likely", "Very doubtful", "I dont see why not", "No LOL", "For Sure", "Very Certain", "IDK"];
    let result = Math.floor(Math.random() * results.length);
    return `${results[result]}`;
}

module.exports = eightBall;