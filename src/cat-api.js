const API_KEY = 'live_DcDrCMTF2pSSJT9cxuG4ThEpzKaOOnLdMJ7gLIYPozlvvxoPgk2nyqUbCjfVtRYn';
const BASE_URL = 'https://api.thecatapi.com/v1'
export function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds").then((response) => { return response.json() })
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=1${breedId}&api_key=${API_KEY}`).then((response) => { return response.json() })
}


