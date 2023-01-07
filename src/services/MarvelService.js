class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=45e51cff6b7848042b65b037ecd8f021";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // Request to get all Characters
  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
  };

  // Request to get one Character
  getCharacter = (id) => {
    return this.getResource(
      `${this._apiBase}characters/${id}?&${this._apiKey}`
    );
  };
}

export default MarvelService;
