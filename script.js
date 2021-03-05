'use strict'

//---------------------------------GAMEBOARD OBJECT----------------------------------
const Gameboard = (() => {     //build gameboard using module pattern
    
    const board = ["", "", "", "", "", "", "", "", ""];
    const container = document.getElementById('container');
    const getBoxClass = document.getElementsByClassName("box");
    const setMessage = document.getElementById("playerTurn");

    const buildGameBoard = () => {
        for(let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            container.appendChild(div);
            div.className = "box";
            div.id = (i);
        };
    };
    const resetBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
            getBoxClass[i].innerText = board[i];
        };
            gameController.whoGoesFirst();
    };
    const getGameBoard = () => {
        return board;
    }
    const updateGameBoard = (index, marker) => {
        board[index] = marker;
        for(let i = 0; i < 9; i++) {
            getBoxClass[i].innerText = board[i];
        }
    }
    return {                    //public functions
        buildGameBoard,
        resetBoard,
        getGameBoard,
        updateGameBoard
    };
})();

//---------------------------------PLAYER OBJECT------------------------------------
const Player = (name, marker) => {      //build object with factory function    
    return {name, marker};
};

//---------------------------------GAME CONTROLLER-----------------------------------
const gameController = (() => {         //build game controller with module pattern

    const winningValues = [
        [0, 1, 2], 
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
    ];
    Gameboard.buildGameBoard();

    
    let playerOneScore = 0;
    let playerTwoScore = 0;

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer;
    whoGoesFirst();            //'player1' or 'player2'
    const box = document.querySelectorAll('.box');
    playerTurnDisplay(currentPlayer.name + " goes first!");

    console.log(currentPlayer);

    //add event listener for each div (box)
    box.forEach((box) => {
        box.addEventListener('click', () => {
            if(box.innerText == ""){                //test box for current value
                let currentPlayer = getCurrentPlayer();
                addMarker(box.id, currentPlayer);
                let isWinner = checkWin(currentPlayer.marker);
                if(isWinner == true) {
                    playerTurnDisplay(currentPlayer.name + " won the game!")
                    if(currentPlayer == player2) {
                        playerTwoScore += 1;
                    } else {
                        playerOneScore += 1;
                    }
                    updateScore();
                } 
                else if(checkForTie() == true) {
                    playerTurnDisplay("It's a tie!")
                }
                else {
                    updateCurrentPlayer();
                }
            } else {
                return;
            }
        })
    })
    //check board array for any empty spaces; if none, it is a tie
    function checkForTie() {
        let board = Gameboard.getGameBoard();
        let tie = false;
        for(let i = 0; i < 9; i++) {
            if(board[i] == "") {
                return;
            } else {
                return true;
            }
        }
    }
    //compare current board state to win conditions
    function checkWin(marker) {
        let board = Gameboard.getGameBoard();
        let test = [];
        for(let i = 0; i < 9; i++) {
            if(board[i] == marker) {
                test.push(i);
            }
        }
        for(let j = 0; j < 8; j++) {
            let arr = winningValues[j];
            let ans = isTrue(arr, test)
            if(ans == true) {
                return true;                
            }
        }
    }
    //set and update score display
    const updateScore = () => {
        let p1 = document.getElementById('player1');
        let p2 = document.getElementById('player2');
            p1.innerText = "Player 1: " + playerOneScore;
            p2.innerText = "Player 2: " + playerTwoScore;
    }
    updateScore();
    //check if a winning value (set of 3) is in the current board
    function isTrue(arr, arr2){
        return arr.every(i => arr2.includes(i));
      }
    //on click, call updateGameboard and update display
    function addMarker(id, player) {
        Gameboard.updateGameBoard(id, player.marker);
    };

    //return current player
    function getCurrentPlayer() {
        return currentPlayer;
    }
    //function to determine order of play
    function whoGoesFirst() {
        let num = Math.random() < 0.5;
        if(num) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }
        playerTurnDisplay(currentPlayer.name + " goes first!");
    }
    //function to switch player
    function updateCurrentPlayer() {
        let temp = getCurrentPlayer();
        if(temp == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        playerTurnDisplay("It is " + currentPlayer.name + "'s turn.");
    }
    //update html text with who is the current player
    function playerTurnDisplay(display) {
        let element = document.getElementById('playerTurn');
        element.innerText = display; //"It is " + player + "'s turn";
    }
    //reset the game board
    const playAgainButton = document.querySelector('#playAgain');
    playAgainButton.addEventListener('click', () => {
        Gameboard.resetBoard();
    });
    return{playerTurnDisplay, whoGoesFirst, currentPlayer};
})();
