const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getApiData = async () => {
  try { // tratamento de erro basico para requisicao
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) { // mostra o console caso de erro
    console.log(error);
  }
};

export default getApiData;
