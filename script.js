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
    
    const insertMarker = (x, y, marker) => {
        if (board[x][y].getValue() != 0) {
            console.log("This cell is already taken");
            let a = parseInt(prompt("Enter other X coordinate"));
            let b = parseInt(prompt("Enter other Y coordinate"));
            insertMarker(a, b, marker);
        }
        else{
            board[x][y].addMarker(marker);
        }
    }
    
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

    const printBoard = () => {
        console.table(board.map(row => row.map(cell => cell.getValue())));
    };

    return { getBoard, printBoard, insertMarker, checkWinning };
})();

function player(marker, count){
    return{
        marker: marker,
        count: count
    };
}

const gameControl = (() => {
    const playerOne = player('X', 0);
    const playerTwo = player('O', 0);

    let count = 0;

    while(count != 9){
        gameBoard.printBoard();
        let x = parseInt(prompt("Enter X coordinate"));
        let y = parseInt(prompt("Enter Y coordinate"));

        
        if(playerOne.count == playerTwo.count){
            gameBoard.insertMarker(x, y, playerOne.marker);
            if(gameBoard.checkWinning()){
                gameBoard.printBoard();
                console.log("Player 1 wins");
                break;
            }
            else{
                playerOne.count++;
            }    
        }

        else{
            gameBoard.insertMarker(x, y, playerTwo.marker);
            if(gameBoard.checkWinning()){
                gameBoard.printBoard();
                console.log("Player 2 wins");
                break;
            }
            else{
                playerTwo.count++;
            }   
        }
        count++;
    }
})();