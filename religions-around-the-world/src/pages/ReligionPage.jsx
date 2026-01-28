import {useParams} from "react-router-dom";


function ReligionPage(){
    const religionId = useParams();

    return(
        <h1>Religion: {religionId}</h1>
    );
}
export default ReligionPage;