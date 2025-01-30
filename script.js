let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
// console.log(typeof(boxes)); -> object

let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; 
let count = 0; // to count the draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
          // PlayerO
          box.style.color = "brown";
          box.innerText = "O";
          turnO = false;
          count++;
        }
        else{
          // PlayerX
          box.style.color = "blue";
          box.innerText = "X";
          turnO = true;
          count++;
        }
        box.disabled = true;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});


const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const gameDraw = () => {
    msg.innerText = `Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText; 

        if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                showWinner(pos1Value);
                return true;
            }
        }
    }
};


const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame);