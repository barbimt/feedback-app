
import PropTypes from 'prop-types'
import {
   
    NavLink,
  } from "react-router-dom";

export default function Header({text, bgColor, textColor}) {
    const headerStyles = {
        backgroundColor : bgColor, 
        color:textColor
    }
   
  return (
    <header style={headerStyles}>
        <div className="container">
            <h2>{text}</h2> 
        </div>
        <NavLink to='/' activeClassName='active' className={'nav-bar'}>
          Home
          </NavLink>
          <NavLink to='/about' activeClassName='active' className={'nav-bar'}>
          About
          </NavLink>
    </header>
  )
}

Header.defaultProps={
    text: 'feedback UI',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propTypes={
    text: PropTypes.string,
    bgColor: PropTypes.string, 
    textColor: PropTypes.string, 
}
 