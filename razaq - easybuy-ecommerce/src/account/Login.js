import React from 'react'
import {Link} from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {FcGoogle} from 'react-icons/fc'
import Footer from './Footer'
import './Signup.css'
import './Login.css'

const Login = ()=>{
    return <main id='account-main' className='login-account-main'>
    <section id='form-wrapper-id' className='login-form-wrapper form-wrapper'>
       <span className='logo'>
           <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1659947058/my-website-logos/easybuy_zzwzfc.jpg" alt="easy buy" />
       </span>
       <form classaName='form login-form' id="form-id" action="">
           <h2>Sign in to your account</h2>
           <input id="text-input" type="text" placeholder='Email address'/>
           <input id="text-input" type="text" placeholder='Password'/>

           <button type="submit">Sign In</button>
           
           <div className='signup-option login-option'>
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