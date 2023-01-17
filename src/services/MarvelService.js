class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=45e51cff6b7848042b65b037ecd8f021";
  _baseOffset = 210; // first 9 characters for getAllCharacters()

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // чтобы не копировать длинный код вычисления обьектов персонажа  каждый раз
  // получаем от сервера ОГРОМНЫЙ массив данных =>> трансформируем в то что нам нужно!!!
  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...` // если слишком длинное
        : "There is no description for this character", // вообще нет описанния
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  // Request to get all Characters
  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    ); // return Array

    return res.data.results.map(this._transformCharacter);
  };

  // Request to get one Character
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?&${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
}

export default MarvelService;
