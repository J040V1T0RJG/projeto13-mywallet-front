import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState } from "react";

import Login from "./Login";
import SignUp from "./Sign-up";
import Wallet from "./Wallet";
import NewEntry from "./NewEntry";
import NewExit from "./NewExit";
import UserContext from "./UserContext";

function App () {
    const [userToken, setUserToken] = useState()
    return (
        <>
        <BrowserRouter>
        <UserContext.Provider value={{
                                        userToken,
                                        setUserToken
                                    }}>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/sign-up" element={<SignUp />}/>
                    <Route path="/wallet" element={<Wallet />}/>
                    <Route path="/new-entry" element={<NewEntry />}/>
                    <Route path="/new-exit" element={<NewExit />}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>

        
        </>
    )
}

export default App;