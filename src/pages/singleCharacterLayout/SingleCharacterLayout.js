import { Helmet } from "react-helmet";
import "./singleCharacterLayout.scss"

const SingleCharacterLayout = ({data}) => {
    const { description, thumbnail, name} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description" content={`${name} marvel hero information page`} />
                <title>{`${name} Page`}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <p className="single-comic__name">{name}</p>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;