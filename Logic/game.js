const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("./gameover.mp3");
const movesound = new Audio("./move.mp3");
const musicsound = new Audio("./music.mp3");

let game = document.querySelector(".game");
let board = document.querySelector(".board");
let speed = 5;
let lastpasttime = 0;
let snakearr = [{ x: 13, y: 15 }];
let food = { x: 5, y: 5 };
let inputDir = { x: 0, y: 0 };
let score =0;
let scorebox=document.querySelector("#scorebox");
let hiscorebox=document.querySelector("#hiscorebox");
let hiscoreval;

function isCollide(snakearr){
    //if bump into yourself
    for(let i=1;i<snakearr.length;i++){
        if(snakearr[i].x===snakearr[0].x && snakearr[i].y === snakearr[0].y) return true;
    }
    //if bump into wall
    if(snakearr[0].x>=18||snakearr[0].x<=0||snakearr[0].y>=18||snakearr[0].y<=0) return true;

    return false;
}

function gameengine() {
    //update
    if(isCollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over!! Press any key to restart the game");
        score =0;
        scorebox.innerText="Score:"+score;
        snakearr = [{ x: 13, y: 15 }];
        musicsound.play();
    }
    //after eating food,increase score and regenrate food
    if(snakearr[0].x === food.x && snakearr[0].y===food.y){
        score +=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "HiScore: " + hiscoreval;
        }
        scorebox.innerText="Score:"+score;
        foodsound.play();
        snakearr.unshift({x:snakearr[0].x + inputDir.x , y:snakearr[0].y +inputDir.y});
        let a = 2; let b = 16;
        food = {x:Math.floor(a+(b-a)*Math.random()),y:Math.floor(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakearr.length-2; i>=0; i--){
        snakearr[i+1] = {...snakearr[i]};       
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y +=inputDir.y;

    //display
    //display snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snkaeelement = document.createElement("div");
        snkaeelement.style.gridRowStart = e.y;
        snkaeelement.style.gridColumnStart = e.x;
        if (index == 0) {
            snkaeelement.classList.add("head");
        }
        else {
            snkaeelement.classList.add("snake");
        }
        board.appendChild(snkaeelement);
    });
    //display food
    foodelement = document.createElement("div");
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add("food");
    board.appendChild(foodelement);
}

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpasttime) / 1000 < 1 / speed) {
        return;
    }
    lastpasttime = ctime;
    gameengine();
}


//main logic
musicsound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore==null){
    hiscoreval =0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="Hiscore:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",(e) =>{
    inputDir ={x:0,y:1};
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
