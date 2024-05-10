import "./charList.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"

const setContent = (process, Component, newItemLoading) => {
  switch(process){
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />
    case "error":
      return <ErrorMessage/>;
    default:
      throw new Error("Unexpected process state");
  }
}

const CharList = (props) => {
  
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false); // loading new characters for click LOADING MORE
  const [offset, setOffset] = useState(210); // от этого числа отталкиваюсь при подгрузке новых персов
  const [charEnded, setCharEnded] = useState(false); //отслежка окончания массива с персами на сервере

  const {process, setProcess, getAllCharacters} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);    
  }, []);

  ///////////////

  // click for button LOAD MORE
  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharListLoaded = (newCharList) => {


    // only for TEST DYNAMIC IMPORT FOR JS VANILA
    // const {logger, logger2} = await import('./test');
    // logger2();

    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList([...charList, ...newCharList]);
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

  const renderItems = (arr) => {
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

  // test to dynamic import FOR JS VANILA!!!!!
  /* if(loading){
    import('./test')
     // .then(obj => obj.logger())  non defaul export
     .then(obj => obj.default())  // defaul export
      .catch(e=>console.log(e.message))
  } */

  const elements = useMemo(() => {
    return setContent(process, ()=> renderItems(charList), newItemLoading)
  }, [process])

  return (
    <div className="char__list">
      {elements}
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
