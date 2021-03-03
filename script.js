'use strict'

//---------------------------------GAMEBOARD----------------------------------------
const gameboard = (() => {                  //build gameboard using module
    
    const board = ["", "", "", "", "", "", "", "", ""];
    let container = document.getElementById('container');

    const buildGameBoard = () => {
        console.log("teeeee");
        for(let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            container.appendChild(div);
            div.className = "box";
            div.id = ("box" + i);
            //div.innerText = board[i];
        }
    }

    const resetBoard = () => {
        //for(let  i = 0; i < board.length; i++) {
          //  board[i] = "x";
            const x = document.getElementsByClassName("box");
            for(let i = 0; i < x.length; i++) {
                board[i] = "e";
                x[i].innerText = board[i];
            }
            console.log(board);
        //}
    };
    // function resetBoard() {
    //     board = ["", "", "", "", "", "", "", "", ""];        
    //     console.log({board});
    // };

    // const b = () => {
    //     board = ["", "", "", "", "", "", "", "", ""];    
    //         alert("HHHHH");
    // }
    
    return {buildGameBoard, resetBoard}; //b());
})();

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






const Player = (name, marker) => {
    return {name, marker};
};

//------------------------------------GAME CONTROLLER-----------------------------------
const gameController = (() => {

    gameboard.buildGameBoard();
    

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
    playAgainButton.addEventListener('click', () => {
        gameboard.resetBoard();
    });




})();
