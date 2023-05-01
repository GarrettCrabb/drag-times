import { useState } from "react"

export const LocationForm = ({getLocations}) => {
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
            <h2 className="locationForm__title">New Drag Strip</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={newLocation.name}
                        onChange={
                            (evt) => {
                                const copy = {...newLocation}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="trackLength">Track Length</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Track Length"
                        value={newLocation.trackLength}
                        onChange={
                            (evt) => {
                                const copy = {...newLocation}
                                copy.trackLength = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={newLocation.address}
                        onChange={
                            (evt) => {
                                const copy = {...newLocation}
                                copy.address = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add New Drag Strip
            </button>
        </form>
    )
}