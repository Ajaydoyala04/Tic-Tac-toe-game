//   fetch krne ke liye document.querySelector ka use krte h 
const boxex = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn =  document.querySelector(".btn");


let currentplayer;
let gamegrid;

const winningposition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialise the game

 function initGame(){
      currentplayer="X";
      gamegrid = ["","","","","","","","",""];
      //UI me bi to update krna hoga yrr
      boxex.forEach((box, index) =>{
        box.innerText = "";
        boxex[index].style.pointerEvents = "all";
         //one more thing is missing , initialise box with css properties again
         box.classList =`box box${index+1}`;
      });
        
      newgamebtn.classList.remove("active");
      gameinfo.innerText = `Current Player - ${currentplayer}`;

 }
initGame();


function swapturn(){
    if(currentplayer === "X"){
        currentplayer = "O"
    }
    else{
        currentplayer = "X"
    }
    //UI update
    gameinfo.innerText=`current player - ${currentplayer}`;
}

function checkgameover(){
   let answer = "";
    winningposition.forEach((position) => {
        //all three boxex be non-empty and exactly same in value
        if( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")
        && (gamegrid[position[0]]=== gamegrid[position[1]] ) && (gamegrid[position[1]] ===gamegrid[position[2]])) {
          
        //check  if winner is X
         if(gamegrid[position[0]] === "X")
          answer = "X";
        else
         answer = "O";

         //disable pointer events
          boxex.forEach((box) => {
            box.style.pointerEvents = "none" ;
          })

         //now we konw X/O is a winner
              boxex[position[0]].classList.add("win");
              boxex[position[1]].classList.add("win");
              boxex[position[2]].classList.add("win");
        
        }
    });
        
           //if means we have a winner
            if(answer !== "") {
                gameinfo.innerText = `Winner is - ${answer}`;
                newgamebtn.classList.add("active");
                return;
            }


            //let's check weather tere is tied

            let fillCount = 0;
            gamegrid.forEach((box) => {
                if(box != "")
                fillCount++;
            });

            //board is filled , game is tie
            if (fillCount === 9){
                gameinfo.innerText = "oohhooo game tie ho gya !";
                newgamebtn.classList.add("active");
            }
           
        }



function handleClick(index) {
    if(gamegrid[index] ===""){
        boxex [index].innerText=currentplayer; //box me update krne ka mtlb UI me update krna
        gamegrid[index] = currentplayer;  //jo grid hmne bna rakha h usme change krna hoga
        boxex[index].style.pointerEvents = "none"
        //swap kro turn ko
        swapturn();
        //check kro ki koi jeet to nhi gya
        checkgameover();
    }
}
 

boxex.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
}); 


newgamebtn.addEventListener("click" , initGame)