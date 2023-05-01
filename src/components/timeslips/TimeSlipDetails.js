import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TimeSlipDetails = () => {
    const [vehicles, setVehicles] = useState([])
    const [filteredVehicles, setFilteredVehicles] = useState([])
    const [locations, setLocations] = useState([])
    const [filteredLocations, setFilteredLocations] = useState([])
    
    const [timeSlip, update] = useState({
        dialTime: 0,
        reactionTime: 0,
        sixtyFootTime: 0,
        threeHundredThirtyFootTime: 0,
        eigthMileTime: 0,
        eigthMileSpeed: 0,
        oneThousandFootTime: 0,
        quarterMileTime: 0,
        quarterMileSpeed: 0,
        opponentDialTime: 0,
        opponentReactionTime: 0,
        opponentSixtyFootTime: 0,
        opponentThreeHundredThirtyFootTime: 0,
        opponentEigthMileTime: 0,
        opponentEigthMileSpeed: 0,
        opponentOneThousandFootTime: 0,
        opponentQuarterMileTime: 0,
        opponentQuarterMileSpeed: 0,
        win: false,
        date: "",
        changesToCar: "",
        weather: "",
        userId: 0,
        locationId: 0,
        vehicleId: 0
    })

    const {timeSlipId} = useParams()
   
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    useEffect(() => {
        fetch(`http://localhost:8088/timeSlips/${timeSlipId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    },
    [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/timeSlips/${timeSlipId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeSlip)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/timeSlip/details/${timeSlipId}`)
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
                                    copy.dialTime = parseFloat(evt.target.value, 2)
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
                                    copy.reactionTime = parseFloat(evt.target.value, 3)
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
                                    copy.sixtyFootTime = parseFloat(evt.target.value, 3)
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
                                    copy.threeHundredThirtyFootTime = parseFloat(evt.target.value, 3)
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
                                    copy.eigthMileTime = parseFloat(evt.target.value, 3)
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
                                    copy.eigthMileSpeed = parseFloat(evt.target.value, 2)
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
                                    copy.oneThousandFootTime = parseFloat(evt.target.value, 3)
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
                                    copy.quarterMileTime = parseFloat(evt.target.value, 3)
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
                                    copy.quarterMileSpeed = parseFloat(evt.target.value, 2)
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
                                    copy.opponentDialTime = parseFloat(evt.target.value, 2)
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
                                    copy.opponentReactionTime = parseFloat(evt.target.value, 3)
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
                                    copy.opponentSixtyFootTime = parseFloat(evt.target.value, 3)
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
                                    copy.opponentThreeHundredThirtyFootTime = parseFloat(evt.target.value, 3)
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
                                    copy.opponentEigthMileTime = parseFloat(evt.target.value, 3)
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
                                    copy.opponentEigthMileSpeed = parseFloat(evt.target.value, 2)
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
                                    copy.opponentOneThousandFootTime = parseFloat(evt.target.value, 3)
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
                                    copy.opponentQuarterMileTime = parseFloat(evt.target.value, 3)
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
                                    copy.opponentQuarterMileSpeed = parseFloat(evt.target.value, 2)
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
                Save Changes
            </button>
        </form>
    )
}