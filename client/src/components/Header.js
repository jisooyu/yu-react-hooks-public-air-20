import React from 'react'
import { useSelector  } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {

    const auth = useSelector(state => state.auth)

    const renderContent = () =>{
        switch ( auth ) {
            case null:
                return 
            case false:
                return <a href="/auth/google">Login With Google</a>
            default:
                return [
                    <a href="/api/logout">Logout</a>
                ]
        }
    }
    return (
        <div className="header">
            <div className="subheader">
                <Link to={auth ?  '/display' : '/'}>
                    <p>Display</p>
                </Link>
                <Link to={ auth ? '/add' : '/' }>
                    <p>Add</p>
                </Link>
                <Link to={'/'}>
                    <p className="para">AQI Information Site</p>
                </Link>
                <p>{renderContent()}</p> 
            </div>
        </div>
    )
}

export default Header;
