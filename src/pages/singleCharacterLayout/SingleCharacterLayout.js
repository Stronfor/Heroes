import "./singleCharacterLayout.scss"

const SingleCharacterLayout = ({data}) => {
    const { description, thumbnail, name} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <p className="single-comic__name">{name}</p>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;