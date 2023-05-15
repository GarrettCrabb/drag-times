import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./TimeSlips.css"

export const TimeSlipList = ({ searchTermState }) => {
    const [timeSlips, setTimeSlips] = useState([])
    const [filteredTimeSlips, setFiltered] = useState([])
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const getTimeSlips = () => {
        return fetch(`http://localhost:8088/timeSlips?_expand=location&_expand=vehicle`)
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

    useEffect(
        () => {
            const searchedTimeSlips = timeSlips.filter(timeSlip => timeSlip.date.startsWith(searchTermState) && timeSlip.userId === dragUserObject.id)
            setFiltered(searchedTimeSlips)
        },
        [searchTermState]
    )

    return <>
        <h2 className="timeSlipListTitle">Your Time Slips</h2>

        <div>
            <button className="createTimeSlipButton" onClick={ () => navigate("/timeSlip/create")}>Add a Time Slip</button>
        </div>

        <article className="timeSlips">
            {
                filteredTimeSlips.map(
                    (timeSlip) => {
                        return <section key={`${timeSlip.id}`} className="timeSlip">
                            <header>{timeSlip.date}</header>
                            <div>1/4 Mile Time: {timeSlip.quarterMileTime}</div>
                            <div>MPH: {timeSlip.quarterMileSpeed}</div>
                            <div>Vehicle: {timeSlip?.vehicle?.year} {timeSlip?.vehicle?.make} {timeSlip?.vehicle?.model}</div>
                            <footer>Track: {timeSlip?.location?.name}</footer>
                            <Link to={`/timeSlip/details/${timeSlip.id}`}><button className="timeSlipEditDetailsButton">Details/Edit</button></Link>
                            <button className="timeSlipDeleteButton" onClick={(evt) => {deleteTimeSlip(evt, timeSlip)} }>Delete</button>
                        </section>
                    }
                )
            }
        </article>
    </>
}