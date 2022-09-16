import React from "react";
import {Link} from 'react-router-dom'


function NavBar () {
    
    return(
        <div className='navbar'>
            <Link id='navItem' to = '/classrooms'>Classrooms </Link>
            <Link id='navItem' to = '/assignments'>Assignments </Link>
        </div>
    )
}
export default NavBar