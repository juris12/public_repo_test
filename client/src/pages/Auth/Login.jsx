import  { useEffect, useState, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import regex from '../../other/regex';
import { setCredentials, setUser } from './authSlice'
import './Auth.styles.scss'
import Axios  from '../../other/axios'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
const LOGIN_URL = '/auth'; 

//!Aa12afasf janis123@inbox.lv janis

const Loginpage=() => {

    const userRef = useRef(null);
    const errRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])
    useEffect(() => {
        setErrMsg('');
    },[pwd, user])
    const [login, { isLoading }] = useLoginMutation()
    const submitfunc = async (e) => {
      let body_obj = {}
        e.preventDefault();
        if(!(regex.EMAIL.test(user) || regex.USER.test(user)) || !regex.PWD.test(pwd)){
            setErrMsg("Nepareizs pieteikums!");
        }
        if(true){
          body_obj = { user_name: 'jangfbis' ,user_password: 'Aaf12afasf'}
        }else{
          body_obj = { user_email: user ,user_password: pwd}
        }
        try {
            const {object } = await login(body_obj).unwrap()
            dispatch(setCredentials({ accessToken: object?.accessToken, role: object?.role, id:object?.id }))
            setUser('')
            setPwd('')
            try{
              const { data } = await Axios.get('/users/1')
              dispatch(setUser({user_name: data[0].user_name}))
            }catch(err){
              console.log(JSON.stringify(err))
            }
            navigate('/admin')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }
    return (
    <section className='postpost_outer'>
      <div className='inerlogin'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscrean"} aria-live="assertive">{errMsg}</p>
      <p>jangfbis Aaf12afasf</p>
      <h2>Ienāc</h2>
      <form className='mazs' onSubmit={submitfunc}>
        <label htmlFor="username" className='offscreen'>
          Vārds vai E-pasts:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          className="normal_input"
          onChange={(e) => setUser(e.target.value)}
          required
          placeholder='E-pasts'
        ></input>
        <label htmlFor="password" className='offscreen'>
          Parole:
        </label>
        <input 
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          className="normal_input"
          placeholder='Parole'
        ></input> 
        <div className="login_lower">
          <div className="login_lower_iner">
              <input 
                type="checkbox" 
                id="checkrules" 
                onChange={() => setCheck(!check)}
                ></input>
               <label className='xmazs' htmlFor='checkrules'>Atceries mani</label>
          </div>
        </div>
        <button disabled={!user || !pwd ? true : false} className="login_submit mazs">
          Ienākt
        </button>
        <a href="register" className="login_signup xmazs">Vel nēsi reģistrējies? Reģistrējies</a>
      </form>
      </div>
    </section>
    )
}  

export default Loginpage;