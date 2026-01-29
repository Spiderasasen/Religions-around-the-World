import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReligionMap from "../componets/ReligionMap.jsx";

function BranchPage(){
    const {religionId, branchId} = useParams();
    const [loading, setLoading] = useState(true);
    const [religion, setReligion] = useState(null);
    const [branch, setBranch] = useState(null);

    //fetches the code from the api and loads it
    useEffect(() => {
        console.log("Fetching:", `http://localhost:8000/religions/${religionId}`);
        //calls the api from the id
        fetch(`http://localhost:8000/religions/${religionId}`)
            .then(res => res.json())
            .then(data => {
                setReligion(data);
                setLoading(false);
            })
            //if an error occors it will return nothing and will let us know that something mess up
            .catch(err => {
                console.log("Error fetching religion:", err);
                setLoading(false);
            });
    }, [religionId]);

    //calling the branch
    useEffect(() => {
        fetch(`http://localhost:8000/religions/${religionId}/branch/${branchId}`)
            .then(res => res.json())
            .then(data => setBranch(data));
    }, [religionId, branchId]);

    //loading
    if (loading || !branch || !religion) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            {/*for the intro*/}
            <div>
                <h1>Religion: {religion.religion_name}</h1>
                <h2>Branch: {branch.branch_name}</h2>
                <p>{branch.branch_description}</p>
            </div>
            {/*for the map*/}
        </div>
    );
}
export default BranchPage;