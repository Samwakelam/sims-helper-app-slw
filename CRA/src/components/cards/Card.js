// packages
import React from 'react';
// styles
import './cards.css';


const Card = ({children}) => {
  return(
    <article className='card-container raised'>
      {children}
    </article>
  );
}

export default Card; 