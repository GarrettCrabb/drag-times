import { useEffect, useState } from "react"
import { VehicleForm } from "./VehicleForm"
import { Link } from "react-router-dom"

export const VehicleList = () => {
    const [vehicles, setVehicles] = useState([])
    const [filteredVehicles, setFiltered] = useState([])

    const localDragUser = localStorage.getItem("drag_user")
    const dragUserObject = JSON.parse(localDragUser)

    const getVehicles = () => {
        fetch(`http://localhost:8088/vehicles`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setVehicles(locationsArray)
                })
    }

    const deleteVehicle = (evt, vehicle) => {
        return fetch(`http://localhost:8088/vehicles/${vehicle.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getVehicles()
            })
    }

    useEffect(
        () => {
           getVehicles()
        },
        []
    )

    useEffect(
        () => {
            const myVehicles = vehicles.filter(vehicle => vehicle.userId === dragUserObject.id)
            setFiltered(myVehicles)
        },
        [vehicles]
    )

    return <>
        <h2 className="garageTitle">Your Garage</h2>

        <article className="vehicleForm">
            <VehicleForm getVehicles={getVehicles}/>
        </article>

        <article className="vehicles">
            {
                filteredVehicles.map(
                    (vehicle) => {
                        return <section key={`${vehicle.id}`} className="vehicle">
                            <div>{vehicle.year} {vehicle.make} {vehicle.model}</div>
                            <Link to={`/garage/edit/${vehicle.id}`}><button className="editVehicleButton">Edit Vehicle</button></Link>
                            <button className="deleteVehicleButton" onClick={(evt) => {deleteVehicle(evt, vehicle)} }>Delete</button>
                        </section>
                    }
                )
            }
        </article>
    </>
}