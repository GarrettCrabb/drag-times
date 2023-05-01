import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const TimeSlipForm = () => {
    const [vehicles, setVehicles] = useState([])
    const [filteredVehicles, setFilteredVehicles] = useState([])
    const [locations, setLocations] = useState([])
    const [filteredLocations, setFilteredLocations] = useState([])
    
    const [timeSlip, update] = useState({
        dialTime: null,
        reactionTime: null,
        sixtyFootTime: null,
        threeHundredThirtyFootTime: null,
        eigthMileTime: null,
        eigthMileSpeed: null,
        oneThousandFootTime: null,
        quarterMileTime: null,
        quarterMileSpeed: null,
        opponentDialTime: null,
        opponentReactionTime: null,
        opponentSixtyFootTime: null,
        opponentThreeHundredThirtyFootTime: null,
        opponentEigthMileTime: null,
        opponentEigthMileSpeed: null,
        opponentOneThousandFootTime: null,
        opponentQuarterMileTime: null,
        opponentQuarterMileSpeed: null,
        win: false,
        date: "",
        changesToCar: "",
        weather: "",
        userId: null,
        locationId: null,
        vehicleId: null
    })
   
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        const timeSlipToSendToAPI = {
            dialTime: parseFloat(timeSlip.dialTime, 2),
            reactionTime: parseFloat(timeSlip.reactionTime, 3),
            sixtyFootTime: parseFloat(timeSlip.sixtyFootTime, 3),
            threeHundredThirtyFootTime: parseFloat(timeSlip.threeHundredThirtyFootTime, 3),
            eigthMileTime: parseFloat(timeSlip.eigthMileTime, 3),
            eigthMileSpeed: parseFloat(timeSlip.eigthMileSpeed, 2),
            oneThousandFootTime: parseFloat(timeSlip.oneThousandFootTime, 3),
            quarterMileTime: parseFloat(timeSlip.quarterMileTime, 3),
            quarterMileSpeed: parseFloat(timeSlip.quarterMileSpeed, 2),
            opponentDialTime: parseFloat(timeSlip.opponentDialTime, 2),
            opponentReactionTime: parseFloat(timeSlip.opponentReactionTime, 3),
            opponentSixtyFootTime: parseFloat(timeSlip.opponentSixtyFootTime, 3),
            opponentThreeHundredThirtyFootTime: parseFloat(timeSlip.opponentThreeHundredThirtyFootTime, 3),
            opponentEigthMileTime: parseFloat(timeSlip.opponentEigthMileTime, 3),
            opponentEigthMileSpeed: parseFloat(timeSlip.opponentEigthMileSpeed, 2),
            opponentOneThousandFootTime: parseFloat(timeSlip.opponentOneThousandFootTime, 3),
            opponentQuarterMileTime: parseFloat(timeSlip.opponentQuarterMileTime, 3),
            opponentQuarterMileSpeed: parseFloat(timeSlip.opponentQuarterMileSpeed, 2),
            win: timeSlip.win,
            date: timeSlip.date,
            changesToCar: timeSlip.changesToCar,
            weather: timeSlip.weather,
            userId: dragUserObject.id,
            locationId: timeSlip.locationId,
            vehicleId: timeSlip.vehicleId
           
        }

        return fetch(`http://localhost:8088/timeSlips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeSlipToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/timeSlips")
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/vehicles`)
                .then(response => response.json())
                .then((vehicleArray) => {
                    setVehicles(vehicleArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const myVehicles = vehicles.filter(vehicle => vehicle.userId === dragUserObject.id)
            setFilteredVehicles(myVehicles)
        },
        [vehicles]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const myLocations = locations.filter(location => location.userId === dragUserObject.id)
            setFilteredLocations(myLocations)
        },
        [locations]
    )

    return (
        <form className="timeSlipForm">
            <h2 className="timeSlipForm__title">Add a New Time Slip</h2>
            <div className="myTimes">
                <h3>You</h3>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="dial">Dial</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="Dial"
                            value={timeSlip.dialTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.dialTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="reactonTime">Reaction Time</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="Reaction Time"
                            value={timeSlip.reactionTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.reactionTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="sixtyFootTime">60'</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="60'"
                            value={timeSlip.sixtyFootTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.sixtyFootTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="threeHundredThirtyFootTime">330'</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="330'"
                            value={timeSlip.threeHundredThirtyFootTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.threeHundredThirtyFootTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="eigthMileTime">1/8 Mile Time</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/8 Mile Time"
                            value={timeSlip.eigthMileTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.eigthMileTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="eigthMileSpeed">1/8 Mile MPH</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/8 Mile MPH"
                            value={timeSlip.eigthMileSpeed}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.eigthMileSpeed = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="oneThousandFootTime">1000'</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1000'"
                            value={timeSlip.oneThousandFootTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.oneThousandFootTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="quarterMileTime">1/4 Mile Time</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/4 Mile Time"
                            value={timeSlip.quarterMileTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.quarterMileTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="quarterMileSpeed">1/4 Mile MPH</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/4 Mile MPH"
                            value={timeSlip.quarterMileSpeed}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.quarterMileSpeed = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
            </div>
            <div className="opponentTimes">
                <h3>Opponent</h3>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentDial">Dial</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="Dial"
                            value={timeSlip.opponentDialTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentDialTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentReactonTime">Reaction Time</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="Reaction Time"
                            value={timeSlip.opponentReactionTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentReactionTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentSixtyFootTime">60'</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="60'"
                            value={timeSlip.opponentSixtyFootTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentSixtyFootTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentThreeHundredThirtyFootTime">330'</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="330'"
                            value={timeSlip.opponentThreeHundredThirtyFootTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentThreeHundredThirtyFootTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentEigthMileTime">1/8 Mile Time</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/8 Mile Time"
                            value={timeSlip.opponentEigthMileTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentEigthMileTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentEigthMileSpeed">1/8 Mile MPH</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/8 Mile MPH"
                            value={timeSlip.opponentEigthMileSpeed}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentEigthMileSpeed = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentOneThousandFootTime">1000'</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1000'"
                            value={timeSlip.opponentOneThousandFootTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentOneThousandFootTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentQuarterMileTime">1/4 Mile Time</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/4 Mile Time"
                            value={timeSlip.opponentQuarterMileTime}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentQuarterMileTime = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="opponentQuarterMileSpeed">1/4 Mile MPH</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="1/4 Mile MPH"
                            value={timeSlip.opponentQuarterMileSpeed}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.opponentQuarterMileSpeed = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
            </div>
            <div className="timeSlipDetails">
                <h2>Details</h2>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="changes">Changes Made to Car</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Changes Made"
                            value={timeSlip.changesToCar}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.changesToCar = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Date"
                            value={timeSlip.date}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.date = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="weather">Weather</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Weather"
                            value={timeSlip.weather}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.weather = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="win">Win:</label>
                        <input type="checkbox"
                            value={timeSlip.win}
                            onChange={
                                (evt) => {
                                    const copy = {...timeSlip}
                                    copy.win = evt.target.checked
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <div className="locationAndVehicleWrapper">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="vehicle">Pick a Vehicle
                                <select
                                value={timeSlip.vehicleId}
                                onChange={
                                    (evt) => {
                                        const copy = {...timeSlip}
                                        copy.vehicleId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                }>
                                    <option>Pick A Vehicle</option>
                                    {
                                        filteredVehicles.map(
                                            (vehicle) => {
                                                return <option key={`${vehicle.id}`} value={vehicle.id}>{vehicle.year} {vehicle.make} {vehicle.model}</option>
                                            })
                                    }
                                </select>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="location">Pick a Track
                                <select
                                value={timeSlip.locationId}
                                onChange={
                                    (evt) => {
                                        const copy = {...timeSlip}
                                        copy.locationId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                }>
                                    <option>Pick A Track</option>
                                    {
                                        filteredLocations.map(
                                            (location) => {
                                                return <option key={`${location.id}`} value={location.id}>{location.name}</option>
                                            })
                                    }
                                </select>
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Time Slip
            </button>
            <button onClick={() => navigate("/timeSlips")}>Back To Home</button>
        </form>
    )
}