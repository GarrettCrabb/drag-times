import { useState } from "react";
import { TimeSlipList } from "./TimeSlipList";
import { TimeSlipSearch } from "./TimeSlipSearch";

export const TimeSlipContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TimeSlipSearch setterFunction={setSearchTerms} />
        <TimeSlipList searchTermState={searchTerms} />
    </>
}