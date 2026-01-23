import {Link} from "react-router-dom";

export default function NotFoundPage() {

    return (
        <div className="flex flex-col justify-center items-center h-screen p-4">
            <h1 className="text-6xl font-bold mb-4"><span className="text-red-600">404:</span> Not Found</h1>
            <p className="text-xl mb-4">Hoppsan! Här ska det vara något, men inget fanns!</p>
            <Link to="/" className="btn text-warning">
                Ta mig till startsidan!
            </Link>
        </div>
    )
}
