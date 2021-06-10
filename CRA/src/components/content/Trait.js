// packages
import React from 'react';
// styles
import './Trait.css';


const Trait = ({ trait, career }) => {
  // console.log('trait =', trait);
  return (
    <div className='trait-container'>
      <h5>{trait?.name}</h5>
      <div>
        <div>
          <h6>{trait?.branch?.branchName}</h6>
          <img
            src={`${career[0].imageURL}`}
            className='symbol'
            alt='career icon'
          />
        </div>
        <p className='grow inset' >{trait?.description}</p>
      </div>
    </div>
  );
}

export default Trait;