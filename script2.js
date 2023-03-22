const wordEl = document.getElementById("word");
const notification = document.getElementById("notification-container");
const wrongLettersEl = document.getElementById("wrong-letters");
const figure = document.querySelectorAll('.figure-part');
const popupContainer = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");

//array of words
const words = ["application", "programming", "interface", "wizard"];
let randomSolution = words[Math.floor(Math.random()*words.length)];
//array of guess
const rightGuesees=[];
let wrongGusessArr=[];
//FUNCTIONS
// place the random word into the UI,and reveal correct letters
 function hidenSolution(){
wordEl.innerHTML=''
randomSolution.split('')
.forEach((letter)=>{
wordEl.innerHTML += `
<span class='letter'> 
${(rightGuesees.includes(letter))?letter:''} 
</span> 
 `; 
})
//check win
let innerText =''
innerText = wordEl.innerText.replace(/\n/g, "");
if(innerText===randomSolution)notificationCenter('win')
 }
 //handle notification
 const notificationCenter = (letter)=>{
switch(letter){
  case 'lose':
popupContainer.style.display='flex'
finalMessage.innerHTML='Game-Over 😒'
window.document.removeEventListener("keyup", handleKeyupEvent);
break;
case 'win':
window.document.removeEventListener("keyup", handleKeyupEvent);
popupContainer.style.display = "flex";
finalMessage.innerHTML = "congratulation, you won the Game 😁";
break;
default:
notification.classList.add('show')
notification.innerHTML = `<p>You have already used the letter <span class='big-letter'>"${letter}"</span></p>`;
setTimeout(()=>{notification.classList.remove("show");},2000)
break;
}
 }
 //Reveal figure
 const revealFigure = ()=>{
 if(figure.length!==wrongGusessArr.length){
figure.forEach((part,index)=>{
 if(index<wrongGusessArr.length){
part.style.display='block'
 }
 })
}else{
//lose
notificationCenter('lose')
}
 }
//handle with wrong solution
function wrongGuesses(letter){
if(!wrongGusessArr.includes(letter)){
 wrongGusessArr.push(letter)
wrongLettersEl.innerHTML=(wrongGusessArr.length>0)?`<p>wrong letters</p>`:''
wrongGusessArr.map((l) => {
  wrongLettersEl.innerHTML += `<span>${l}</span>`;
});
revealFigure()
}else{
notificationCenter(letter)
}
}
//handle with keyupEvent-
//1.check if it is a valid charechter 2.if it on the randomSolution 3.if this letter had not been before
function handleKeyupEvent({key}){
if(/^[A-Za-z]$/.test(key)){
if(!randomSolution.includes(key)){
wrongGuesses(key)
}else{
if(!rightGuesees.includes(key)){
    rightGuesees.push(key)
    hidenSolution()
}else{
notificationCenter(key)
}
}
}
}
//restart
const restart =()=>{
 popupContainer.style.display = "none";
  finalMessage.innerHTML = ""; 
  wrongLettersEl.innerHTML="";
  figure.forEach(figure=>figure.style.display='none')
  wrongGusessArr.splice(0);
  rightGuesees.splice(0);

  randomSolution = words[Math.floor(Math.random() * words.length)];
  window.document.addEventListener("keyup", handleKeyupEvent);
 hidenSolution();
}
//Event
window.document.addEventListener('keyup',handleKeyupEvent)
playBtn.addEventListener('click',restart)
hidenSolution()
