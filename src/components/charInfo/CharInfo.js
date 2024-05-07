import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorrMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {

  const {loading, error, getCharacter, clearError} = useMarvelService();

  const [char, setChar] = useState(null);

  useEffect(()=> {
    updateChar();
    console.log('CharInfo', props.charId);
    
  }, [props.charId]);



  const updateChar = () => {
    const { charId } = props; // вытащили id из props

    if (!charId) return; //если вдруг ID нет

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
  };

  //загрузка данных перса в state: char
  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />; // заглушка на всякий случай

  const errorMessage = error ? <ErrorrMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

// так как СЛИШКОМ много верстки ДЕЛИМ ее не 2 компонента. 1 - отвечает за ЛОГИКУ. 2 - ЗА отображение
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics, comicsId } = char;

  let styleImg = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    styleImg = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={styleImg} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.lenght > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <Link to={`comics/${comicsId[i]}`} key={i}>
              <li className="char__comics-item">
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
