import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const TimeSlipList = () => {
    const [timeSlips, setTimeSlips] = useState([])
    const [filteredTimeSlips, setFiltered] = useState([])
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/timeSlips`)
                .then(response => response.json())
                .then((timeSlipArray) => {
                    setTimeSlips(timeSlipArray)
                })
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
                            <Link to={`/timeSlip/details/${timeSlip.id}`}><header>{timeSlip.date}</header></Link>
                            <div>{timeSlip.quarterMileTime}</div>
                            <footer>MPH: {timeSlip.quarterMileSpeed}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}