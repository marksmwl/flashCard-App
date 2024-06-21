import { createContext, useEffect } from 'react'
import Header from '../components/header'
import Login from '../components/login'
import React from 'react'
import CardRep from '../components/card'
import { TextField, Button } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



export default function HomePage(props) {
    // useState for cards and change to refresh cards
    const [cards, setCards] = React.useState([])
    const [change, setChange] = React.useState([])

    // useState for custom cards
    const [subject, setSubject] = React.useState('')
    const [front, setFront] = React.useState('')
    const [back, setBack] = React.useState('')

    // useState for generated cards
    const [subjectAI, setSubjectAI] = React.useState('')
    const [context, setContext] = React.useState('')

    // when the page is first loaded and when the change variable changes values, refresh the collection of cards
    useEffect(() => {
        async function getCards() {
            const body = {
                'username': atob(localStorage.getItem('usr'))
            }
            fetch('http://localhost:8000/getCards/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON response
              })
              .then(data => {
                // Process the parsed JSON data
               setCards(JSON.parse(data['cards']))
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
        }

        getCards()
    }, [change])

    // Function to create a new card with custom info
    function createCard() {
        const body = {
            subject: subject,
            frontContent: front,
            backContent: back,
            owner: atob(localStorage.getItem('usr'))
        }

        fetch('http://localhost:8000/addCard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(response=>{
            if (!response.ok) {
                console.log('damn gang')
            }
            setChange(Math.random())
        })
    }

    // Function to generate a card with AI
    function generateCard() {
        const body = {
            subject: subjectAI,
            context: context,
            username: atob(localStorage.getItem('usr'))
        }

        fetch('http://localhost:8000/getResponse/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(response=>{
            if (!response.ok) {
                console.log('damn gang')
            }
            setChange(Math.random())
        })
    }
   
    // METHODS FOR CUSTOM CARD FORM

    // function to handle the subject field being changed 
    function handleSubject(e) {
        let value = e.target.value
        setSubject(value)
    }

    // function to handle the front field for custom cards being changed 
    function handleFront(e) {
        let value = e.target.value
        setFront(value)
    }

    function handleBack(e) {
        let value = e.target.value
        setBack(value)
    }

    // METHODS FOR AI GENERATED CARD FORM

    function handleSubjectAI(e) {
        let value = e.target.value
        setSubjectAI(value)
    }

    function handleContext(e) {
        let value = e.target.value
        setContext(value)
    }

    const [value, setValue] = React.useState(0);

    function handleChange(event, newEvent){

      setValue(newEvent);
    };
  
    
    

    return (
        <>
            <section className='full-screen'>
                <section>
                    <Header/>
                    <h1 className='welcome-text'>Welcome, {atob(localStorage.getItem('usr'))}</h1>
                </section>

            
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Create Card Yourself"  />
                        <Tab label="Generate Card with AI" />
                        </Tabs>
                    </Box>

                    <div className='card-tabs'>
                        {!value ? 
                        <section className='card-form'>
                            
                            <TextField id="standard-password" label="Subject" variant="standard" onChange={handleSubject}/>
                            <TextField id="standard-basic" label="Front" variant="standard" onChange={handleFront}/> 
                            <TextField id="standard-password" label="Back" variant="standard" onChange={handleBack}/>
                            <Button variant='outlined' onClick={createCard}>Create Flash Card</Button>
                            
                        </section> 
                        
                        : 
                        
                        <div>
                             <section className='card-form'>
                                
                                <TextField id="standard-subectAI" label="Subject" variant="standard" onChange={handleSubjectAI}/>
                                <p style={{marginBottom:'-2em',fontSize:'0.9em'}}>What should this flashcard be about?</p>
                                <TextField id="standard-context" label="Context" variant="standard" onChange={handleContext}/> 
                            
                                <Button variant='outlined' onClick={generateCard}>Generate Flash Card</Button>
        
                                </section>
                                
                        </div>
                       
                        }
                    </div>
         
                      
           

                <span className='card-container'>
                {cards.slice(-4).map((card, index) => (
                    <CardRep key={index} subject={card.subject} func={setChange} frontContent={card.frontContent} backContent={card.backContent}/>
                ))}
                </span>
            </section>
        </>
    )
}