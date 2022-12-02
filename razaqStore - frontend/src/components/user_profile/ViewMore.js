import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BsArrowLeft} from 'react-icons/bs'
import { setDisplayViewMore } from '../../features/user-profile/profileSlice'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CircularIndeterminate from '../progress/Circular'

const ViewMore = ()=>{
    const dispatch = useDispatch()
    const {displayViewMore} = useSelector((store)=> store.profile)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const func = async()=>{
            const response = await axios.get('/api/v1/recentlyViewed')
            if(response.status === 200){
                setProducts(response.data.products)
            }
            setLoading(false)
            console.log(response.data.products)

        }
        func()
    }, [])

    if(loading){
        <CircularIndeterminate/>
    }

    return <main className='view-more-wrapper'>
        <nav className='view-more-nav'>
            <BsArrowLeft onClick={()=> dispatch(setDisplayViewMore(''))} className='icon'/>
            <span className='title'>{displayViewMore}</span>
        </nav>
        <hr />
        <section className='order-wrapper'>
            <small className='order-title'>{products.length} {displayViewMore}</small>
            {products.map((item, index)=>{
                const {img, name, price, discount} = item
                let payablePrice = price - (price * (discount/100))
                payablePrice = Math.ceil(payablePrice)

                return <article className="product-orders">
                    <img src={img[0]} alt="" />
                    <div className='productInfo'>
                        <span className='info'>
                            <p className='product-name'>{name}</p>
                            <span>5 qty</span>
                            <p>NGN{payablePrice}</p>
                        </span>
                        <span className='links'>
                            <Link to={`/product?name=${name}`} >View product</Link>
                        </span>
                    </div>
                </article>
            })}
        </section>
        
    </main>
}
export default ViewMore