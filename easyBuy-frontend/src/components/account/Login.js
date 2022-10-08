import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {FcGoogle} from 'react-icons/fc'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import {useLocation} from 'react-router-dom'
import Alert from './Alert'
import axios from 'axios'
import Loading from './Loading'
import Footer from './Footer'
import './Signup.css'
import './Login.css'

const Login = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {accountComponentsMsg} = useSelector((store)=> store.home)
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [errormsg, setErrorMsg] = useState('')
    const [password, setPassword] = useState('')
    const [showFormError, setShowFormError] = useState({})
    const [loadingCircle, setLoadingCircle] = useState(false)
    const buttonRef = useState(null)
    const [onClickBtn, setOnClickBtn] = useState(false)
    const [alert, setAlert] = useState({success: undefined, failure: undefined})

    // some functions
    const loginUser = async(e)=>{
        e.preventDefault()
        
        if(!email || !password){
            setErrorMsg('please provide your email or password')
            setShowFormError({email: email? false: true, password: password? false: true})
            return
        }
        try {
            
            setLoadingCircle(true)
            setOnClickBtn(true)            
            const {data} = await axios.post('/api/v1/auth/login',{
                email,
                password
            })
            dispatch(setAccountComponentsMsg({...accountComponentsMsg, user:{name:data.user.name, role:data.user.role}}))
            navigate('/')
        } catch (error) {
            if(error.response.status!== 404){
                setAlert({success: undefined, failure:'Something went wrong, please try again'})
            }
            else{
                setAlert({success: undefined, failure: 'Email or password is incorrect'})
            }
        }
        
        setLoadingCircle(false)
        setOnClickBtn(false)
    }

    // ------ useEffects starts         -------------------------
    useEffect(()=>{
        const {payload} = accountComponentsMsg

        console.log(payload?.resetPassword)
        console.log(payload?.accVerified)
        
        if(payload?.resetPassword===true){
            setAlert({
                success: 'Password was reset, please login',
                failure:undefined
            })
        }
        if(payload?.accVerified === true){
            setAlert({
                success: 'Account confirmed, please login',
                failure: undefined
            })
        }
    
    }, [])

    useEffect(()=>{
        const timer = setTimeout(() => {
            setAlert((state)=>{
                return { success: undefined, failure: undefined}
            })
        }, 9000);
        return ()=> clearTimeout(timer)
    }, [alert])
    
    // ---  HTML   -----
    return <main id='account-main' className='login-account-main'>
    <section id='form-wrapper-id' className='login-form-wrapper form-wrapper'>
       <span className='logo'>
           <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1659947058/my-website-logos/easybuy_zzwzfc.jpg" alt="easy buy" />
       </span>
       
       <Alert alert={alert} />

       <form onSubmit={loginUser} className='form login-form' id="form-id" action="">
           <h2>Login to your account</h2>
           <div className='input-wrapper'>
               <input onChange={(e)=> {
                   setShowFormError({...showFormError, email:false})
                   setEmail(e.target.value)}
               }
                className="text-input" type="email" placeholder='Email address' name='email'/>
                {!showFormError.email || <small>*field required</small>}
            </div>
           <div className='input-wrapper'>
               <input onChange={(e)=> {
                   setShowFormError({...showFormError, password:false})
                   setPassword(e.target.value)
               }}
                className="text-input" type="text" placeholder='Password' name='password'/>
                {!showFormError.password || <small>*field required</small>}
            </div>

            <button style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle?<Loading/>: 'Login'}
            </button>

           <div className='signup-option login-option'>
               <p>continue with</p>
               <div>
                   <Link to='/'>
                       <FacebookRoundedIcon className='facebook'/>
                   </Link>
                   <Link to='/'>
                       <FcGoogle classN ame='google'/>
                   </Link>
               </div>
           </div>

           <div className='new-to-easybuy'>
                <hr />
                <p>New to easyBuy</p>
                <hr />
           </div>
           <Link className='login create-account' to='/login'>create an account</Link>
       </form>

   </section>
   </main>
}
export default Login