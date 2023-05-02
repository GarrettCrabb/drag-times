import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export const TimeSlipList = () => {
    const [timeSlips, setTimeSlips] = useState([])
    const [filteredTimeSlips, setFiltered] = useState([])
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const getTimeSlips = () => {
        return fetch(`http://localhost:8088/timeSlips`)
                .then(response => response.json())
                .then((timeSlipArray) => {
                    setTimeSlips(timeSlipArray)
                })
    }

    const deleteTimeSlip = (evt, timeSlip) => {
        return fetch(`http://localhost:8088/timeSlips/${timeSlip.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getTimeSlips()
            })
    }

    useEffect(
        () => {
            getTimeSlips()
        },
        []
    )

    useEffect(
        () => {
            const myTimeSlips = timeSlips.filter(timeSlip => timeSlip.userId === dragUserObject.id)
            setFiltered(myTimeSlips)
        },
        [timeSlips]
    )

    return <>
        <h2>Your Time Slips</h2>

        <div>
            <button onClick={ () => navigate("/timeSlip/create")}>Add a Time Slip</button>
        </div>

        <article className="timeSlips">
            {
                filteredTimeSlips.map(
                    (timeSlip) => {
                        return <section key={`${timeSlip.id}`} className="timeSlip">
                            <header>{timeSlip.date}</header>
                            <div>{timeSlip.quarterMileTime}</div>
                            <footer>MPH: {timeSlip.quarterMileSpeed}</footer>
                            <Link to={`/timeSlip/details/${timeSlip.id}`}><button>Details/Edit</button></Link>
                            <button onClick={(evt) => {deleteTimeSlip(evt, timeSlip)} }>Delete</button>
                        </section>
                    }
                )
            }
        </article>
    </>
}