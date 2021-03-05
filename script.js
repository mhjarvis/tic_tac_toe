'use strict'

//---------------------------------GAMEBOARD OBJECT----------------------------------
const Gameboard = (() => {     //build gameboard using module pattern
    
    const board = ["", "", "", "", "", "", "", "", ""];
    const container = document.getElementById('container');
    const getBoxClass = document.getElementsByClassName("box");

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
        console.log(board);
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
    console.log(winningValues);
    Gameboard.buildGameBoard();
    
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = whoGoesFirst();            //'player1' or 'player2'
    const box = document.querySelectorAll('.box');
    const message = document.getElementById('message');
    playerTurnDisplay(currentPlayer.name);
    message.innerText = " ";

    console.log(currentPlayer);

    //add event listener for each div (box)
    box.forEach((box) => {
        box.addEventListener('click', () => {
            if(box.innerText == ""){                //test box for current value
                let currentPlayer = getCurrentPlayer();
                addMarker(box.id, currentPlayer);
                let isWinner = checkWin(currentPlayer.marker);
                if(isWinner == true) {
                    message.innerText = currentPlayer.name + " won the game!";
                } 
                else if(checkForTie() == true) {
                    message.innerText = "It's a tie!";
                }
                else {
                    updateCurrentPlayer();
                }
            } else {
                return;
            }
        })
    })
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
            return player1;
        } else {
            return player2;
        }
    }
    //function to switch player
    function updateCurrentPlayer() {
        let temp = getCurrentPlayer();
        playerTurnDisplay(temp.name);
        if(temp == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function playerTurnDisplay(player) {
        let element = document.getElementById('playerTurn');
        element.innerText = "It is " + player + "'s turn";
    }

    const playAgainButton = document.querySelector('#playAgain');
    playAgainButton.addEventListener('click', () => {
        Gameboard.resetBoard();
    });

})();
