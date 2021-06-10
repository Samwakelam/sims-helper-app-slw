// packages
import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
// styles
import './Pages.css';
import './DegreePage.css';
// functions
import fetcher from '../functions/fetcher';
// components
import Card from '../components/cards/Card';
// import Trait from '../components/content/Trait';


const DegreePage = ({ location }) => {
  // console.log('location =', location);

  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [careers, setCareers] = useState([]);

  const fetchDegrees = useCallback(async () => {
    const url = '/api/degree/findAll'
    const fetchDegreeData = await fetcher(url, 'GET');
    // console.log('fetchDegreeData =', fetchDegreeData);
    if (fetchDegreeData.message === 'success') {
      setDegrees(fetchDegreeData.data);
    }
  }, []);

  const fetchCareers = useCallback(async () => {
    const url = '/api/career/findAll'
    const fetchCareerData = await fetcher(url, 'GET');
    // console.log('fetchCareerData =', fetchCareerData);
    if (fetchCareerData.message === 'success') {
      setCareers(fetchCareerData.data);
    }
  }, []);

  const handleDegreeSelection = (event, degree) => {
    // console.log('degree =', degree);
    event.preventDefault();
    event.stopPropagation();
    setSelectedDegree(degree?._id === selectedDegree?._id ? null : degree);
  }

  useEffect(() => {
    fetchDegrees();
    fetchCareers();
  }, [fetchDegrees]);

  useEffect(() => {
    if (location.hash && degrees) {
      let elem = document.getElementById(location.hash.slice(1));
      // console.log('elem =', elem);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location, degrees]);

  console.log('selectedDegree =', selectedDegree);
  // console.log('careers =', careers);

  return (
    <div id='degrees-page' className='page'>
      <section className='grow'>
        <h1> Sims 4 University Degrees</h1>
        <div className='row'>
          {degrees.length > 0 &&
            degrees.map((degree) => {
              const honorsUni = degree.uni.filter((u) => u.isHons === true);
              return (
                <Card key={degree._id} >
                  <div id={`${degree._id}`} className='degree-content'>
                    {degree &&
                      <>
                        <button 
                          className={`${selectedDegree?._id === degree?._id ? 'active' : ''}`} 
                          onClick={(event) => handleDegreeSelection(event, degree)}
                        >
                          <h3 >{degree.name}</h3>
                        </button>
                        <div>
                          <p>Honors degree at: <span>{honorsUni[0].name}</span></p>
                          <img
                            src={`${degree.imageURL}`}
                            className='symbol'
                            alt='degree icon'
                          />
                        </div>
                        <p className='inset'>{degree.description}</p>
                        <h6> Skills </h6>
                        <p> Core skills are highlighted.</p>
                        <ul>
                          {degree.skills.map((skill, index) => {
                            return (
                              <li key={`${skill._id}.${index}`} className={`${skill.coreSkill ? 'core' : 'other'}`}>{skill.name}</li>
                            );
                          })}
                        </ul>
                      </>
                    }
                  </div>
                </Card>
              );
            })
          }
        </div>
      </section>
      <section className='quarter' >
        <article className='raised'>
          <h2 className='inset'>Associations Stats and facts</h2>
          {selectedDegree &&
            <>
              <h5> Degree: <span>{selectedDegree.name}</span></h5>
              {(selectedDegree && careers) &&
                selectedDegree.career.map((careerID, i) => {
                  const c = careers.filter((careerObj) => careerObj.branch.some((branchObj) => branchObj._id === careerID));
                  const b = c[0].branch.filter((branchObj) => branchObj._id === careerID)
                  // console.log('c =', c);
                  // console.log('b =', b);
                  return (
                    <div key={`${c[0]._id}${b[0].id}`} className='raised'>
                      <h5>Career:
                        <span>{c[0].name}</span>
                      </h5>
                      <h5>Branch:
                        <span>{b[0].name}</span>
                      </h5>
                      <div>
                        <NavLink
                          to={`/careers/#${c[0]._id}`}
                        >
                          <button style={{ height: '75px', width: '75px' }}>
                            Go to Career
                          </button>
                        </NavLink>
                        <img
                          src={c[0].imageURL}
                          className='symbol raised'
                          alt='Career icon'
                        />
                      </div>
                    </div>
                  );
                })
              }

            </>
          }
          <div className='raised'>
            <h5>Sims with this Degree</h5>
            <h5>Alumni of this university</h5>
          </div>
        </article>
      </section>
    </div>
  );
}

export default DegreePage;