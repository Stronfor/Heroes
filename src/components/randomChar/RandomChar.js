import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = (props) => {

  const {loading, getCharacter, error, clearError} = useMarvelService(); // чтобы работать с классами нужно создать его новый екзэмпляр

  const [char, setChar] = useState({});

  useEffect(()=>{
    updateChar();
    const timerId = setInterval(()=> updateChar, 60000);
    return () => clearInterval(timerId)
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //random id

    getCharacter(id)
      .then(onCharLoaded)
  };

  // распредиление что и как загружать на страницу(одновр может быть что-то одно)
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null; // НЕ loading и НЕ ошибка тогда = контент

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );

}

// рендорящий компонент(в нем нет никакой логики)
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  // фикс бага для залушки без картинки (вписать в блок методом изменением стилей)
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        style={imgStyle}
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
