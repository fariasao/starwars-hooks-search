import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import Api from '../service/Api';

const StarWarsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  // func getPlanets pra pegar as infos do fetch
  const getPlanets = async () => {
    const planetsList = await Api();
    setPlanets(planetsList);
  };

  return (
    <StarWarsContext.Provider
      value={ { planets, getPlanets } }
    >
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
