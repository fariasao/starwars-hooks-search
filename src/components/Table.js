import React, { useEffect, useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

function Table() {
  const { planets, getPlanets } = useContext(StarWarsContext);
  const [NameFilter, setNameFilter] = useState('');

  // useEffect do DidMount
  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return (
    <>
      <input
        type="text"
        placeholder="buscar o planeta..."
        data-testid="name-filter"
        value={ NameFilter }
        onChange={ (event) => setNameFilter(event.target.value) }
      />
      <table className="table-container">
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.filter((planet) => (planet.name.toLowerCase().includes(NameFilter)))
            .map((planet) => (
              <tr key={ planet.name } className="table-body">
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
