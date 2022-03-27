import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerAsyncThunk } from "../features/auth/authSlice"

function Register(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function changeHandler(e) {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    function submitHandler(e) {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            return alert('Password and confirm password must be same')
        }
        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        console.log(userData)
        dispatch(registerAsyncThunk(userData))
        navigate('/login')    
    }

    return(
        <Fragment>
            <section>
                <h1>Registeration</h1>
                <h4>Enter your details to register</h4>
            </section>
            <section>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type='text' className="inputs" name="name" value={formData.name} onChange={changeHandler} placeholder="Enter your name" />
                        <h1>{formData.name}</h1>
                    </div>
                    <div className="form-group">
                        <input type='text' className="inputs" name="email" value={formData.email} onChange={changeHandler} placeholder="Enter your email" />
                        <h1>{formData.email}</h1>
                    </div>
                    <div className="form-group">
                        <input type='password' className="inputs" name="password" value={formData.password} onChange={changeHandler} placeholder="Enter your password" />
                        <h1>{formData.password}</h1>
                    </div>
                    <div className="form-group">
                        <input type='password' className="inputs" name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} placeholder="Re-enter your password" />
                        <h1>{formData.confirmPassword}</h1>
                    </div>
                    <div>
                        <button>Register</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default Register