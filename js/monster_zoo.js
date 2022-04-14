/*jshint esversion: 6 */

// global variables

let ctx, gameCharacter, myMaze;
var kinetic;

/**
 *  Setting up the tracking data
 */
function SetupKineticTracker() {
  "use strict";
  var config = {
    scoreThreshold: 80,
    loginThreshold: 80,
    defaultPin: 1111,
    disableChallenge: true,
  };
  
  var options = {
    logging: false,
    trackingTimeSensitivity: 10,
    mouseTrackingElement: "#trackarea",
    debug: true,
    autoTracking: false,
    appKey: "dDqRXIOfv3xzAsy",
    appSecret:
      "Aj912UuwQ1R4qxihN9li6S8A0I/T1NpxRytoG70f6eTiczwVffFaZYItpBCkJHFvvQ==",
    trackingInterval: 60,
    sensorPollingFrequency: 10,
    packageId: "monsterzoo.app.com",
  };
  kinetic = new ZFS.KineticTracker(options);
  kinetic.init();
}

/**
 *  Display Game board
 */
function DisplayGame() {
  const MAZE_ROWS = 10;
  const MAZE_COLS = 10;

  // setting the event handlers

  // set an event handler for all input boxes and select box (any element that has the class 'inValue')
  document.querySelectorAll(".inValue").forEach(function (item) {
    item.addEventListener("change", gameCharacter.drawOnCanvas);
  });
  // set an event handler for all buttons (any button that has the class 'moveBtn')
  document.querySelectorAll(".moveBtn").forEach(function (item) {
    item.addEventListener("click", moveBtnClick);
  });

  document
    .getElementById("drawingBox1")
    .addEventListener("keydown", canvasKeyDown);

  myMaze = new Maze();

  myMaze.generateMaze(MAZE_ROWS, MAZE_COLS);

  ctx = getCanvasContext("drawingBox1");

  myMaze.drawMaze(ctx);

  let shapeColor = "#aaaaff";
  let shapeToBeDrawn = drawHappyMonster;
  let w = myMaze.mazeCellWidth;
  let h = myMaze.mazeCellHeight;
  let x = myMaze.mazeExitBottom * w;
  let y = (myMaze.maze.length - 1) * myMaze.mazeCellHeight;

  gameCharacter = new Character(x, y, w, h, shapeToBeDrawn, shapeColor);

  gameCharacter.drawOnCanvas(ctx);
}

function Maze() {
  this.mazeCellWidth = 0;
  this.maze = 0;
  this.mazeCellHeight = 0;
  this.currentMazeCellCol = 0;
  this.currentMazeCellRow = 0;
  this.mazeExitBottom = 0;
  this.mazeExitTop = 0;

  this.generateMaze = function (rows, cols) {
    "use strict";

    let row, col, randDir;
    this.maze = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.maze[i] = new Array(cols);
      this.maze[i].fill(0);
    }

    row = rows - 1;
    col = Math.floor(Math.random() * cols);
    this.mazeExitBottom = col;
    this.maze[row][col] = 1;

    do {
      randDir = Math.floor(Math.random() * 5);
      switch (randDir) {
        case 0:
          col--;
          if (col < 0) col = 0;
          break;
        case 1:
          if (row >= 1) this.maze[row - 1][col] = 1;
          row--;
          col--;
          if (row < 0) row = 0;
          if (col < 0) col = 0;
          break;
        case 2:
          row--;
          if (row < 0) row = 0;
          break;
        case 3:
          if (row >= 1) this.maze[row - 1][col] = 1;
          row--;
          col++;
          if (row < 0) row = 0;
          if (col >= cols) col = cols - 1;
          break;
        case 4:
          col++;
          if (col >= cols) col = cols - 1;
          break;
      }
      this.maze[row][col] = 1;
    } while (row > 0);

    this.mazeExitTop = col;
  };
  this.drawMaze = function (ctx) {
    "use strict";
    const MAZE_BLOCK_COLOR = "#000";
    const MAZE_PATH_COLOR = "lightcyan";
    let cellColor;

    this.mazeCellWidth = ctx.canvas.width / this.maze[0].length;
    this.mazeCellHeight = ctx.canvas.height / this.maze.length;

    for (let row = 0; row < this.maze.length; row++) {
      for (var col = 0; col < this.maze[row].length; col++) {
        cellColor =
          this.maze[row][col] === 0 ? MAZE_BLOCK_COLOR : MAZE_PATH_COLOR;
        drawRectangle(
          ctx,
          col * this.mazeCellWidth,
          row * this.mazeCellHeight,
          this.mazeCellWidth,
          this.mazeCellHeight,
          cellColor,
          cellColor,
          0
        );
      }
    }
  };
}

