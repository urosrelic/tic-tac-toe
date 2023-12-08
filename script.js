const Gameboard = (() => {
    let gameboard = document.querySelector('.gameboard');
    let gameboardArray = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let squareHTML = '';
        gameboardArray.forEach((square, index) => {
            squareHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });

        gameboard.innerHTML = squareHTML;
    };

    const update = (index, value) => {
        gameboardArray[index] = value;
        render();
    };

    // Property to access the gameboard element
    const getGameboardElement = gameboard;

    const getGameboardArray = gameboardArray;

    return {
        render,
        update,
        getGameboardElement,
        getGameboardArray
    };
})();

const createPlayer = (sign) => {
    return {
        sign
    };
};

const Game = (() => {
    const restartButton = document.querySelector('.restart');
    let players = [];
    let playerDiv = document.querySelector('.player');
    let currentPlayerIndex;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer("X"), // Index 0
            createPlayer("O") // Index 1
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        playerDiv.textContent = `Player X's turn`;

        Gameboard.render();

        const gameboardElement = Gameboard.getGameboardElement;
        gameboardElement.addEventListener('click', handleClick);

        restartButton.addEventListener('click', restart);
    };

    const handleClick = (event) => {
        const clickedSquare = event.target;
        const array = Gameboard.getGameboardArray;

        if(gameOver) {
            return;
        }

        if (clickedSquare.classList.contains('square')) {
            let idArray = clickedSquare.id.split('-');
            let clickedSquareId = parseInt(idArray[1]);
            console.log(clickedSquareId);

            
            if(array[clickedSquareId] !== "") {
                return;
            }

            Gameboard.update(clickedSquareId, players[currentPlayerIndex].sign);

            if(checkWin(array, players[currentPlayerIndex].sign)) {
                gameOver = true;
                alert(`${players[currentPlayerIndex].sign} won`);
            } else if(checkDraw(array)) {
                alert("Draw");
            }

            nextTurn();

        }
    };

    function checkWin(gameboardArray) {
        const winningCombinations = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]; // destructuring
            if(gameboardArray[a] !== '' && gameboardArray[a] === gameboardArray[b] && gameboardArray[a] === gameboardArray[c]) {
                return true;
            }
        }
        return false;
    }

    function checkDraw(gameboardArray) {
        return allSquaresFilled = gameboardArray.every(square => square !== '');
    }

    const nextTurn = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        let currentPlayer = currentPlayerIndex === 0 ? 'X' : 'O';
        playerDiv.textContent = `Player ${currentPlayer}'s turn`;
    }

    const restart = () => {
        for(let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
        start();
    }

    return {
        start
    };
})();

window.onload = () => {
    Game.start();
};
