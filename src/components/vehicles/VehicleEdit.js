import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const VehicleEdit = () => {
    const [newVehicle, update] = useState({
        year: "",
        make: "",
        model: ""
    })

    const {vehicleId} = useParams()
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    useEffect(() => {
        fetch(`http://localhost:8088/vehicles/${vehicleId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    },
    [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/vehicles/${vehicleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVehicle)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/garage`)
            })
    }

    return (
        <form className="editVehicleForm">
            <h4 className="editVehicleForm__title">Edit Vehicle</h4>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder=""
                        value={newVehicle.year}
                        onChange={
                            (evt) => {
                                const copy = {...newVehicle}
                                copy.year = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="make">Make</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Make"
                        value={newVehicle.make}
                        onChange={
                            (evt) => {
                                const copy = {...newVehicle}
                                copy.make = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Model"
                        value={newVehicle.model}
                        onChange={
                            (evt) => {
                                const copy = {...newVehicle}
                                copy.model = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Changes
            </button>
        </form>
    )
}