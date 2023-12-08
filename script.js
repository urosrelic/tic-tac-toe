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
    };

    const handleClick = (event) => {
        const clickedSquare = event.target;
        const array = Gameboard.getGameboardArray;


        if (clickedSquare.classList.contains('square')) {
            let idArray = clickedSquare.id.split('-');
            let clickedSquareId = parseInt(idArray[1]);
            console.log(clickedSquareId);

            
            if(array[clickedSquareId] !== "") {
                return;
            }

            Gameboard.update(clickedSquareId, players[currentPlayerIndex].sign);
            nextTurn();
        }
    };

    const nextTurn = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        let currentPlayer = currentPlayerIndex === 0 ? 'X' : 'O';
        playerDiv.textContent = `Player ${currentPlayer}'s turn`;
    }

    return {
        start
    };
})();

window.onload = () => {
    Game.start();
};
