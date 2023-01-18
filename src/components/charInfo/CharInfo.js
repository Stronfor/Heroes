import { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorrMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.updateChar(); //ставица для страховки(так как начнет грузится только по клику) вдруг кто-то изменит state вручную
  }

  componentDidUpdate(prevProps, prevState) {
    //получает предв. пропси и состояние как аргументы
    if (this.props.charId !== prevProps.charId) {
      //если новый пропс не равен старому
      this.updateChar();
    }
  }

  ////

  marvelService = new MarvelService();

  updateChar = () => {
    const { charId } = this.props; // вытащили id из props

    if (!charId) return; //если вдруг ID нет

    this.onCharLoading(); // SPINNER

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  //загрузка данных перса в state: char
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  // метод для отображенния спинера при нажатии кнопки
  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  // отлов ошибки!!!
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />; // заглушка на всякий случай

    const errorMessage = error ? <ErrorrMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
      <div ref={this.charInfoRef} className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

// так как СЛИШКОМ много верстки ДЕЛИМ ее не 2 компонента. 1 - отвечает за ЛОГИКУ. 2 - ЗА отображение
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

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
            <li className="char__comics-item" key={i}>
              {item.name}
            </li>
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
