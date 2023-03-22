const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const startBtn = document.querySelector(".start");
const figureParts = document.querySelectorAll(".figure-part");
const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random()*words.length)];
console.log(selectedWord);
let counter=0;
const correctLetters=[];
let wrongLetter = [];

//show hidden word

function displayWord(){
    wordEl.innerHTML=`
    ${selectedWord.split('')
      .map(
          letter=>
            ` <span class='letter'>
                  ${correctLetters.includes(letter)?letter : ""}
              </span>
           `
            )
      .join('')
}
    `;
const innerWord = wordEl.innerText.replace(/\n/g,'')
console.log(innerWord);
if(innerWord===selectedWord){
    finalMessage.innerText='congratulation! you won! 😉'
    popup.style.display='flex'
}
}


const wrongAnswer = (letter)=>{
    //display wrongs letters
    if (!wrongLetter.includes(letter) ){
        wrongLetter.push(letter);
        wrongLettersEl.innerHTML = `
           ${wrongLetter.length > 0 ? "<p>Wrong</p>" : ""}
           ${wrongLetter.map((letter) => `<span>${letter}</span>`).join('')}
         `;
    revealPartOfFigure()
  }else{showNotification(letter)}
 console.log(wrongLetter);
}

//showNotification func. occur when we press letter that we pressed allready, either it inside the word(selectedWord) or not
const showNotification =(letter)=>{
    notification.innerHTML = `  <p>You have already entered the letter <span class="big-letter"> ${letter} </span></p>`;
    notification.classList.add('show')
    setTimeout(()=>{
        notification.classList.remove('show')

    },2000)
}
const revealPartOfFigure = ()=>{

    //display parts figure
    figureParts.forEach((part,index)=>{
     if (index < wrongLetter.length) {
       part.style.display = "block";
     } else {
       part.style.display = "none";
     }
    })
    //check if lost
    if(wrongLetter.length===figureParts.length){
    finalMessage.innerHTML=`unfortunately you lost 😒`
    popup.style.display='flex';
    }
}
//restart
const restart =()=>{
     popup.style.display = "none";
     wrongLetter.splice(0)
     correctLetters.splice(0)
     selectedWord = words[Math.floor(Math.random() * words.length)];
    wrongLettersEl.innerHTML=''
    figureParts.forEach(part=>part.style.display='none')
    displayWord()

}
//EVENTS
window.addEventListener('keydown',e=>{
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key.toLowerCase()
      if( !selectedWord.includes(letter)){
       wrongAnswer(letter)
      }else{
          if(!correctLetters.includes(letter)){
              correctLetters.push(letter)
          }else{showNotification(letter)}
      }
    } 
    //restart game
    playAgainBtn.addEventListener("click",restart)
    displayWord()
})
displayWord();
