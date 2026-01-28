import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReligionMap from "../componets/ReligionMap.jsx";

function ReligionPage(){
    const { id} = useParams();
    const [religion, setReligion] = useState(null);
    const [loading, setLoading] = useState(true);

    //fetches the code from the api and loads it
    useEffect(() => {
        console.log("Fetching:", `http://localhost:8000/religions/${id}`);
        //calls the api from the id
        fetch(`http://localhost:8000/religions/${id}`)
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
    }, [id]);

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/religions/${id}/regions`)
            .then(res => res.json())
            .then(data => {
                console.log("Regions from backend:", data);
                setRegions(data);
            })
            .catch(err => console.log("Error fetching regions:", err));
    }, [id]);

    //loading
    if(loading){return(<p>Loading...</p>)}
    //checking if the religion is not there
    if(!religion){return(<p>Religion could not be found.</p>)}

    return(
        <div>
            <h1>Religion: {religion.religion_name}</h1>
            <p>{religion.religion_description}</p>
            <ReligionMap highlightedCountries={regions} />
        </div>
    );
}
export default ReligionPage;