function Character(x, y, w, h, shapeToBeDrawn, shapeColor) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.shapeColor = shapeColor;

  this.moveStep = myMaze.mazeCellHeight;
  this.shapeToBeDrawn = shapeToBeDrawn;
  this.drawOnCanvas = function (ctx) {
    "use strict";
    myMaze.currentMazeCellCol = Math.round(this.x / myMaze.mazeCellWidth);
    myMaze.currentMazeCellRow = Math.round(this.y / myMaze.mazeCellWidth);
    if (myMaze.currentMazeCellRow < myMaze.maze.length) {
      shapeToBeDrawn(ctx, this.x, this.y, this.w, this.h, this.shapeColor);
      ctx.canvas.focus();
    }
  };
  this.moveShape = function (ctx, direction) {
    "use strict";
    ctx.clearRect(this.x, this.y, this.w, this.h);
    switch (direction) {
      case "NW":
        this.x -= this.moveStep;
        this.y -= this.moveStep;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        break;
      case "N":
        this.y -= this.moveStep;
        if (this.y < 0) this.y = 0;
        break;
      case "NE":
        this.x += this.moveStep;
        this.y -= this.moveStep;
        if (this.x > ctx.canvas.width - this.w)
          this.x = ctx.canvas.width - this.w;
        if (this.y < 0) this.y = 0;
        break;
      case "W":
        this.x -= this.moveStep;
        if (this.x < 0) this.x = 0;
        break;
      case "E":
        this.x += this.moveStep;
        if (this.x > ctx.canvas.width - this.w)
          this.x = ctx.canvas.width - this.w;
        break;
      case "SW":
        this.x -= this.moveStep;
        this.y += this.moveStep;
        if (this.x < 0) this.x = 0;
        if (this.y > ctx.canvas.height - this.h)
          this.y = ctx.canvas.height - this.h;
        break;
      case "S":
        this.y += this.moveStep;
        if (this.y > ctx.canvas.height - this.h)
          this.y = ctx.canvas.height - this.h;
        break;
      case "SE":
        this.x += this.moveStep;
        this.y += this.moveStep;
        if (this.x > ctx.canvas.width - this.w)
          this.x = ctx.canvas.width - this.w;
        if (this.y > ctx.canvas.height - this.h)
          this.y = ctx.canvas.height - this.h;
        break;
      case "C":
        this.x = (ctx.canvas.width - this.w) / 2; // setting the x to the center of the canvas horizontally
        this.y = (ctx.canvas.height - this.h) / 2; // setting the y to the center of the canvas vertically
        break;
      default:
        alert("Undefined direction!");
    }

    this.drawOnCanvas(ctx);
  };
}

function moveBtnClick(e) {
  let direction = e.currentTarget.id;

  if (
    (direction === "N" &&
      myMaze.maze[myMaze.currentMazeCellRow - 1][myMaze.currentMazeCellCol] ===
        1) ||
    (direction === "S" &&
      myMaze.maze[myMaze.currentMazeCellRow + 1][myMaze.currentMazeCellCol] ===
        1) ||
    (direction === "E" &&
      myMaze.maze[myMaze.currentMazeCellRow][myMaze.currentMazeCellCol + 1] ===
        1) ||
    (direction === "W" &&
      myMaze.maze[myMaze.currentMazeCellRow][myMaze.currentMazeCellCol - 1] ===
        1) ||
    (direction === "NW" &&
      myMaze.maze[myMaze.currentMazeCellRow - 1][
        myMaze.currentMazeCellCol - 1
      ] === 1) ||
    (direction === "NE" &&
      myMaze.maze[myMaze.currentMazeCellRow - 1][
        myMaze.currentMazeCellCol + 1
      ] === 1) ||
    (direction === "SE" &&
      myMaze.maze[myMaze.currentMazeCellRow + 1][
        myMaze.currentMazeCellCol + 1
      ] === 1) ||
    (direction === "SW" &&
      myMaze.maze[myMaze.currentMazeCellRow + 1][
        myMaze.currentMazeCellCol - 1
      ] === 1)
  ) {
    gameCharacter.moveShape(ctx, direction);
  }
}

