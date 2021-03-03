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
    return {
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

    Gameboard.buildGameBoard();
    
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = whoGoesFirst();            //'player1' or 'player2'
    console.log(currentPlayer);

    //add event listener for each div (box)
    const box = document.querySelectorAll('.box');
    box.forEach((box) => {
        box.addEventListener('click', () => {
            if(box.innerText == ""){                //test box for current value
                let currentPlayer = getCurrentPlayer();
                addMarker(box.id, currentPlayer);
                updateCurrentPlayer();
            } else {
                return;
            }
        })
    })
    //on click, call updateGameboard and update display
    function addMarker(id, player) {
        Gameboard.updateGameBoard(id, player.marker);
    };

    //
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
    function updateCurrentPlayer() {
        let temp = getCurrentPlayer();
        if(temp == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }



    const playAgainButton = document.querySelector('#playAgain');
    playAgainButton.addEventListener('click', () => {
        Gameboard.resetBoard();
    });




})();
