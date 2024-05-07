import "./charList.scss";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false); // loading new characters for click LOADING MORE
  const [offset, setOffset] = useState(210); // от этого числа отталкиваюсь при подгрузке новых персов
  const [charEnded, setCharEnded] = useState(false); //отслежка окончания массива с персами на сервере

  const {loading, error, getAllCharacters} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  ///////////////

  // click for button LOAD MORE
  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    
    getAllCharacters(offset)
      .then(onCharListLoaded)
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended)

  };

  //focus + active class + focus for TAB
  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    // Я реализовал вариант чуть сложнее, и с классом и с фокусом
    // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
    // На самом деле, решение с css-классом можно сделать, вынеся персонажа
    // в отдельный компонент. Но кода будет больше, появится новое состояние
    // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

    // По возможности, не злоупотребляйте рефами, только в крайних случаях
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          ref={el => itemRefs.current[i] = el}
          tabIndex={0}
          className="char__item"
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id); //функция пришла из App компонента
            focusOnItem(i);
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset, false)} //стрелочная функция для того чтобы можнобыло передать аргумент!!
        style={{ display: charEnded ? "none" : "block" }} //исчезнет кнопка после того как персы на серве закончатся
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );

}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
