
// Toggle console.logs for debugging, and write debug function.
var debugLogs = true;
var debugPrint = function(label, output) {
    if (debugLogs) {
        console.log("dbg - ", label, output);
    }
};

// Define Crystal Dictionary Object options. 
// curCrystalObj built from these values.  Only 0-3 will ever be used after Shuffle.
var nameAry = ["Earth","Wind","Fire","Water"];  // Name of Crystals (Feature not implimented yet.)
var imageAry = ["Crystal-1.png","Crystal-2.png","Crystal-3.png","Crystal-4.png"];
var pointAry = [25, 20, 15, 10, 5, 2, 1]; // 7 options, but will only use first 4, after shuffle.

//Placeholder for current values.  Populated at runtime.
var curCrystalObj = {}; // Placeholder for scrambled Cystal Object
var gameAdv = false; // Flag to use limited guesses (Feature Not Implimented)
var guessCnt = 0; // Total Number of Guesses per game
var pointRecordAry = []; // Blank Array to hold Point Selections Not Nessecary, but wanted an internal record of guesses.
var curScore = 0; // Current Score to determine win.
var targetNumber = 0; // Placeholder for Target Points
var gameOver = false; // Flag to note eng of game.
var winCnt = 0; // Count of wins
var loseCnt = 0; // count of losses

// Scramble Crystals, buy shuffleing the dictionary options, then building object.
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
    debugPrint("Scrambled CurCrystalObj :", curCrystalObj);
}

// Select Target Number
function chooseTarget() {
    targetNumber = Math.floor((Math.random()*119))+1;
    debugPrint("TargetNumber: ", targetNumber);
}

// Start Game Function to allow reset of counters/objects.
function startGame() {
    debugPrint("Game Started", gameOver); 
    curCrystalObj = {}; // Placeholder for scrambled Cystal Object
    gameAdv = false; // Flag to use limited guesses 
    guessCnt = 0; // Total Number of Guesses per game
    pointRecordAry = []; // Blank Array to hold Point Selections
    curScore = 0;
    targetNumber = 0; // Placeholder for Target Points
    if (gameOver == false) {
        main();
    } else {
        $('.row').on("click", function() {
            debugPrint("NewGameClick");
            gameOver = false;
            startGame();
        });  
    }
}

// Main Game Code, to call functions.  
function main() {
        scrambleCrystals();
        chooseTarget();
        writeScreen();
        $(".imgBtn").on("click", function() {
            debugPrint("Points: ", curCrystalObj.point[this.id]);
            pointRecordAry.push(curCrystalObj.point[this.id]);
            debugPrint("guesses: ", pointRecordAry);
            curScore = getCurrentScore(pointRecordAry);
            writeScore(curScore, targetNumber);
            checkWinLose(curScore, targetNumber);
        });
}

// Write initial Screen.
function writeScreen() {
    debugPrint("writeScreenObj", this.curCrystalObj);
    $("#crystals").replaceWith("<div id=\"crystals\" class=\"row\"></div>"); //reinstate "crystals row"
    for (var i = 0; i < this.curCrystalObj.image.length; i++) {
        var crysColDiv = $("<div>");
            crysColDiv.attr("id", "box-" + i);
            crysColDiv.addClass("col align-middle text-center border");
            crysColDiv.appendTo("#crystals");
        var crysCardDiv = $("<div>");
            crysCardDiv.attr("id", "crystal-" + i);
            crysCardDiv.addClass("card");
            crysCardDiv.appendTo("#box-" + i);
        var crysCardImg = $("<img>");
            crysCardImg.attr("id", i);
            crysCardImg.addClass("imgBtn");
            crysCardImg.attr("src", "./assets/images/" + this.curCrystalObj.image[i]);
            crysCardImg.attr("height", "75%");
            crysCardImg.appendTo("#crystal-" + i);
    }
    $("#score").replaceWith("<div id=\"score\" class=\"row\"></div>"); //reinstate "score row"
    var scoreColDiv = $("<div>");
        scoreColDiv.attr("id", "scoreDiv");
        scoreColDiv.addClass("col text-center border");
        scoreColDiv.appendTo("#score");
    var scoreText = $("<h2>");
        scoreText.html("Current Energy Points: <span id=\"current-score\">00</span> Target Energy Points: <span class=\"target-num\">00</span>");
        scoreText.appendTo("#scoreDiv");
        $(".target-num").html(targetNumber);
        $("#wins").html(winCnt);
        $("#loss").html(loseCnt);
}

//Calculate current score from Array.  (pass in Array, return score)
function getCurrentScore(scoreAry) {
    var currentScore = 0;
    for (var i = 0; i < scoreAry.length; i++) {
        currentScore += scoreAry[i]; 
    }
    debugPrint("Current Score", currentScore);
    return currentScore;
}

// Update score on screen.
function writeScore(current,target) {
    $("#current-score").html(current);
    $("#target-score").html(target);
}

// Check to see if win or lose condition has been reached.
function checkWinLose(current,target) {
    if (current > target) {
        debugPrint("You've Lost!");
        $("#crystals").replaceWith("<div id=\"crystals\" class=\"row\"></div>");
        var loseColDiv = $("<div>");
        loseColDiv.addClass("card mx-auto");
        loseColDiv.attr("style","width: 50%");
        loseColDiv.attr("id", "lose-card");
        loseColDiv.append("<img class=\"card-img-top\" src=\"./assets/images/coalLose.png\">");
        loseColDiv.append("<div class=\"card-body\"><h2><p class=\"card-text text-center font-weight-bold\">You Lose</p></h2></div>");
        loseColDiv.appendTo("#crystals");
        loseCnt++;
        gameOver=true;
        startGame();
    } else if (current == target) {
        debugPrint("You've Won!");
        $("#crystals").replaceWith("<div id=\"crystals\" class=\"row\"></div>");
        var winColDiv = $("<div>");
        winColDiv.addClass("card mx-auto");
        winColDiv.attr("style","width: 50%");
        winColDiv.attr("id", "win-card");
        winColDiv.append("<img class=\"card-img-top\" src=\"./assets/images/diamondWin.png\">");
        winColDiv.append("<div class=\"card-body\"><h2><p class=\"card-text text-center font-weight-bold\">You Win</p></h2></div>");
        winColDiv.appendTo("#crystals");
        winCnt++;
        gameOver=true;
        startGame();
    }
}