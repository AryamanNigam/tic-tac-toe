const cell = (() => {
    return function () {
      let value = 0;
  
    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addMarker, getValue };
    };
})();

const gameBoard = (() => {
    const rows = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = []; 
      for (let j = 0; j < rows; j++) {
        board[i].push(cell());
      }
    }

    const getBoard = () => board;
    
    
    const checkWinning = (player) => {
        for (let i = 0; i < rows; i++) {
            if (board[i][0].getValue() == board[i][1].getValue() && board[i][0].getValue() == board[i][2].getValue() && board[i][0].getValue() != 0) {
                return true;
            }
        }
        for (let i = 0; i < rows; i++) {
            if (board[0][i].getValue() == board[1][i].getValue() && board[0][i].getValue() == board[2][i].getValue() && board[0][i].getValue() != 0) {
                return true;
            }
        }
        if (board[0][0].getValue() == board[1][1].getValue() && board[0][0].getValue() == board[2][2].getValue() && board[0][0].getValue() != 0) {
            return true;
        }
        if (board[0][2].getValue() == board[1][1].getValue() && board[0][2].getValue() == board[2][0].getValue() && board[0][2].getValue() != 0) {
            return true;
        }

        return false;
    }

    const reset = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = []; 
            for (let j = 0; j < rows; j++) {
              board[i].push(cell());
            }
        }
    }


    return { getBoard, checkWinning, reset };
})();

function player(marker, count){
    return{
        marker: marker,
        count: count
    };
}

const domControl = (() => {
    const buttons = document.querySelectorAll(".gameBoard button");
    const indicator = document.getElementById("indicator"); 
    let currentPlayer = "X"; 
    let moveCount = 0;

    buttons.forEach((button, index) => {
        button.style.backgroundColor = "azure";  

        button.addEventListener("click", () => {
            if (button.textContent === "") { 
                button.style.backgroundColor = currentPlayer === "X" ? "lightblue" : "red";

                let row = Math.floor(index / 3);
                let col = index % 3;

                gameBoard.getBoard()[row][col].addMarker(currentPlayer);

                moveCount++;
                if (gameBoard.checkWinning("X")) {
                    indicator.textContent = "Player One wins!";
                    return;
                } else if (gameBoard.checkWinning("O")) {
                    indicator.textContent = "Player One wins!";
                    return;
                }

                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if(currentPlayer === "X"){
                    indicator.textContent = "Player One's Turn";
                }
                else{
                    indicator.textContent = "Player Two's Turn";
                }

                if (moveCount === 9) {
                    indicator.textContent = "It's a draw!";
                }
            }
        });
    });

    const again = document.getElementById("again");

    again.addEventListener("click", () => {
        buttons.forEach((button) => {
            button.style.backgroundColor = "azure";
            button.textContent = "";
        });
        indicator.textContent = "Player One's Turn";
        currentPlayer = "X";
        moveCount = 0;
        gameBoard.reset();
    });
})();
