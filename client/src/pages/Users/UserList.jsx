import { useGetUsersQuery } from "./usersApiSlice"
import './Users.styles.scss'
import '../page.scss'
import AppWrap from '../../Wrapper/App_wrapper'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UsersList = ({activeMenu}) => {
    const navigate = useNavigate()
    const handleEdit = (userId) => navigate(`/admin/user/edit/${userId}`)
    const handleCreate = () => navigate(`/admin/user/new`)


    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('getUsers')
    
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const renderedUsers = users.ids.map(userId => (
            <li key={userId} style={{margin:"10px 0px 10px 0px"}}>
                <Link to={`/admin/user/${userId}`}>{users.entities[userId].user_name}</Link>
                {JSON.stringify(users.entities[userId])}
                <button onClick={() => handleEdit(userId)}>
                    Rediģēt 
                </button>
            </li>
        ))

        content = (
            <section style={{margin:"0px 0px 0px 50px",maxWidth:'1500px',wordWrap: 'break-word'}}>
                <div className="flex">
                    <h2>Users</h2>
                    <button onClick={() => handleCreate()}>
                        Izveidot jaunu lietotāju 
                    </button>
                </div>
                <ul>{renderedUsers}</ul>
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
export default AppWrap(UsersList)