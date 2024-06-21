import '../styles/box.css'
import React from "react";

export default function Pitch(props:any) {
    const [visible, setVisible] = React.useState(true)


    

    return(
        <>
            <h1 className={props.state ? 'centered-text-in' : 'centered-text-out'} >Flashcards take time, get help from AI.</h1>
           
        </>
    )
}