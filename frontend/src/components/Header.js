import headerLogo from '../images/Vector.svg'
import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Место"
                className="header__logo"
            />
            <nav className='header__auth'>
                <p className='header__mail'>{props.mail}</p>
                <Link
                    to={props.route}
                    type='button'
                    className='header__link'
                    onClick={props.onClick}
                >
                    {props.title}
                </Link>
            </nav>
        </header>
    )
}

export default Header