import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({logo,link, className}) {
  return (
    <div className={className}> 
      <Link to={link}>
      <button>
       <img src={logo} alt="button_logo" />
      </button>
       </Link>
    </div>
  )
}
