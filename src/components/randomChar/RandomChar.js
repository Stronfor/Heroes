import { Component } from "react";
import Spinner from "../spiner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();

    //this.timerId = setInterval(this.updateChar, 25000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  ////////////////////////////

  marvelService = new MarvelService(); // чтобы работать с классами нужно создать его новый екзэмпляр

  onCharLoaded = (char) => {
    this.setState({ char, loading: false }); //({ char: char, loading: false }); когда данные загрузились loading = изменится на  false
  };

  // отлов ошибки!!!
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); //random id
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onUpdateChar = () => {
    this.state.error ? this.setState({ error: false }) : this.updateChar();
  };

  render() {
    const { char, loading, error } = this.state;

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
          <button className="button button__main">
            <div onClick={this.onUpdateChar} className="inner">
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

// рендорящий компонент(в нем нет никакой логики)
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
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
