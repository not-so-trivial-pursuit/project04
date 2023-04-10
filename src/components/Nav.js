// Nav.js
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';



const Nav = () => {

    return(
        <nav>
            <div className="wrapper">
                <Link to="/">
                    <div className='logo'>
                        <figure>
                            <img src={logo} alt="not so trivial pursuit logo" />
                        </figure>
                        <p>
                            <span className='logoTop'>Not So Trivial</span>  <span className='logoBottom'>Pursuit</span>
                        </p>

                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Nav;