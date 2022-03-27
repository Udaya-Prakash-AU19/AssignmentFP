import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { fileUploadAsyncThunk } from "../features/auth/authSlice"


function Dashboard() {

    const [myFile, setMyFile] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function changeHandler(e) {
        setMyFile(e.target.files[0])
    }

    async function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('myFile', myFile)

        dispatch(fileUploadAsyncThunk(formData))
        navigate('/submitedFile')    
    }

    return(
        <React.Fragment>
            <form onSubmit={submitHandler}>
                <input type='file' onChange={changeHandler} accept='.json' placeholder="Upload file" />
                <button>Upload</button>
            </form>
        </React.Fragment>
    )
}

export default Dashboard