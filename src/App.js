import React from "react";
import Dice from "./components/dice"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  function allNewDice(){
    const randomNumbers = [];

    for(let i = 1; i<11 ; i++){
     const randomNum = Math.ceil(Math.random()*6);

     randomNumbers.push({
       value : randomNum,
       id: nanoid(),
       isHeld: false
     })
    }
    
    return randomNumbers;
  }

  function toggleHeld(id){
    const dice_ = dice.map(die=>{
    return die.id === id? {...die, isHeld:!die.isHeld}:die
   })
   setDice(dice_)
 }
 
 function rollDice(){
   if(!won){
   const newRoll = dice.map(die=>{
     return die.isHeld ? die: {
       value :  Math.ceil(Math.random()*6),
       id: nanoid(),
       isHeld: false
     }
   })
   setDice(newRoll)}
   else{
     setWon(false);
     setDice(allNewDice())
   }
 }


  const [dice, setDice] = React.useState(allNewDice());
  const [won, setWon] = React.useState(false);

  React.useEffect(()=>{
    const allElementAreHeld = dice.every(die=> die.isHeld)
    const allElementsAreSame = dice.every(die=> die.value === dice[0].value)
    if (allElementsAreSame && allElementAreHeld){
      setWon(true)
    }
  },
    
    [dice]
  );


  const diceElements = dice.map(die=> <Dice 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      onClick={()=>toggleHeld(die.id)}

  />);

  return (
    <main className="main-app">
      {won && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
         {diceElements}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}>
          {won? "New Game":"Roll"}
      </button>
    </main>
  );
}


