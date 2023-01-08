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
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?&${this._apiKey}`
    );
    return this._transformCharacter(res);
  };

  // чтобы не копировать длинный код вычисления обьектов персонажа  каждый раз
  // получаем от сервера ОГРОМНЫЙ массив данных =>> трансформируем в то что нам нужно!!!
  _transformCharacter = (res) => {
    return {
      name: res.data.results[0].name,
      description: res.data.results[0].description,
      thumbnail:
        res.data.results[0].thumbnail.path +
        "." +
        res.data.results[0].thumbnail.extension,
      homepage: res.data.results[0].urls[0].url,
      wiki: res.data.results[0].urls[1].url,
    };
  };
}

export default MarvelService;
