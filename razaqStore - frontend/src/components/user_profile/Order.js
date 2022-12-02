import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayViewMore } from '../../features/user-profile/profileSlice'

const Order = ()=>{
    const dispatch = useDispatch()
    
    return <main className='order-wrapper'>
        <small className='order-title'>3 orders</small>
        <article className="product-orders">
            <img src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/66/497518/1.jpg?4484" alt="" />
            <div className='productInfo'>
                <span className='info'>
                    <p className='product-name'>Oraimo Silver Edition Smart Watch 1.69'' IPS Screen IP68 Waterproof</p>
                    <span>5 qty</span>
                    <p>$31,765 paid</p>
                </span>
                <span className='links'>
                    <a href="#">View product</a>
                    <a href="#" className="make-review">Make a review</a>
                </span>
            </div>
        </article>
        <article className="product-orders">
            <img src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/66/497518/1.jpg?4484" alt="" />
            <div className='productInfo'>
                <span className='info'>
                    <p className='product-name'>Oraimo Silver Edition Smart Watch 1.69'' IPS Screen IP68 Waterproof</p>
                    <span>5 qty</span>
                    <p>$31,765 paid</p>
                </span>
                <span className='links'>
                    <a href="#">View product</a>
                    <a href="#" className="make-review">Make a review</a>
                </span>
            </div>
        </article>
        <article className="product-orders">
            <img src="https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/66/497518/1.jpg?4484" alt="" />
            <div className='productInfo'>
                <span className='info'>
                    <p className='product-name'>Oraimo Silver Edition Smart Watch 1.69'' IPS Screen IP68 Waterproof</p>
                    <span>5 qty</span>
                    <p>$31,765 paid</p>
                </span>
                <span className='links'>
                    <a href="#">View product</a>
                    <a href="#" className="make-review">Make a review</a>
                </span>
            </div>
        </article>
        <button onClick={()=> dispatch(setDisplayViewMore('order'))} className='view-more-btn' type='button'>View more</button>
    </main>
}
export default Order