
import Header from '../components/header'
import React, { useEffect } from 'react'
import CardRep from '../components/card'


export default function CardManager() {
    const [cards, setCards] = React.useState([])
    const [change, setChange] = React.useState([])
    const [subjects, setSubjects] = React.useState([])

    const myCardMap = new Map()
    

    // when the page is first loaded and when the change variable changes values, refresh the collection of cards
    useEffect(()=> {
        function getCards() {
            const body = {
                'username': atob(localStorage.getItem('usr'))
            }
            fetch('http://localhost:8000/getCards/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json()
            })
            .then(data => {
            // Process the parsed JSON data
                const cardCollection = JSON.parse(data['cards'])
                setCards(cardCollection)
                for (let card of cardCollection) {
                    const subject = card.subject
                    if (!myCardMap.has(subject))
                        myCardMap.set(subject, [card])
                    else {
                        myCardMap.get(subject).push(card)
                    }
                }
             })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }

        getCards()
        
    }, [change])
        
    


    return (
        <>
        <header>
            <Header></Header>
        </header>
        <main>
          
            <span className='card-container'>
                {cards.slice(-4).map((card, index) => (
                    <CardRep key={index} subject={card.subject} func={setChange} frontContent={card.frontContent} backContent={card.backContent}/>
                ))
                }
            </span>

              <span>
                {Array.from(myCardMap).map(([key, value]) => (
                <div key={key}>
                <strong>{key}</strong>: {value}
                </div>
            ))}
            </span>
            
        </main>
        </>
    )
}
