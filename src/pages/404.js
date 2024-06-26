import { Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta name="description" content="404 Page of Marvel information portal" />
                <title>404 Marvel Page</title>
            </Helmet>
            <ErrorMessage />
            <p
                style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}
            >
                Page doesn't exist
            </p>
            <Link
                style={{'display': 'block', 'textAlign': 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px', color: 'red'}}
                to="/"
            >
                Back to main page
            </Link>
        </div>
    )
}

export default Page404;