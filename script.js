'use strict'

const Player = (name, marker) => {
    return {name, marker};
};

//---------------------------------GAMEBOARD----------------------------------------
const gameboard = (() => {                  //build gameboard using module
    
    let board = ["", "", "", "", "", "", "", "", ""];

    const buildGameBoard = () => {
        for(let i = 0; i < 9; i++) {
            let container = document.getElementById('container');
            const div = document.createElement('div');
            container.appendChild(div);
            div.className = "box";
            div.id = ("box" + i);
            div.innerText = board[i];
        }
    }
    function resetBoard() {
        board = [];
        console.log({board});
    }
    return (buildGameBoard(), resetBoard());


    // function buildGameBoard() {
    //     let container = document.getElementById('container');
        
    //     for(let i = 0; i < 9; i++) {
    //         board.push("");
    //     }
    //     for(let i = 0; i < 9; i++) {
    //         const div = document.createElement('div');
    //         container.appendChild(div);
    //         div.className = "box";
    //         div.id = ("box" + i);
    //         div.innerText = board[i];
    //     }
    //     console.log("Board built");
    // }

//event listeners


    // const box = document.querySelectorAll('.box');
    // box.forEach((box) => {
    //     box.addEventListener('click', () => {
    //         addMarker(box.id);
    //     })
    // })
    // function addMarker(id) {
    //     const box = document.getElementById(id);
    //     if(box.innerText == "x")
    //         box.innerText = "O";
    //     else
    //         return;
    // };




    // const playAgainButton = document.querySelector('#playAgain');
    // playAgainButton.addEventListener('click', resetAll);

    // function resetAll() {
        
    //     console.log(board);
    // }

    //change marker display in clicked box




})();


//------------------------------------GAME CONTROLLER-----------------------------------
const gameController = (() => {

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    function playerTurn() {
        let startingPlayer = whoGoesFirst();

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

    const box = document.querySelectorAll('.box');
    box.forEach((box) => {
        box.addEventListener('click', () => {
            addMarker(box.id);
        })
    })
    function addMarker(id) {
        const box = document.getElementById(id);
        if(box.innerText == "")
            box.innerText = "O";
        else
            return;
    };

    const playAgainButton = document.querySelector('#playAgain');
    playAgainButton.addEventListener('click', resetAll);

    function resetAll() {
        gameboard.resetBoard;
    }


})();
