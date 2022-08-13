import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {FcGoogle} from 'react-icons/fc'
import Footer from './Footer'
import './Signup.css'

const Signup = ()=>{
    const [check, setCheck] = useState(true)
    const changeCheckStatus = ()=>{
        setCheck(!check)
    }

    return <main id='account-main'>
     <section id='form-wrapper-id' className='form-wrapper'>
        <span className='logo'>
            <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1659947058/my-website-logos/easybuy_zzwzfc.jpg" alt="easy buy" />
        </span>
        <form classaName='form' id="form-id" action="">
            <h2>Create an easyBuy account</h2>
            <input id="text-input" type="text" placeholder='First name'/>
            <input id="text-input" type="text" placeholder='Last name'/>
            <input id="text-input" type="text" placeholder='Email address'/>
            <input id="text-input" type="text" placeholder='Create a password'/>
            <div className='checkbox-wrapper'>
                <input onChange={changeCheckStatus} className='checkbox' type="checkbox" checked={check} />
                <span>Keep me signed in</span>
            </div>
            <span className='agreement'>By clicking on create account, you acknowledge you have read and agreed to our <a href="#">Terms of use</a> and <a href="#">Privacy policy</a></span>
            <button type="submit">Create account</button>
            
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