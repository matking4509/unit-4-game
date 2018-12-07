// Toggle console.logs for debugging, and write debug function.
var debugLogs = true;
var debugPrint = function(label, output) {
    if (debugLogs) {
        console.log(label, output);
    }
};

// Define Crystal Dictionary Object 
var nameAry = ["Earth","Wind","Fire","Water"];
var imageAry = ["Crystal-1.png","Crystal-2.png","Crystal-3.png","Crystal-4.png"];
var pointAry = [25, 20, 15, 10, 5, 2, 1];

//Placeholder for current values.  Populated at runtime.
var curCrystalObj = {}; // Placeholder for scrambled Cystal Object
var gameAdv = false; // Flag to use limited guesses 
var guessCnt = 0; // Total Number of Guesses per game
var pointRecordAry = []; // Blank Array to hold Point Selections
var targetNumber = 0; // Placeholder for Target Points
var gameOver = false; // Flag to note eng of game.
var winCnt = 0; // Count of wins
var loseCnt = 0; // count of losses

function scrambleCrystals() {
    // Scramble Crystal Information, and load into curCrystalObject
    curCrystalObj["name"] = shuffle(nameAry);
    curCrystalObj["image"] = shuffle(imageAry);
    curCrystalObj["point"] = shuffle(pointAry);
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    };
    debugPrint("CurCrystalObj :", curCrystalObj);
}

function main() {
    scrambleCrystals();
}

//define key clicks

