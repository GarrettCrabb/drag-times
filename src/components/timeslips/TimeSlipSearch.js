export const TimeSlipSearch = ({ setterFunction }) => {
    return (
        <div>
            <input className="timeSlipSearch"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder="Search By Date" />
        </div>
    )
}