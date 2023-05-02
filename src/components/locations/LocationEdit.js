import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const LocationEdit = () => {
    const [newLocation, update] = useState({
        name: "",
        address: "",
        trackLength: ""
    })

    const {locationId} = useParams()
    const navigate = useNavigate()

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    useEffect(() => {
        fetch(`http://localhost:8088/locations/${locationId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    },
    [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/locations/${locationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLocation)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/locations")
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
                Save Changes
            </button>
        </form>
    )
}