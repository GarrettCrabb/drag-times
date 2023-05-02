import { useState } from "react"

export const VehicleForm = ({getVehicles}) => {
    const [newVehicle, update] = useState({
        year: new Date().getFullYear(),
        make: "",
        model: ""
    })

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const vehicleToSendToAPI = {
            year: newVehicle.year,
            make: newVehicle.make,
            model: newVehicle.model,
            userId: dragUserObject.id
        }

        return fetch(`http://localhost:8088/vehicles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                getVehicles()
            })
    }

    return (
        <form className="vehicleForm">
            <h4 className="vehicleForm__title">New Vehicle</h4>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Name"
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
                Add to Garage
            </button>
        </form>
    )
}