import { Link } from "react-router-dom";

function LinkComponent({link, routeName}: {link: string, routeName: string}){
    return(
        <Link to={link}>
            <div className="inline-block px-4 py-2 mx-2 text-left font-bold text-indigo-700 md:text-white md:px-0 lg:mx-3 md:text-center">{routeName}</div>
        </Link>
    )
}

export default LinkComponent;