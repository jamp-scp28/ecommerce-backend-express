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