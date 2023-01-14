import { Component } from "react";
import MarvelService from "../../services/MarvelService";

import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";

class CharInfo extends Component {
  state = {
    char: {},
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.updateChar(); //ставица для страховки(так как начнет грузится только по клику) вдруг кто-то изменит state вручную
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
    return <div className="char__info"></div>;
  }
}

// так как СЛИШКОМ много верстки ДЕЛИМ ее не 2 компонента. 1 - отвечает за ЛОГИКУ. 2 - ЗА отображение
const View = ({ char }) => {
  return (
    <>
      <div className="char__basics">
        <img src={thor} alt="abyss" />
        <div>
          <div className="char__info-name">thor</div>
          <div className="char__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        In Norse mythology, Loki is a god or jötunn (or both). Loki is the son
        of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By
        the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the
        world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or
        Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in
        the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki
        is referred to as the father of Váli in the Prose Edda.
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        <li className="char__comics-item">
          All-Winners Squad: Band of Heroes (2011) #3
        </li>
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char__comics-item">
          AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
        </li>
        <li className="char__comics-item">Vengeance (2011) #4</li>
        <li className="char__comics-item">Avengers (1963) #1</li>
        <li className="char__comics-item">Avengers (1996) #1</li>
      </ul>
    </>
  );
};

export default CharInfo;
