import {useParams} from "react-router-dom";

function BranchPage(){
    const {religionId, branchId} = useParams();

    return(
        <>
            <h1>Religion: {religionId}</h1>
            <h2>Branch: {branchId}</h2>
        </>
    );
}
export default BranchPage;