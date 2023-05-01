import { Route, Routes } from "react-router-dom"
import { TimeSlipList } from "../timeslips/TimeSlipList"
import { TimeSlipForm } from "../timeslips/TimeSlipForm"
import { TimeSlipDetails } from "../timeslips/TimeSlipDetails"
import { LocationList } from "../locations/LocationList"
import { VehicleList } from "../vehicles/VehicleList"
import { VehicleEdit } from "../vehicles/VehicleEdit"
import { LocationEdit } from "../locations/LocationEdit"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/timeSlips" element={ <TimeSlipList /> } />
            <Route path="/timeSlip/create" element={ <TimeSlipForm /> } />
            <Route path="/timeSlip/details/:timeSlipId" element={ <TimeSlipDetails /> } />
            <Route path="/locations" element={ <LocationList /> } />
            <Route path="/locations/edit/:locationId" element={ <LocationEdit /> } />
            <Route path="/garage" element={ <VehicleList /> } />
            <Route path="/garage/edit/:vehicleId" element={ <VehicleEdit /> } />
        </Routes>
    )
}