import React from "react";
import Signup from '../components/signup'
import Header from '../components/header'
import '../styles/box.css'


    

export default function SignupPage() {
    const [visible, setVisible] = React.useState(true)

    function changeVal(visibility:boolean) {
        setVisible(visibility)
    }
  
        return (
            <>
                <div className="full-screen">
                    <div>
                        <Header></Header>
                    </div>

                    <h1 className={visible ? 'centered-text-in' : 'centered-text-out'} >Flashcards take time, get help from AI.</h1>
                    


                    <div className="form-outline">
                        Complete the steps below to create an account.
                        <Signup func={changeVal}></Signup>
                    </div>
                </div>
            </>
        ) 
}