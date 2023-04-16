const PUBLIC_API = "https://restcountries.com/v3.1/";

function fetchCountries(name){
    return fetch(`${PUBLIC_API}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok){
            if(response.status === 404) {
                return [];
            }
            throw new Error(response.status);
        }
        return response.json();
    })
    .catch(error => {
        console.error(error);
    });
};

export { fetchCountries };