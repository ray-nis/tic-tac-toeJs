let show = document.querySelector("#show");

const players = (() => {
    let currentTurn = "X";

    const changeTurn = () => {
        if (currentTurn === "X") {
            currentTurn = "O";
        }
        else {
            currentTurn = "X";
        }
    }

    const getCurrentTurn = () => {
        return currentTurn;
    }

    return {changeTurn, getCurrentTurn};
})();

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const checkWin = () => {
        let win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < win.length; i++) {
                if (board[win[i][0]] === "X" && board[win[i][1]] === "X" && board[win[i][2]] === "X") {
                    console.log("x wins");
                }
                else if (board[win[i][0]] === "O" && board[win[i][1]] === "O" && board[win[i][2]] === "O") {
                    console.log("o wins");
                }
        }
    };

    const renderBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let div = document.createElement("div");
            div.innerHTML = board[i];
            div.setAttribute("id", i);
            div.addEventListener("click",(e) => {
                if (board[e.target.id] === "X" || board[e.target.id] === "O") {

                }
                else {
                    div.innerHTML = players.getCurrentTurn();
                    board[e.target.id] = players.getCurrentTurn();
                    players.changeTurn();
                    checkWin();
                }
            })
            show.appendChild(div);
        }
    }
    return {renderBoard, checkWin};
})();

gameBoard.renderBoard();