
// Toggle console.logs for debugging, and write debug function.
var debugLogs = true;
var debugPrint = function(label, output) {
    if (debugLogs) {
        console.log("dbg - ", label, output);
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
var curScore = 0;
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
    debugPrint("Scrambled CurCrystalObj :", curCrystalObj);
}

function chooseTarget() {
    targetNumber = Math.floor((Math.random()*119))+1;
    debugPrint("TargetNumber: ", targetNumber);
}

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

function writeScreen() {
    debugPrint("writeScreenObj", this.curCrystalObj);
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
        // <div id="score" class="col text-center">
        //     <h2>Current Energy Points: <span id="current-score">00</span> Target Energy Points: <span id="target-score">00</span></h2>
        // </div>
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

function getCurrentScore(scoreAry) {
    var currentScore = 0;
    for (var i = 0; i < scoreAry.length; i++) {
        currentScore += scoreAry[i];
        
    }
    debugPrint("Current Score", currentScore);
    return currentScore;
}

function writeScore(current,target) {
    $("#current-score").html(current);
    $("#target-score").html(target);
}

function checkWinLose(current,target) {
    if (current > target) {
        alert("you lose");
        loseCnt++;
    } else if (current == target) {
        alert("you win");
        winCnt++;
    }
}
//define key clicks
// $(".crystal-image").on("click", function() {
// $(".imgBtn").on("click", function() {
//     debugPrint("object: ", "That");
// });