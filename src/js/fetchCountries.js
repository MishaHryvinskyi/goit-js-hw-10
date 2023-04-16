const PUBLIC_API = "https://restcountries.com/v3.1/";

function fetchCountries(name){
    return fetch(`${PUBLIC_API}/name/${name}?fields=name,capital,population,flags,languages`)
    .then((data) => data.json())
}

export { fetchCountries };