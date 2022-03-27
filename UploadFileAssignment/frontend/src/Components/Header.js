import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Header(){
    const User = localStorage.getItem('currentUser')
    const { user, message } = useSelector(state => state.auth)
    if (user) {
        console.log('header', user, message)
    } else {
        console.log('no user', user, message)
    }

    return(
        <React.Fragment>
            <Link to='/'>AttainU Service Desk</Link>
            {User ?
                <div>
                <button onClick={() => {
                    localStorage.removeItem('currentUser')
                    }}>Logout</button>
            </div>
            :
            <div>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                </div>
            }
        </React.Fragment>
    )
}

export default Header
