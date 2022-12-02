import React from 'react'
import {MdOutlineWarningAmber} from 'react-icons/md'

const Logout = ()=>{
    return <main className='logout-wrapper'>
        <nav className='warning'>
            <MdOutlineWarningAmber className='icon'/>
            <span className='title'>Warning</span>
        </nav>
        <article>
            <p className='warning-message'>You will be logged out of your account, are you sure you want to continue</p>
        </article>
        <div className='btn-wrapper'>
            <button type='button' className='btn1'>Ok </button>
            <button type='button' className='btn2'>Cancel</button>
        </div>
    </main>
}

export default Logout