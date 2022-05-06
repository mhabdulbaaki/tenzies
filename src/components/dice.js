import React from "react";


export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }


    return <div className="dice-face" style={styles} onClick={props.onClick}>
        <h3>{props.value}</h3>
    </div>
}