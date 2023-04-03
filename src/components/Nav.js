// Nav.js
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';



const Nav = () => {

    return(
        <nav>
            <div className="wrapper">
                <Link>
                    <div className='logo'>
                        {/* look for semantic */}
                        <figure>
                            <img src={logo} alt="not so trivial pursuit logo" />
                        </figure>
                        <h3>
                            <span className='logoTop'>Not So Trivial</span>
                            <span>Pursuit</span>
                        </h3>

                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Nav;