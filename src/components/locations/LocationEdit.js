import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Locations.css"

export const LocationEdit = () => {
    const [newLocation, update] = useState({
        name: "",
        address: "",
        trackLength: ""
    })

    const { locationId } = useParams()
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
            <h2 className="locationEditTitle">Edit Drag Strip</h2>
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
                            required autoFocus
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
                    className="saveLocationEdit">
                    Save Changes
                </button>
            </div>
        </form>
    )
}