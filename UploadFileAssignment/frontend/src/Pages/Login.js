import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginAsyncThunk, reset } from "../features/auth/authSlice"

function Login(){
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function changeHandler(e) {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    function submitHandler(e) {
        e.preventDefault()
        const userData = {
            email: formData.email,
            password: formData.password
        }

        // console.log(userData)
        dispatch(loginAsyncThunk(userData))
        navigate('/dashboard')
        dispatch(reset())
    }

    return(
        <Fragment>
            <section>
                <h1>Login {user && user.name}</h1>
                <h4>Enter your credentials to login</h4>
            </section>
            <section>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type='text' className="inputs" name="email" value={formData.email} onChange={changeHandler} placeholder="Enter your email" />
                        <h1>{formData.email}</h1>
                    </div>
                    <div className="form-group">
                        <input type='password' className="inputs" name="password" value={formData.password} onChange={changeHandler} placeholder="Enter your password" />
                        <h1>{formData.password}</h1>
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default Login
