<<<<<<< HEAD
import { Link } from "react-router-dom";

function LinkComponent({link, routeName}: {link: string, routeName: string}){
    return(
        <Link to={link}>
            <div className="inline-block px-4 py-2 mx-2 text-left font-bold text-indigo-700 md:text-white md:px-0 lg:mx-3 md:text-center">{routeName}</div>
        </Link>
    )
}

export default LinkComponent;
=======
import NavLink from "./navLink";

function LinksComponent(){
    return(
        <div className="flex flex-row items-center justify-center w-full h-auto">
            <NavLink text="HOME" link="/"/>
            <NavLink text="ABOUT US" link="/"/>
            <NavLink text="SERVICES" link="/"/>
            <NavLink text="STORE" link="/store"/>
        </div>
    )
}

export default LinksComponent;
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
