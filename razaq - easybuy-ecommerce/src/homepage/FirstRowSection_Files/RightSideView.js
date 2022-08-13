import {FaCommentsDollar, FaUserCircle} from 'react-icons/fa'
import React from 'react'
import {Link} from 'react-router-dom'

const RightSideView = ()=>{
    return <section id="left-view">
        <div className="account">
            <span className="userCircleIcon-wrapper">
            {/* <img className="login-background" src="http://localhost:3000/login-background.jpg" alt="" /> */}
            <FaUserCircle className="userCircleIcon"/>
            </span>
            <p className="welcome">Welcome to easyBuy</p>
            <span className="btn-wrapper">
            <a href='http://localhost:3000/signup' className="signup" type="button">Sign up</a>
            <a href='http://localhost:3000/login' className="login" type="button">Login</a>
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