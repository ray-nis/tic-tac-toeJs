let show = document.querySelector("#show");

const players = (() => {
    let currentTurn = "X";
    let xScore = 0;
    let oScore = 0;

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

    const increaseScore = (xo) => {
        if (xo === "X") {
            xScore++;
            showScore();
        }
        else {
            oScore++;
            showScore();
        }
    }

    const showScore = () => {
        document.querySelector("#x-score").innerHTML = "X score: " + xScore;
        document.querySelector("#o-score").innerHTML = "O score: " + oScore;
    }

    return {changeTurn, getCurrentTurn, increaseScore};
})();

const gameBoard = (() => {
    let gameWon = false;
    let board = ["", "", "", "", "", "", "", "", ""];
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


    const checkWin = () => {
        for (let i = 0; i < win.length; i++) {
                if (board[win[i][0]] === "X" && board[win[i][1]] === "X" && board[win[i][2]] === "X") {
                    showWinner(i, "X");
                    players.increaseScore("X");
                    gameWon = true;
                }
                else if (board[win[i][0]] === "O" && board[win[i][1]] === "O" && board[win[i][2]] === "O") {
                    showWinner(i, "O");
                    players.increaseScore("0");
                    gameWon = true;
                }
                else if (board.join("").length  === 9) {
                    showWinner(-1);
                    gameWon = true;
                }
        }
    };

    const showWinner = (index, player) => {
        if (index === -1) {
            document.querySelector("#result").innerText = "Draw";
            document.querySelector("#result-div").style.display = "block";
        }
        else {
            let winner = document.querySelectorAll(".n");
            winner[win[index][0]].style.color = "#42e814";
            winner[win[index][1]].style.color = "#42e814";
            winner[win[index][2]].style.color = "#42e814";
            if (player === "O") {
                document.querySelector("#result").innerText = "O wins";
            }
            else {
                document.querySelector("#result").innerText = "X wins";
            }
            document.querySelector("#result-div").style.display = "block";
            for (let i = 0; i < board.length; i++) {
                if (board[i].length == 0) {
                    board[i] = "";
                }
            }
        }
    };

    const restart = () => {
        gameWon = false;
        board = ["", "", "", "", "", "", "", "", ""];
        show.innerHTML = "";
        renderBoard();
        document.querySelector("#result-div").style.display = "none";
        if (players.getCurrentTurn() === "O") {
            players.changeTurn();
        }
    };

    const renderBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let div = document.createElement("div");
            div.innerHTML = board[i];
            div.setAttribute("id", i);
            div.setAttribute("class", "n");
            div.addEventListener("click",(e) => {
                if (board[e.target.id] === "X" || board[e.target.id] === "O" || gameWon === true) {

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

        document.querySelector("#restart").addEventListener("click", ()=>{
            restart();
        })
    }
    return {renderBoard, checkWin};
})();

gameBoard.renderBoard();