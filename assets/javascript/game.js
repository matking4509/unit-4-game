// Toggle console.logs for debugging.
var debugLogs = true;
function debugPrint(label, output) {
    if (debugLogs) {
        console.log(label, output);
    }
};

debugPrint("test", "thing");
debugPrint("debugLogs on?", debugLogs);

// Define Dictionary Object 
var crystalObj = {
    name : ["Earth",
            "Wind",
            "Fire",
            "Water"],
    image : ["Crystal-1.png",
             "Crystal-2.png",
             "Crystal-3.png",
             "Crystal-4.png"
             ],
    point : [25, 20, 15, 10, 5, 2, 1]
  };

  var gameAdv = false; // Flag to use limited guesses 
  var guessCnt = 0; // Total Number of Guesses per game
  var pointRecordAry = []; // Blank Array to hold Point Selections
  var targetNumber = 0; // Placeholder for Target Points
  var gameOver = false; // Flag to note eng of game.
  var winCnt = 0; // Count of wins
  var loseCnt = 0; // count of losses