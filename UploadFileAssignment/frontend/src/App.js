import { Fragment } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import SubmitedFile from "./Pages/SubmitedFile"

function App2() {
    return(
        <Fragment>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/submitedFile" element={<SubmitedFile />}></Route>
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}

export default App2