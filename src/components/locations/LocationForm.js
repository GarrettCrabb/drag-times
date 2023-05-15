import { useState } from "react"
import "./Locations.css"

export const LocationForm = ({ getLocations }) => {
    const [newLocation, update] = useState({
        name: "",
        address: "",
        trackLength: ""
    })

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const locationToSendToAPI = {
            name: newLocation.name,
            address: newLocation.address,
            trackLength: newLocation.trackLength,
            userId: dragUserObject.id
        }

        return fetch(`http://localhost:8088/locations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                getLocations()
            })
    }

    return (
        <form className="locationForm">
            <h4 className="locationFormTitle">New Drag Strip</h4>
            <div className="locationFormWrapper">
                <fieldset>
                    <div className="formGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={newLocation.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLocation }
                                    copy.name = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="formGroup">
                        <label htmlFor="trackLength">Track Length</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Track Length"
                            value={newLocation.trackLength}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLocation }
                                    copy.trackLength = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="formGroup">
                        <label htmlFor="address">Address</label>
                        <textarea
                            required autoFocus
                            className="form-textarea"
                            placeholder="Address"
                            rows={1}
                            cols={50}
                            value={newLocation.address}
                            onChange={
                                (evt) => {
                                    const copy = { ...newLocation }
                                    copy.address = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="addNewTrackButton">
                    Add New Drag Strip
                </button>
            </div>
        </form>
    )
}