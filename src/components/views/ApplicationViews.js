import { Route, Routes } from "react-router-dom"
import { TimeSlipList } from "../timeslips/TimeSlipList"
import { TimeSlipForm } from "../timeslips/TimeSlipForm"
import { TimeSlipDetails } from "../timeslips/TimeSlipDetails"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/timeSlips" element={ <TimeSlipList /> } />
            <Route path="/timeSlip/create" element={ <TimeSlipForm /> } />
            <Route path="/timeSlip/details/:timeSlipId" element={ <TimeSlipDetails /> } />
        </Routes>
    )
}