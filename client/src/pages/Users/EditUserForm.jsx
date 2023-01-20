import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation,useDeleteUserMutation } from './usersApiSlice'
import { BsTrash } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi'
import ROLS_LIST from '../../other/profilConfig'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const navigate = useNavigate()
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()
    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const [username, setUsername] = useState(user.user_name)
    const [email, setEmail] = useState(user.user_email)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [role, setRole] = useState(user.role)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRole('')
            navigate(`/admin/user/${user.id}`)
        }

    }, [isSuccess,isDelSuccess, navigate,user.id])

    const onSaveUserClicked = async (e) => {
        console.log(username, email)
        if (password) {
            await updateUser({ 
                id: user.id,
                user_name: username, 
                user_email: email, 
                role:role
            })
        } else {
            await updateUser({ 
                id: user.id,
                user_name: username, 
                user_email: email, 
                role:role
            })
        }
    }
    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    let canSave
    if (password) {
        canSave = [role, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [role, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !role ? 'form__input--incomplete' : ''
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <form className="edit_form" onSubmit={e => e.preventDefault()}>
                <p className={errClass}>{errContent}</p>
                <div className="form__title_row">
                    <h2>Lietotājs: {username}</h2>
                    <div className="form_action_buttons">
                        <button
                            className="icon_button_save"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={canSave}
                        >
                            <BiSave/>
                        </button>
                        <button
                            className="icon_button_delite"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <BsTrash/>
                        </button>
                    </div>
                </div>
                <label className="form_label" htmlFor="username">
                    Lietotājvārds: <span className="nowrap">[3-20 burti]</span></label>
                <input
                    className={`form_input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form_label" htmlFor="email">
                    E-pasts: <span className="nowrap">[3-20 burti]</span></label>
                <input
                    className={`form_input ${validUserClass}`}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form_label" htmlFor="newpassword">
                    Parole: <span className="nowrap"></span> <span className="nowrap">[4-12 burti vai !@#$%]</span></label>
                <input
                    className={`form_input ${validPwdClass}`}
                    id="newpassword"
                    name="newpassword"
                    type="newpassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form_label" htmlFor="password">
                   Jaunā parole: <span className="nowrap"></span> <span className="nowrap">[4-12 burti vai !@#$%]</span></label>
                <input
                    className={`form_input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="form_label" htmlFor="roles">
                    ASSIGNED ROLES: {role}</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form_select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                   {<>
                    <option key={ROLS_LIST.Admin} value={ROLS_LIST.Admin}> {ROLS_LIST.Admin}</option >
                   <option key={ROLS_LIST.Editor} value={ROLS_LIST.Editor}> {ROLS_LIST.Editor}</option >
                   <option key={ROLS_LIST.User} value={ROLS_LIST.User}> {ROLS_LIST.User}</option >
                   </>}
                </select>

            </form>
        </>
    )

    return content
}
export default EditUserForm