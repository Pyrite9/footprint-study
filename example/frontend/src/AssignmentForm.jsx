import { useState } from "react";
import { createAssignment } from "./api/assignments";

function AssignmentForm({ onCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState(null);


    function handleSubmit(event) {
        event.preventDefault()
        setError(null)
        
        createAssignment({ title, description, startDate, endDate })
            .then(() => {
                setTitle("");
                setDescription("");
                setStartDate("");
                setEndDate("");
                onCreated();
            })
            .catch((err) => setError(err.message))
    } 
    return (
        <form onSubmit={handleSubmit}>
            <input value={title} placeholder="title" onChange={(event) => setTitle(event.target.value)} />
            <input value={description} placeholder="description" onChange={(event) => setDescription(event.target.value)} />
            <input type="date" value={startDate} placeholder="startDate" onChange={(event) => setStartDate(event.target.value)} />
            <input type="date" value={endDate} placeholder="endDate" onChange={(event) => setEndDate(event.target.value)} />
            <button type="submit">입력</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default AssignmentForm
