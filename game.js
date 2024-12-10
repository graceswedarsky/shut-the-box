console.log("game on");

const firstDice = document.querySelector("#first-dice");
const secondDice = document.querySelector("#second-dice");

const startGameBtn = document.querySelector("#startGame-btn");
const rollBtn = document.querySelector("#roll-btn");
const individualBtn = document.querySelector("#individual-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const resetBtn = document.querySelector("#reset-div");

const playerOne = document.querySelector("#user1-input");
const playerTwo = document.querySelector("#user2-input");
const playerNames = document.querySelector("#vs");
const player = document.querySelector("#player");
const diceGrid = document.querySelector("#dice-grid");
const dice = document.querySelector("#dice");
const board = document.querySelector("#board");
const round = document.querySelector("#round");
const scoreTable = document.querySelector("#scoreTable");

const winner = document.querySelector("#winner");
const loser = document.querySelector("#loser");
const p1Name = document.querySelector("#p1name");
const p2Name = document.querySelector("#p2name");
const scoreCard = document.querySelector("#scorecard");

let boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let p1Pts = 0;
let p2Pts = 0;

dice.style.display = "none";
diceGrid.style.display = "none";
board.style.display = "none";
scoreCard.style.display = "none";
winner.style.display = "none";
loser.style.display = "none";
resetBtn.style.display = "none";

let value1 = playerOne.value.trim();
let value2 = playerTwo.value.trim();
let roundValue = 1;

startGameBtn.addEventListener("click", function(){
    value1 = playerOne.value.trim();
    value2 = playerTwo.value.trim();

    if (value1 === "" || value2 === ""){
        alert("One of the names are empty.");
    } else {
        round.textContent = ("Round " + roundValue);
        playerNames.textContent = (value1 + " vs " + value2);
        player.textContent = (value1 + "'s Turn");
        p1Name.textContent = value1;
        p2Name.textContent = value2;

        individualBtn.disabled = true;
        sumBtn.disabled = true;
        endBtn.disabled = true;
    }
    if (value1 != "" && value2 != ""){
        dice.style.display = "block";
        diceGrid.style.display = "block";
        board.style.display = "block";
        scoreCard.style.display = "block";
        playerOne.style.display = "none";
        playerTwo.style.display = "none";
        startGameBtn.style.display = "none";
        rollBtn.disabled = false;

        console.log(value1);
        console.log(value2);
    }
});
dice1 = rollDice();
dice2 = rollDice();
// the event listener for the roll button
rollBtn.addEventListener("click", function(){
    // generate new random numbers
    dice1 = rollDice();
    dice2 = rollDice();
    // update the icon picture to match the numbers
    firstDice.className = `bi bi-dice-${dice1}`;
    secondDice.className = `bi bi-dice-${dice2}`;
    if((dice1 === dice2 && (dice1 + dice2) <=9) && boxes.at(dice1 + dice2) != "X")
    {
        individualBtn.disabled = true;
        rollBtn.disabled = true;
        sumBtn.disabled = false;
        console.log("sum")
    }else{
    if((dice1 + dice2) <=9 && (boxes.at(dice1) != "X" && boxes.at(dice2) != "X" && boxes.at(dice1 + dice2) != "X"))
    {
        individualBtn.disabled = false;
        rollBtn.disabled = true;
        sumBtn.disabled = false;
        console.log("indiv or sum")
    } else{
    if((dice1 + dice2) <=9 && (boxes.at(dice1) != "X" && boxes.at(dice2) != "X" && (dice1 != dice2)))
    {
        individualBtn.disabled = false;
        rollBtn.disabled = true;
        sumBtn.disabled = true;
        console.log("indiv")
    } else{
    if((dice1 + dice2) <=9 && (boxes.at(dice1 + dice2) != "X"))
    {
        individualBtn.disabled = true;
        rollBtn.disabled = true;
        sumBtn.disabled = false;
        console.log("sum")
    } else{
    if((dice1 + dice2) >9 && (boxes.at(dice1) != "X" && boxes.at(dice2) != "X" && (dice1 != dice2)))
    {
        individualBtn.disabled = false;
        rollBtn.disabled = true;
        sumBtn.disabled = true;
        console.log("indiv")
    } else{
    if((dice1 + dice2) >9 && (boxes.at(dice1) === "X" && boxes.at(dice2) === "X" && (dice1 === dice2)))
    {
        individualBtn.disabled = true;
        sumBtn.disabled = true;
        endBtn.disabled = false;
        rollBtn.disabled = true;
        console.log("end turn")
    } else{
    if((dice1 + dice2) >9 && (dice1 === dice2))
    {
        individualBtn.disabled = true;
        sumBtn.disabled = true;
        endBtn.disabled = false;
        rollBtn.disabled = true;
        console.log("end turn")
    } else{
    if(individualBtn.disabled === true && sumBtn.disabled === true)
    {
        individualBtn.disabled = true;
        sumBtn.disabled = true;
        endBtn.disabled = false;
        rollBtn.disabled = true;
        console.log("end turn")
    }
}
}
}
}
}
}
}
});
function rollDice(){
    const diceNumber = Math.floor(Math.random()*6)+1;
    return diceNumber;
    dice1 = rollDice();
    dice2 = rollDice();
}
sumBtn.addEventListener("click", function(){
    boxes[dice1 + dice2] = "X";
    boxes[0] = boxes[0] + (dice1 + dice2);
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    shut(dice1 + dice2);
});
individualBtn.addEventListener("click", function(){
    boxes[dice1]= "X";
    boxes[dice2] = "X";
    boxes[0] = boxes[0] + (dice1 + dice2);
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    shut(dice1);
    shut(dice2);
});
endBtn.addEventListener("click", function(){
    rollBtn.disabled = false;
    endBtn.disabled = true;
    console.log((45-boxes[0]));
    let points = (45-boxes[0]);
    if(player.textContent === (value1 + "'s Turn")){
        p1Pts = p1Pts + points;
        const row = buildRow(roundValue, points);
        document.querySelector("tbody").insertAdjacentElement("beforeend", row);
        player.textContent = (value2 + "'s Turn")
    } else{
        player.textContent = (value1 + "'s Turn")
        p2Pts = p2Pts + points;
        document.querySelector(`#round${roundValue} .p2Pts`).textContent = points;
        roundValue = roundValue + 1;
        round.textContent = ("Round " + roundValue);
    };
    resetBoard();
    if(roundValue>5){
        console.log("Game Over");
        rollBtn.disabled = true;
        dice.style.display = "none";
        diceGrid.style.display = "none";
        board.style.display = "none";
        scoreCard.style.display = "none";
        winner.style.display = "block";
        loser.style.display = "block";
        if(p1Pts<p2Pts){
            console.log("Player 1 Won");
            winner.textContent = `${value1} won with a total of ${p1Pts} points!`;
            loser.textContent = `${value2} had ${p2Pts} points.`;
            resetBtn.style.display = "block";
        } else if(p2Pts<p1Pts){
            console.log("Player 2 Won");
            winner.textContent = `${value2} won with a total of ${p2Pts} points!`;
            loser.textContent = `${value1} had ${p1Pts} points.`;
            resetBtn.style.display = "block";
        } else{
            console.log("Tied");
            winner.textContent = `${value1} and ${value2} tied with a total of ${p1Pts} apiece`;
            loser.style.display = "none";
            resetBtn.style.display = "block";
        }
    }
});
resetBtn.addEventListener("click", function(){
    dice.style.display = "none";
    diceGrid.style.display = "none";
    board.style.display = "none";
    scoreCard.style.display = "none";
    winner.style.display = "none";
    loser.style.display = "none";
    resetBtn.style.display = "none";
    p1Pts = 0;
    p2Pts = 0;
    value1.textContent = "";
    value2.textContent = "";
    playerOne.style.display = "block";
    playerTwo.style.display = "block";
    startGameBtn.style.display = "block";
    roundValue = 1;
    document.querySelector("tbody").innerHTML = "";
});
function shut(boxNumber){
    const card = document.querySelector(`#box${boxNumber}`);
    card.className = "bi bi-x-square";
};
function resetBoard(){
    boxes.fill(0);
    const cards = document.querySelectorAll(".numbers i");
    cards [0].className = "bi bi-1-square";
    cards [1].className = "bi bi-2-square";
    cards [2].className = "bi bi-3-square";
    cards [3].className = "bi bi-4-square";
    cards [4].className = "bi bi-5-square";
    cards [5].className = "bi bi-6-square";
    cards [6].className = "bi bi-7-square";
    cards [7].className = "bi bi-8-square";
    cards [8].className = "bi bi-9-square";
};
const newRow = document.createElement("tr");
const rowH = document.createElement("th");
const p1td = document.createElement("td");
const p2td = document.createElement("td");

function buildRow(round, pts){
    const newRow = document.createElement("tr");
    const rowH = document.createElement("th");
    const p1td = document.createElement("td");
    const p2td = document.createElement("td");
    newRow.id = `round${round}`;
    rowH.textContent = `Round ${round}`;
    p1td.className = "p1Pts";
    p1td.textContent = pts;
    p2td.className = "p2Pts";

    newRow.insertAdjacentElement("beforeend",rowH);
    newRow.insertAdjacentElement("beforeend",p1td);
    newRow.insertAdjacentElement("beforeend",p2td);

    return newRow;
};
