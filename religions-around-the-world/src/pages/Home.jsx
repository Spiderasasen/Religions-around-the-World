import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

function Home(){
    const [religions, setReligions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch('http://localhost:8000/religions')
            .then(res=>res.json())
            .then(data => {
                setReligions(data)
                setLoading(false)
            })
            .catch((err) =>{
                console.log('error trying to fetch religions', err)
                setLoading(false)
            })
    }, [])

    if(loading){return <p>Loading...</p>}

    // a list of religions will be placed, here. making the transition to religion page more simple
    return(
        <div>
            <h1>Religious Encyclopedia</h1>
            <h3>Please chose a Religion</h3>
            <ul>
                {
                    religions.map((rel) =>(
                        <li key={rel.religions_ley}>
                            <Link to={`/religions/${rel.religions_key}`}>{rel.religion_name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default Home;