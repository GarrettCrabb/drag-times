import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations"><button>Locations</button></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/garage"><button>Garage</button></Link>
            </li>
            {
                localStorage.getItem("drag_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("drag_user")
                            navigate("/login", {replace: true})
                        }}><button>Logout</button></Link>
                    </li>
                    : ""
            }
        </ul>
    )
}