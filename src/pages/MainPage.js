import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import CharSearchForm from "../components/charSearchForm/CharSearchForm";

import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import decoration from "../resources/img/vision.png";

const MainPage = () => {

//чтобы вытащить из CharList id перса - записать сюда и потом передать в CharInfo
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

    return(
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel Info Portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                  <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}
export default MainPage;