import { useEffect, useState } from "react"
import { LocationForm } from "./LocationForm"
import { Link } from "react-router-dom"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const [filteredLocations, setFiltered] = useState([])

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const getLocations = () => {
        fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
    }

    const deleteLocation = (evt, location) => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getLocations()
            })
    }

    useEffect(
        () => {
           getLocations()
        },
        []
    )

    useEffect(
        () => {
            const myLocations = locations.filter(location => location.userId === dragUserObject.id)
            setFiltered(myLocations)
        },
        [locations]
    )

    return <>
        <h2>Your Drag Strips</h2>

        <article className="locationForm">
            <LocationForm getLocations={getLocations}/>
        </article>

        <article className="locations">
            {
                filteredLocations.map(
                    (location) => {
                        return <section key={`${location.id}`} className="location">
                            <header>{location.name}</header>
                            <div>{location.trackLength}</div>
                            <footer>{location.address}</footer>
                            <Link to={`/locations/edit/${location.id}`}><button>Edit Track</button></Link>
                            <button onClick={(evt) => {deleteLocation(evt, location)} }>Delete</button>
                        </section>
                    }
                )
            }
        </article>
    </>
}