import React, { createContext, useState } from "react";
import WelcomePage from "./welcome";
import HomePage from "./homePage";



function StateManager() {
    const [user, setUser] = useState(); // Initial user state is undefined
    const [log, setLog] = useState(false);

    function toggleLog(args:any) {
        setLog(args)
    }

    return (
            <section>
                {log ? <WelcomePage logSetter={toggleLog}/> : <HomePage/>}
            </section>
    );
}

export default StateManager
