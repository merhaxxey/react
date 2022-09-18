import {FaCommentsDollar, FaUserCircle} from 'react-icons/fa'
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {BsPerson} from 'react-icons/bs'
import {MdBookmarkBorder} from 'react-icons/md'
import {RiLogoutCircleLine} from 'react-icons/ri'


const RightSideView = ()=>{
    const {user} = useSelector((store)=> store.header)
    const [username, setUsername] = useState(undefined)
    
    useEffect(()=>{
        setUsername(user?.name?.split(' ')[0])
    }, [user])

    return <section id="right-view">
        <div className="account">
            <span className="userCircleIcon-wrapper">
            {/* <img className="login-background" src="http://localhost:3000/login-background.jpg" alt="" /> */}
            <FaUserCircle className="userCircleIcon"/>
            </span>
            <p className="welcome">{ username? `Hello, ${username}`: 'Welcome to easyBuy'}</p>
            <span className="btn-wrapper">
            
                {!username || <div id='signedInUser-links-id' className='signedInUser-links'>
                    <Link to='/profile'>
                        <BsPerson className='icons'/>
                        <p>Account</p>
                    </Link>
                    <Link to='/profile'>
                        <MdBookmarkBorder className='icons'/>
                        <p>Order</p>
                    </Link>
                    <Link to='/logout'>
                        <RiLogoutCircleLine className='icons'/>
                        <p>Logout</p>
                    </Link>
                </div>}

                {username!==undefined || <div >
                    <a href='http://localhost:3000/signup' className="signup" type="button">Sign up</a>
                    <a href='http://localhost:3000/login' className="login" type="button">Login</a>
                </div>}    
            </span>      
        </div>
        <article className="newCustomers-offer">
            <p>Exclusive offers</p>
            <h3>Just for new customers</h3>
            <div className="image-grid">
            <img src={"https://ae01.alicdn.com/kf/S81b31d6d00f14a1cb43db7f148b8c1e2M/Original-Air-Pro-4-TWS-Wireless-Headphones-Bluetooth-5-0-Earphone-In-Ear-Earbuds-Gaming-Headset.jpg_220x220xz.jpg_.webp"} alt=""/>
            <img src={"https://ae01.alicdn.com/kf/H606bb95b86df4489bfa571b86267c277U/Sports-Shoes-for-Men-casual-Breathable-Running-Shoes-Men-s-Sneakers.jpg_220x220xz.jpg_.webp"} alt=""/>
            <img src={"https://ae01.alicdn.com/kf/S7ba32432bad54531840fc810005ec908W/2022-Men-Polo-Men-Shirt-Short-Sleeve-Polo-Shirt-Contrast-Color-Polo-New-Clothing-Summer-Streetwear.jpg_220x220xz.jpg_.webp"} alt="" />
            <img src={"https://ae01.alicdn.com/kf/S76c93230e5284eb09a3bdcef1a66b73eF/Hip-Hop-Loose-Men-and-Women-Hoodies-Sweatshirt-Autumn-Streetwear-Bear-with-Glasses-Print-Jumpers-Harajuku.jpg_220x220xz.jpg_.webp"} alt="" />
            </div>
            <button  className="click-here">Click here</button>
        </article>
    </section>
}
export default RightSideView