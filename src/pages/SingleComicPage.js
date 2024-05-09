import { useParams, Link } from 'react-router-dom';

import { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelService";
import Spinner from "../components/spinner/spinner";
import ErrorrMessage from "../components/errorMessage/ErrorMessage";
import AppBanner from "../components/appBanner/AppBanner";

import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();

    const [comic, setComic] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(()=> {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }
     
    const errorMessage = error ? <ErrorrMessage/> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spiner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, price, thumbnail, language} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;