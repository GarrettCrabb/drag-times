import { Route, Routes } from "react-router-dom"
import { TimeSlipList } from "../timeslips/TimeSlipList"
import { TimeSlipForm } from "../timeslips/TimeSlipForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/timeSlips" element={ <TimeSlipList /> } />
            <Route path="/timeSlip/create" element={ <TimeSlipForm /> } />
        </Routes>
    )
}