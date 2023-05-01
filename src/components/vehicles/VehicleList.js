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
        <h2>Your Garage</h2>

        <article className="vehicleForm">
            <VehicleForm getVehicles={getVehicles}/>
        </article>

        <article className="vehicles">
            {
                filteredVehicles.map(
                    (vehicle) => {
                        return <section key={`${vehicle.id}`} className="vehicle">
                            <div>{vehicle.year} {vehicle.make} {vehicle.model}</div>
                            <Link to={`/garage/edit/${vehicle.id}`}><button>Edit Vehicle</button></Link>
                        </section>
                    }
                )
            }
        </article>
    </>
}