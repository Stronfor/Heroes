import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=45e51cff6b7848042b65b037ecd8f021";
  const _baseOffset = 210; // first 9 characters for getAllCharacters()

  // чтобы не копировать длинный код вычисления обьектов персонажа  каждый раз
  // получаем от сервера ОГРОМНЫЙ массив данных =>> трансформируем в то что нам нужно!!!
  const _transformCharacter = (char) => {
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
      comicsId: char.comics.items.map(item => {
          const res = item.resourceURI.match(/\d+$/)
          if(!res) return "-"
          return res[0]
        })
      
    };
  };

  // Request to get all Characters
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  // Request to get one Character
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

  const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

  const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics}
}

export default useMarvelService;
