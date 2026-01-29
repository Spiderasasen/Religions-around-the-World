import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import ReligionMap from "../componets/ReligionMap.jsx";

function ReligionPage(){
    const { id} = useParams();
    const [religion, setReligion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [branch, setBranch] = useState([]);

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

    //fetching the books
    useEffect(() => {
        fetch(`http://localhost:8000/religions/${id}/books`)
            .then(res => res.json())
            .then(data => {
                console.log("Books from backend:", data);
                setBooks(data);
            })
            .catch(err => console.log("Error fetching books:", err));
    }, [id]);

    //fetching the branches
    useEffect(() => {
        fetch(`http://localhost:8000/religions/${id}/branch`)
            .then(res => res.json())
            .then(data => {
                console.log("Branch from backend:", data);
                setBranch(data);
            })
            .catch(err => console.log("Error fetching branch:", err));
    }, [id]);

    //loading
    if(loading){return(<p>Loading...</p>)}
    //checking if the religion is not there
    if(!religion){return(<p>Religion could not be found.</p>)}

    return(
        <div>
            {/*for the title and description*/}
            <div>
                <h1>Religion: {religion.religion_name}</h1>
                <p>{religion.religion_description}</p>
            </div>
            {/*for the map*/}
            <div>
                <ReligionMap highlightedCountries={regions} />
                <p><em>Map with a majority of people practicing {religion.religion_name}</em></p>
            </div>
            {/*for the text involved in the religion*/}
            <div>
                <p>Text used in {religion.religion_name}</p>
                <ul>
                    {
                        books.map((text) =>{
                            return(
                                <li key={text.text_name}>
                                    <p>{text.text_name}</p>
                                </li>
                                );
                        })
                    }
                </ul>
            </div>
            {/*for the branches*/}
            <div>
                <p>Major branches of {religion.religion_name}</p>
                <ul>
                    {branch.map((b) => (
                        <li key={b.branch_key}>
                            <Link to={`/religions/${b.religions_religions_key}/${b.branch_key}`}>
                                {b.branch_name}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}
export default ReligionPage;