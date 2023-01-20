import { useGetUsersByUserIdQuery } from "./usersApiSlice"
import { useParams } from 'react-router-dom';
import './Users.styles.scss'
import '../page.scss'
import AppWrap from '../../Wrapper/App_wrapper'
import { useNavigate } from 'react-router-dom'


const User = ({activeMenu}) => {
    const { userid } = useParams()
    let content;
    const navigate = useNavigate()
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersByUserIdQuery(userid)
    const user = data?.entities[userid]
    
    if (isLoading) {content = <p>"Loading..."</p>;}
    else if (isSuccess) {
        const handleEdit = (userId) => navigate(`/admin/user/edit/${userId}`)
        content = (
            <section key={userid} style={{margin:"0px 0px 0px 50px",maxWidth:'1500px',wordWrap: 'break-word'}}>
                <h2>{user.user_name}</h2>
                <p>{user.user_email}</p>
                <br/>
                <p>{JSON.stringify(user)}</p>
                <button onClick={() => handleEdit(userid)}>
                    Rediģēt 
                </button>
            </section>
        )
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <div className={`${activeMenu ? 'page_content_open' : 'page_content_close'} `}>
            <h1 className='component_title'>Lietotāju saraksts</h1>
            {content}
        </div>
    )
}

export default AppWrap(User)