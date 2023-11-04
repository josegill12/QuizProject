import React from 'react'
import { Link } from 'react-router-dom'


const Nav = (props) => {
    return (
        <div className='nav'>
            <Link to='/'>
                <div>HomePage</div>
            </Link>
            <Link to='/quiz'>
                <div>Quiz</div>
            </Link>
        </div>
    )
}

export default Nav