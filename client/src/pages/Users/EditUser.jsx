import { useParams } from 'react-router-dom';
import { useGetUsersByUserIdQuery } from "./usersApiSlice"
import EditUserForm  from './EditUserForm'
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri'
import './Users.styles.scss'
import '../page.scss'
import AppWrap from '../../Wrapper/App_wrapper'


const EditUser = ({activeMenu}) => {
    const { userid } = useParams()
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersByUserIdQuery(userid)
    const user = data?.entities[userid]
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = user ? <EditUserForm user={user} activeMenu={activeMenu}/> : <p>Loading...</p>
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <div className={`${activeMenu ? 'page_content_open' : 'page_content_close'} `}>
            <div className='component_title'>
                <button onClick={() => navigate(-1)}><RiArrowGoBackLine/></button>
                <h1>Rediģēt lietotāja informāciju</h1>
            </div>
            {content}
        </div>
    )
}

export default AppWrap(EditUser)