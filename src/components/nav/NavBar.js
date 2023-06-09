import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/timeSlips"><button className="navButton">Home</button></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations"><button className="navButton">Locations</button></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/garage"><button className="navButton">Garage</button></Link>
            </li>
            {
                localStorage.getItem("drag_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("drag_user")
                            navigate("/login", {replace: true})
                        }}><button className="navButton">Logout</button></Link>
                    </li>
                    : ""
            }
        </ul>
    )
}