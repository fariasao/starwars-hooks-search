import React, { useEffect, useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

function Table() {
  const { planets, getPlanets } = useContext(StarWarsContext);
  const [NameFilter, setNameFilter] = useState('');

  const [filterType, setFilterType] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);

  const [planetsList, setPlanetsList] = useState([]);

  const [valuesName, setValuesName] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // useEffect do DidMount
  useEffect(() => {
    getPlanets();
    setValuesName([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
  }, [getPlanets]);

  // useEffect para DidUpdate
  // executa td vez que o parametro alterar
  useEffect(() => {
    setPlanetsList(planets);
  }, [planets]);

  // ref https://github.com/tryber/sd-015-b-project-starwars-planets-search/pull/2
  function handleClick() {
    if (filterComparison === 'maior que') {
      setPlanetsList(planetsList
        .filter((planet) => (Number(planet[filterType]) > filterValue)));
    } else if (filterComparison === 'menor que') {
      setPlanetsList(planetsList
        .filter((planet) => (Number(planet[filterType]) < filterValue)));
    } else {
      setPlanetsList(planetsList
        .filter((planet) => (Number(planet[filterType]) === Number(filterValue))));
    }
    // retira colunas que jaa tenham aparecido em filtros anteriores
    setValuesName(valuesName.filter((valueName) => (valueName !== filterType)));
  }

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="bota o planeta..."
          data-testid="name-filter"
          value={ NameFilter }
          onChange={ (event) => setNameFilter(event.target.value) }
        />
      </form>

      <form>
        {/* primeiro filtro de colunas */}
        <select
          name="columnFilter"
          id="columnFilter"
          data-testid="column-filter"
          onChange={ (event) => setFilterType(event.target.value) }
        >
          {valuesName.map((typeName) => (
            <option value={ typeName } key={ typeName }>{typeName}</option>
          ))}
        </select>

        {/* segundo filtro de comparacao */}
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          onChange={ (event) => setFilterComparison(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        {/* terceiro filtro de valor */}
        <input
          type="number"
          placeholder="valor"
          data-testid="value-filter"
          value={ filterValue }
          onChange={ (event) => setFilterValue(event.target.value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Procurar
        </button>
      </form>

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
          {planetsList
            .filter((planet) => (planet.name.toLowerCase().includes(NameFilter)))
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
