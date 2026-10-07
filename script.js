let container=document.querySelector('.container')
let boxes=document.getElementsByTagName('td')
let turn = "X";
let xTurn=document.querySelector('.xTurn')
let oTurn=document.querySelector('.oTurn')
const table=document.getElementById('game-board')

const playAgainBtn=document.createElement("button")
playAgainBtn.id="playAgain"
playAgainBtn.innerText="PLAY AGAIN"

const display=document.createElement('img')


//audios

const gameDrawSound=new Audio("../assets/gameDraw.mp3")
const clickSound =new Audio("../assets/gameClick.mp3")
const winSound=new Audio("../assets/gameWin.mp3")
const startSound=new Audio("../assets/gameStart.mp3")
const pageLoad=new Audio("../assets/gameStart.mp3")
pageLoad.play()
let gameBoard=[
    ['','',''],
    ['','',''],
    ['','','']
    
]

let gameOver=false
let winner=null
const win_logic={
        row_win:false,
        row_number:null,
        col_number:null,
        col_win:false,
        ld_win:false,
        rd_win:false,
        draw:false
    }

function winner_Check(){
//row wise check
    for(let row=0; row<=2; row++){
        if(gameBoard[row][0] && gameBoard[row][1] && gameBoard[row][2]){
            
            if(gameBoard[row][0]===gameBoard[row][1] && gameBoard[row][1]===gameBoard[row][2]){

                win_logic.row_win=true
                win_logic.row_number=row
                winner=gameBoard[row][0]
                gameOver=true
                return win_logic
            }
        }
        else{
            continue
        }
    }
    
// column wise check

for(let col=0; col<=2; col++){
        if(gameBoard[0][col] && gameBoard[1][col] && gameBoard[2][col]){
            if(gameBoard[0][col]===gameBoard[1][col] && gameBoard[1][col]===gameBoard[2][col]){

                win_logic.col_win=true
                win_logic.col_number=col
                winner=gameBoard[0][col]
                gameOver=true
                return win_logic
            }
        }
        else{
            continue
        }
    }

//check left diagonal


    
if(gameBoard[0][0] && gameBoard[1][1] && gameBoard[2][2]){
            
    if(gameBoard[0][0]===gameBoard[1][1] && gameBoard[1][1]===gameBoard[2][2]){

        win_logic.ld_win=true
        winner=gameBoard[0][0]
        gameOver=true
        return win_logic
    }
}
//check Right diagonal
if(gameBoard[0][2] && gameBoard[1][1] && gameBoard[2][0]){

    if(gameBoard[0][2]===gameBoard[1][1] && gameBoard[1][1]===gameBoard[2][0]){
        win_logic.rd_win=true
        winner=gameBoard[0][2]
        gameOver=true
        return win_logic
    }
}
else{
    return win_logic
}

}

function checkDraw(){
    
    let flag

    for(row=0; row<=2; row++){
        
        for(col=0; col<=2; col++){
            if(!gameBoard[row][col]){
                flag=1
            }
        }
    }

    if(!flag && !winner){
        win_logic.draw=true
        gameOver=true
        
    }
    return win_logic
}
    

function toggleTurn(){
    if(turn==="X"){
        turn="O"
        oTurn.classList.add('active')
        xTurn.classList.remove('active')
    }
    else{
        turn="X"
        oTurn.classList.remove('active')
        xTurn.classList.add('active')
    }
}

function fillBox(boxId){
    
    let targetBox=document.getElementById(boxId)
    clickSound.play();
    if(targetBox.innerText=="" && gameOver==false){
        gameBoard[boxId[0]][boxId[1]]=turn
        targetBox.innerText=turn
        toggleTurn()
        return true
    }
    else{
        return false
    }
}

function resetBoard(){
    window.location.reload()
    pageLoad.play()
}

function gameEnd(){
    let result=document.createElement('h1')

    result.id="gameResult"
    
    checkDraw()
    if(gameOver && winner){
        result.innerText=`${winner} WINS`
        winSound.play()
        container.appendChild(result)
        
        display.src="../assets/milkandmocha.gif"
        container.appendChild(display)

    }
    else if(win_logic.draw){
        result.innerText="GAME DRAW"
        container.appendChild(result)
       
        gameDrawSound.play();
        container.appendChild(display)
        display.src="../assets/gamedraw.gif"
    }
    
    if(gameOver && winner && win_logic.row_win){

        for(let i=0; i<=2; i++){
            
            let box = document.getElementById(`${win_logic.row_number}${i}`)
            box.style.color="white"
            box.style.backgroundColor='red'
        }
    }
    else if(gameOver && winner && win_logic.col_win){
        for(let i=0; i<=2; i++){
            
            let box = document.getElementById(`${i}${win_logic.col_number}`)
            box.style.color="white"
            box.style.backgroundColor='red'
        }
    }
    else if(gameOver && winner && win_logic.ld_win){
         for(let i=0; i<=2; i++){
            
            let box = document.getElementById(`${i}${i}`)
            box.style.color="white"
            box.style.backgroundColor='red'
        }
    }
    else if(gameOver && winner && win_logic.rd_win){
         
        for(let row=0,col=2; row<=2 && col>=0; row++,col--){
            let box = document.getElementById(`${row}${col}`)
            box.style.color="white"
            box.style.backgroundColor='red'
        }
    }
    // container.appendChild(playAgainBtn)
    // playAgainBtn.addEventListener('click',resetBoard)
}


function gameEngine(){

        
        table.addEventListener('click',(e)=>{
            console.log(e.target.id)
            fillBox(e.target.id)
            if(gameOver===false){ 
                winner_Check()
                gameEnd()
            }
            
        })
    }



function startGame(){
    const startScreen = document.querySelector(".startScreen")
    startScreen.style.display="none"
    container.style.display="flex"
    container.appendChild(playAgainBtn)
    container.appendChild(display)
    display.src=("../assets/initialMocha.gif")
    playAgainBtn.addEventListener('click',resetBoard)
    gameEngine()
    pageLoad.pause()
}


