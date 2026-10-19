import { useState, useEffect } from 'react';
import { getAssignments } from '../api/assignments';
import AssignmentList from '../components/AssignmentList';
import AssignmentForm from '../components/AssignmentForm';

function AssignmentPage() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function loadAssignments() {
        getAssignments()
            .then((data) => setAssignments(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadAssignments()
    }, [])

    return (
        <main>
        <h1>과제 목록</h1>
        <AssignmentForm onCreated={loadAssignments} />
        <AssignmentList assignments={assignments} loading={loading} error={error}/>
        </main>
    )
}

export default AssignmentPage

