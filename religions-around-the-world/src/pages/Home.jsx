import {Link} from 'react-router-dom'
import religions from "../data/religions.json"

function Home(){
    // a list of religions will be placed, here. making the transition to religion page more simple
    return(
        <div>
            <h1>Religious Encyclopedia</h1>
            <h3>Please chose a Religion</h3>
            <ul>
                {
                    religions.map((rel) =>(
                        <li key={rel.id}>
                            <Link to={`/religions/${rel.id}`}>{rel.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default Home;