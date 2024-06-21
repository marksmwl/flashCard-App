import { CardContent, Card, Button } from "@mui/material"
import '../styles/card.css'
import React from "react"

function CardRep(props) {
    const [back, setBack] = React.useState(false)

    function flipCard() {
        setBack(true)
    }

    function flipCardToFront() {
        setBack(false)
    }

    function deleteCard() {
        const body = {
            frontContent: props.frontContent,
            username: atob(localStorage.getItem('usr'))
        }

        fetch('http://localhost:8000/deleteCard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(response=>{
            props.func(Math.random())
           
        })
    }
    

    return (
        <>
            <Card className="card-rep">
                {/* <span className="subject">
                    {props.subject}
                </span> */}
                <span className="subject">
                    <Button variant="outlined" onClick={!back ? flipCard : flipCardToFront}>{!back ? 'View Answer' : 'View Question'}</Button>
                </span>
                <CardContent className={!back ? "front-content" : "front-content-hidden"}>
                   <p> {props.frontContent} </p>
                </CardContent>
                <CardContent className={back ? "back-content" : "back-content-hidden"}>
                   <p> {props.backContent} </p> 
                </CardContent>
                <span className="card-rep">
                    <Button variant="outlined" onClick={deleteCard}>Delete Card</Button>
                </span>
            </Card>
        </>
    )
}

export default CardRep