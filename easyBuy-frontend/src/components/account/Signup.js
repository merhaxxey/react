import React,{useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {FcGoogle} from 'react-icons/fc'
import Alert from './Alert'
import Loading from './Loading'
import Footer from './Footer'
import axios from 'axios'
import './Signup.css'
import { useEffect } from 'react';

const Signup = ()=>{
    const [check, setCheck] = useState(true)
    const changeCheckStatus = ()=>{
        setCheck(!check)
    }
    const [alert, setAlert] = useState({success: undefined, failure: undefined})
    const [values, setValues] = useState({})
    const [showFormError, setShowFormError] = useState({})
    const [loadingCircle, setLoadingCircle] = useState(false)
    const buttonRef = useState(null)
    const [onClickBtn, setOnClickBtn] = useState(false)

    const handleChange = (e)=>{

        setValues({...values, [e.target.name]:e.target.value})
        
        setShowFormError({...showFormError, [e.target.name]:false})
    }

    const submitData = async()=>{
        const {name, email, role, buisnessName, password} = values
        try{
            let formError = {}

            if(role==='seller' && !buisnessName){
                formError.buisnessName = true
            }
            if(!name){
                formError.name = true
            }
            if(!email){
                formError.email = true
            }
            if(!role){   
                formError.role = true
            }
            if(!password){
                formError.password = true
            }

            setShowFormError(formError)
            if(!name || !email || !role || !password){
                return
            }
            
            setLoadingCircle(true)
            setOnClickBtn(true)
            const {data} = await axios.post('/api/v1/auth/register', {name, email, role, password})
            setAlert({failure: undefined, success: 'Account created, email confirmation is sent to your email'})
        }
        catch(error){
            if(error.response.status!== 400){
                setAlert({success: undefined, failure:'Something went wrong, please try again'})
            }
            else{
                setAlert({success: undefined, failure: error.response.data.msg})
            }
        }
   
        setLoadingCircle(false)
        setOnClickBtn(false)
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setAlert((state)=>{
                return { success: undefined, failure: undefined}
            })
        }, 9000);
        return ()=> clearTimeout(timer)
    }, [alert])
    
    const handleSubmit = (e)=>{
        e.preventDefault()

        submitData()
    }
    return <main id='account-main'>
     <section id='form-wrapper-id' className='form-wrapper'>
        <span className='logo'>
            <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1659947058/my-website-logos/easybuy_zzwzfc.jpg" alt="easy buy" />
        </span>
        
        {!(alert.success || alert.failure) || <Alert alert={alert}/>}
        <form onSubmit={handleSubmit} className='form' id="form-id" action="">
            <h2>Create an easyBuy account</h2>
            <div className='input-wrapper'>
                <input onChange={handleChange} className="text-input" type="text" placeholder='Full name' name='name'/>
                {!showFormError.name || <small>*field required</small>}
            </div>
            <div className='input-wrapper'>
                <input className="text-input" onChange={handleChange} type="email" placeholder='Email address' name='email'/>
                {!showFormError.email || <small>*field required</small>}
            </div>
            <div className='input-wrapper'>
                <input className="text-input" onChange={handleChange} type="text" placeholder='Role' name='role'/>
                {!showFormError.role || <small>*field required</small>}
            </div>
            <div className='input-wrapper'>
                <input className="text-input" onChange={handleChange} type="password" placeholder='Create a password' name='password'/>
                {!showFormError.password || <small>*field required</small>}
            </div>
            <div className='checkbox-wrapper'>
                <input onChange={changeCheckStatus} className='checkbox' type="checkbox" checked={check} />
                <span>Keep me signed in</span>
            </div>
            <span className='agreement'>By clicking on create account, you acknowledge you have read and agreed to our <a href="#">Terms of use</a> and <a href="#">Privacy policy</a></span>
            <button ref={buttonRef} style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle? <Loading/>: 'Create account'}
            </button>
            
            <div className='signup-option'>
                <p>continue with</p>
                <div>
                    <Link to='/'>
                        <FacebookRoundedIcon className='facebook'/>
                    </Link>
                    <Link to='/'>
                        <FcGoogle className='google'/>
                    </Link>
                </div>
            </div>

            <p>Already have an account?</p>
            <Link className='login' to='/login'>Sign in</Link>
        </form>

    </section>
    </main>
}
export default Signup