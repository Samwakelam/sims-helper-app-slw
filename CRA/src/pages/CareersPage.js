// packages
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
// styles
import './Pages.css';
import './CareersPage.css';
// functions
import fetcher from '../functions/fetcher';
// components
import Card from '../components/cards/Card';
import Trait from '../components/content/Trait';


const CareersPage = ({location}) => {
  // console.log('location =', location);

  const content = useRef(null);

  const [careers, setCareers] = useState([]);
  const [careerTraits, setCareerTraits] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [contentHeight, setContentHeight] = useState('100%');
  const [filteredTraits, setFilteredTraits] = useState([]);

  const fetchCareers = useCallback(async () => {
    const url = '/api/career/findAll'
    const fetchCareerData = await fetcher(url, 'GET');
    // console.log('fetchCareerData =', fetchCareerData);
    if (fetchCareerData.message === 'success') {
      setCareers(fetchCareerData.data);
    }

    if (contentHeight === '100%') {
      const scrollHeight = content.current.scrollHeight;
      setContentHeight(scrollHeight / 2.8);
    }
  }, [contentHeight]);

  const fetchCareerTraits = useCallback(async () => {
    const url = '/api/careerTraits/findAll'
    const fetchCareerData = await fetcher(url, 'GET');
    // console.log('fetchCareerData =', fetchCareerData);
    if (fetchCareerData.message === 'success') {
      setCareerTraits(fetchCareerData.data);
    }
  }, []);

  const handleBranchClick = (event, branch, careerID, imageURL) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedBranch(branch?._id === selectedBranch?.branch?._id ? null : { career: { careerID, imageURL }, branch });
  }

  useEffect(() => {
    fetchCareers();
    fetchCareerTraits();
  }, [fetchCareers, fetchCareerTraits]);

  useEffect(() => {
    let traits = [];
    if (selectedBranch) {
      careerTraits.forEach((trait) => {
        if (selectedBranch?.career?.careerID === trait?.branch?.careerID) {
          traits.push(trait);
        }
      });
    }
    setFilteredTraits(traits);
  }, [selectedBranch, careerTraits]);

  useEffect(() => {
    if (location.hash && careers) {
      let elem = document.getElementById(location.hash.slice(1));
      // console.log('elem =', elem);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location, careers]);

  // console.log('careers =', careers);
  // console.log('careerTraits =', careerTraits);
  // console.log('selectedBranch =', selectedBranch?.branch);
  // console.log('contentHeight =', contentHeight);
  // console.log('filteredTraits =', filteredTraits);


  return (
    <div id='careers-page' className='page'>
      <section className='grow'>
        <h1>Sims 4 Careers</h1>
        <div ref={content} className='column' style={{ maxHeight: `${contentHeight}px` }}>
          {careers.length > 0 &&
            careers.map((career) => {
              const branches = career.branch;
              return (

                <Card key={career._id}>
                  <div id={career._id} className='career-content'>
                    {career &&
                      <>
                        <h3 className='inset'>{career?.name}</h3>
                        <div>
                          <p className=''>{(career?.fullTime) ? 'Full Time' : 'Part Time'}</p>

                          <img
                            src={career?.imageURL}
                            className='symbol'
                            alt='career icon'
                          />
                        </div>

                        <div className='branches' >
                          {branches.length > 0 &&
                            branches.map((branch) => {
                              return (
                                <button
                                  key={branch?._id}
                                  className={`grow center ${selectedBranch?.branch?._id === branch?._id ? 'active' : ''}`}
                                  onClick={(event) => handleBranchClick(event, branch, career?._id, career?.imageURL)}
                                >
                                  {branch?.name}
                                </button>
                              );
                            })}
                        </div>
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
          <h2 className='inset' >Associations Stats and facts</h2>
          {selectedBranch &&
            <>
              <h5>Branch: <span>{selectedBranch?.branch?.name}</span></h5>
              {selectedBranch?.branch?.degreeID &&
                <div className='raised'>
                  <h5>Degree:
                    <span>{selectedBranch?.branch?.degreeID?.name}</span>
                  </h5>
                  <div>
                    <NavLink
                      to={`/degrees/#${selectedBranch?.branch?.degreeID?._id}`}
                    >
                      <button style={{ height: '75px', width: '75px' }}>
                        Go to Degree
                      </button>
                    </NavLink>
                    <img
                      src={selectedBranch?.branch?.degreeID?.imageURL}
                      className='symbol raised'
                      alt='degree icon'
                    />
                  </div>
                </div>
              }

              <div className='raised' >
                <h5>Benificial Skills</h5>
                <ul>
                  {selectedBranch &&
                    selectedBranch?.branch?.degreeID?.skills.map((skill, index) => {
                      return (
                        <li key={`${selectedBranch?.degreeID?._id}${skill._id}${index}`} >{skill.name}</li>
                      );
                    })
                  }
                </ul>
              </div>

              <div className='raised'>
                <h5>Sims in this career</h5>
                <h5>Sims in this branch</h5>
              </div>
            </>}
          {
            !(selectedBranch && filteredTraits.length === 0) &&
            <div className='raised' >
              <h5>Career Traits:</h5>
              {!selectedBranch &&
                careerTraits.map((trait) => {
                  const career = careers.filter((career) => career._id === trait.branch.careerID);
                  return (
                    <Trait key={trait?._id} career={career} trait={trait} />
                  );
                })
              }
              {
                (selectedBranch && filteredTraits.length > 0) &&
                filteredTraits.map((trait) => {
                  const career = careers.filter((career) => career._id === trait.branch.careerID);
                  return (
                    <Trait key={trait?._id} career={career} trait={trait} />
                  );
                })
              }
            </div>
          }
        </article>
      </section>
    </div>
  );
}

export default CareersPage;