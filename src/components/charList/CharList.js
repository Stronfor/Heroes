import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    char: [],
    error: false,
    loading: true,
  };

  componentDidMount() {
    this.updateAllChars();
  }
  ///////////////

  marvelService = new MarvelService();

  //Get 9 Chars write them in this.STATE
  updateAllChars = () => {
    this.marvelService.getAllCharacters().then((item) => {
      this.setState({ char: item });
    });
  };

  render() {
    const { char } = this.state;
    return (
      <div className="char__list">
        <ul className="char__grid">
          {char.map(({ name, id, thumbnail }) => {
            return (
              <li className="char__item" key={id} id={id}>
                <img src={thumbnail} alt={name} />
                <div className="char__name">{name}</div>
              </li>
            );
          })}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

// then((item) => {
//   item.map(({ name, id, thumbnail }) => {
//     return (
//       <li className="char__item" key={id} id={id}>
//         <img src={thumbnail} alt={name} />
//         <div className="char__name">{name}</div>
//       </li>
//     );
//   });
// });