function canvasKeyDown(e) {
  "use strict";

  let direction;

  e.preventDefault();

  switch (e.code) {
    case "ArrowUp":
      if (e.shiftKey) direction = "NW";
      else if (e.ctrlKey) direction = "NE";
      else direction = "N";
      break;
    case "ArrowDown":
      if (e.shiftKey) direction = "SW";
      else if (e.ctrlKey) direction = "SE";
      else direction = "S";
      break;
    case "ArrowLeft":
      direction = "W";
      break;
    case "ArrowRight":
      direction = "E";
      break;
    default:
      if (e.shiftKey && e.ctrlKey && e.altKey) {
        direction = "C";
      }
      break;
  }

  if (
    (direction === "N" &&
      myMaze.maze[myMaze.currentMazeCellRow - 1][myMaze.currentMazeCellCol] ===
        1) ||
    (direction === "S" &&
      myMaze.maze[myMaze.currentMazeCellRow + 1][myMaze.currentMazeCellCol] ===
        1) ||
    (direction === "E" &&
      myMaze.maze[myMaze.currentMazeCellRow][myMaze.currentMazeCellCol + 1] ===
        1) ||
    (direction === "W" &&
      myMaze.maze[myMaze.currentMazeCellRow][myMaze.currentMazeCellCol - 1] ===
        1) ||
    (direction === "NW" &&
      myMaze.maze[myMaze.currentMazeCellRow - 1][
        myMaze.currentMazeCellCol - 1
      ] === 1) ||
    (direction === "NE" &&
      myMaze.maze[myMaze.currentMazeCellRow - 1][
        myMaze.currentMazeCellCol + 1
      ] === 1) ||
    (direction === "SE" &&
      myMaze.maze[myMaze.currentMazeCellRow + 1][
        myMaze.currentMazeCellCol + 1
      ] === 1) ||
    (direction === "SW" &&
      myMaze.maze[myMaze.currentMazeCellRow + 1][
        myMaze.currentMazeCellCol - 1
      ] === 1)
  ) {
    gameCharacter.moveShape(ctx, direction);
  }
}

$("#PlayerDetails").submit(function (e) {
  e.preventDefault();
  var playerName = document.getElementById("playerName").value;
  SavePlayer(playerName, function (error, response) {
    if (error) {
      alert(error);
    }
  });
});


/**
 * Function to get/save player
 * @param {*} playerName 
 * @param {*} savePlayerCallback 
 */
function SavePlayer(playerName, savePlayerCallback) {
  var playerData = {
    name: playerName,
    uCode: playerName,
  };
  kinetic.getProfile(playerData, function (error, profileData) {
    if (error) {
      savePlayerCallback(error.data.errors[0].message);
    } else {
      localStorage.setItem("profileCode", profileData.data.profileCode);
      localStorage.setItem("userName", playerName);
      alert(`${playerName},You can Start Playing`);
      document.getElementById("PlayerDetails").style.display = "none";
      document.getElementById(
        "PlayerTitle"
      ).innerHTML = ` Welcome ${playerName}`;
      DisplayGame();
    }
  });
}

/**
 *  Start tracking the game board
 */
function StartTrackingGameBoard() {
  kinetic.trackStart();
  document.getElementById("startTracking").style.display = "none";
  document.getElementById("stopTracking").style.display = "block";
  var TrackingArea = document.getElementById("trackarea");
  TrackingArea.classList.add("tracking");
}

/**
 *  Stop tracking the game board and report the activities.
 */
function StopTrackingGameBoard() {
  StopTrackingAndReportAction();
  document.getElementById("stopTracking").style.display = "none";
  document.getElementById("startTracking").style.display = "block";
  var TrackingArea = document.getElementById("trackarea");
  TrackingArea.classList.remove("tracking");
}


function StopTrackingAndReportAction() {
  var profileCode = localStorage.getItem("profileCode");
  kinetic.trackStop(function (trackData) {
    var transRefId = makeTransRefId();
    var body = {
      gestureInfo: trackData,
      profileCode: profileCode,
      transRefId: transRefId,
    };
    
    kinetic.checkGesture(body, function (error, gestureData) {
      if (error) {
        alert(JSON.stringify(error));
      } else {
        localStorage.setItem("transRefId", gestureData.refId);
        localStorage.setItem("appRefId", gestureData.data.reqRefId);
        reportAction("allow", gestureData, true);
      }
    });
  });
}

function makeTransRefId() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

  for (var i = 0; i < 37; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function reportAction(action, checkResp, allowTransaction) {
  var inputData = {
    profileCode: localStorage.getItem("profileCode"),
    action: action,
    refId: checkResp.refId,
    type: checkResp.data.type ? checkResp.data.type : "gesture",
  };
  kinetic.reportAction(inputData, function (error, outputData) {
    if (error) {
      console.log(JSON.stringify(error));
    }

    console.log("reportAction outputData: " + JSON.stringify(outputData));
  });
}
