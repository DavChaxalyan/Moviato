import ActorsPage from '../../components/ActorsPage/ActorsPage'
import { useParams } from "react-router-dom";

const Actor = () => {
    const {id} = useParams();
    return (
        <div className='main-container'>
            <ActorsPage id={id}/>
        </div>
    )
}

export default Actor;