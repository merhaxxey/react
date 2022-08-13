import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {categories} from '../categories'
import {IoIosArrowForward} from 'react-icons/io'
import CreateRatingStars from './CreateRatingStars'
import {GrFormAdd} from 'react-icons/gr'
import {BiMinus} from 'react-icons/bi'
import {BsTruck} from 'react-icons/bs'
import {MdHouseSiding} from 'react-icons/md'
import { MdAssignmentReturn } from "react-icons/md";
import StarsIcon from '@mui/icons-material/Stars';
import './Product.css'

const url = 'http://localhost:3000/products.json'

const Product = ()=>{
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const {id} = useParams()
    const [productId, setProductId] = useState(Number(id))
    const [similarProduct, setSimilarProduct] = useState([]) 
    const [productCategories, setProductCategories] = useState([])
    const [priceDiscount, setPriceDiscount] = useState(0)
    //fetch products    
    const getProduct = async()=>{
        const response = await fetch(url)
        const products = await response.json()
    
        let discount = products[productId].discount
        discount = (100-discount)/100
        discount = products[productId].price * discount

        const productsRecommendedTemp = products.filter((item, index)=>{
            
            if(item.category === products[productId].category){
                return item
            }
        })
        .filter((item, index)=>{
            if(item.name !== products[productId].name){
                return item
            }
        })

        setSimilarProduct(productsRecommendedTemp)
        setPriceDiscount(discount)
        setProduct(products[productId])
        setProductCategories(categories)
        setLoading(false)
        
    }
    useEffect(()=>{
        getProduct()
    }, [])
    
    if(loading){
        return <h2>Loading...</h2>
    }
    if(!loading){
        console.log(similarProduct)
    }

    return <main id='product-id' className='product'>
        <ul className='product-directory-links'>
            <li>
                <a href="/">Product</a>
            </li>
            <li >
                <IoIosArrowForward className='icon'/>
            </li>
            <li>    
                <a href="/">{productCategories[product.ref].name}</a>
            </li>
            <li >
                <IoIosArrowForward className='icon'/>
            </li>
            <li>
                <a href="/">{product.category}</a>
            </li>
        </ul>
        <div className='product-information'>
            <article className='image-viewer'>
                <img src={product.img[0]} alt="" />
                <span className="image-list">{product.img.map((item, index)=>{
                    return <img src={item} alt="" />
                })}
                </span>
            </article>
            <div className='product-info-wrapper'>
                <article className='product-info'>
                    {product.brand && <a href='/brand-products' className='product-brand'>{product.brand}</a>}
                    <p className='product-name'>{product.name}</p>
                    <div className='rating-wrapper'>
                        <article>
                            <CreateRatingStars productRating={product.customer_rating}/>
                            <Link className='others reviews'  to='/reviews/:reviewId'>{`(${product.customer_rating})`}</Link>
                            <span className='others verified-rating' >3 verified rating</span>
                        </article>

                    </div>
                    <div className='prices-wrapper'>
                        <span id='price-discount-id' className='price-discount'><span id='naira-sign1'>NGN</span>{`${priceDiscount}`}</span>
                        <span id='price-id' className='price'>NGN{product.price}</span>
                        <span id='discount-rate-id' className='discount-rate'>{-product.discount}%</span>
                    </div>

                    <div id='quantity-wrapper-id' className='quantity-wrapper'>
                        <p className='title'>Quantity</p>
                        <span className='quantity-control-wrapper'>
                            <button type='submit'><BiMinus className='icon decrease-button' /></button>
                            <input  value={1} className='input-box' type="text" />
                            <button type='submit'><GrFormAdd className='icon increase-button' /></button>
                            <span style={{}} className='quantity-left'>only 9 left</span>
                        </span>

                    </div>
                    <div className='product-purchase-buttons'>
                        <button className='buy-button'>Buy Now</button>
                        <button className='cart-button'>Add to Cart</button>
                    </div>
                </article>
                <article className='delivery-and-return'>
                    <p className='title'>Delivery and Return</p>
                    <span className='article door-delivery'>
                        <span className='icon-wrapper'>
                            <BsTruck className='icon'/>
                        </span>
                        <span className='sub-article'>
                            <b>Door Delivery</b>
                            <p>Delivery to door step cost NGN500 within Ondo state. note the price varies from location to location</p>
                            <p>Goods will be delivered within 48hrs of order</p>
                        </span>
                    </span>
                    <span className='article pickup-station'>
                        <span className='icon-wrapper'>
                            <MdHouseSiding className='icon'/>
                        </span>
                        <span className='sub-article'>
                            <b>Pickup station</b>
                            <p>Delivery cost NGN630</p>
                            <p>Goods will be delivered within 48hrs of order</p>
                        </span>
                    </span>
                    <span className='article return-policy'>
                        <span className='icon-wrapper'>
                            <MdAssignmentReturn className='icon'/>
                        </span>
                        <span className='sub-article'>
                            <b>Return policy</b>
                            <p>Product will be returned within 75days. But not all seller accept return so check the seller information</p>
                        </span>
                    </span>
                </article>
            </div>
            {/* ------------------ seller information ---------------------- */}
            <section className='rightMostView-of-productInformation'>
                <div className='seller-information'>
                    <h3>Seller Information</h3>
                    <article id='seller-info-wrapper-id' className='seller-info-wrapper'>
                        <span className='seller-info'>
                            <b>Johnny Limited</b>
                            <p>90% seller score</p>
                            <p>1000 followers</p>
                        </span>
                        <button type='submit'>Follow</button>
                    </article>
                    <article className='seller-performance-wrapper'>
                        <h4 className='title'>Seller Performance</h4>
                        <span className='seller-performance seller-performance1'>
                            <i><StarsIcon  className='icon'/></i>
                            <p>Order fulfilment: </p>
                            <p className='grade'>Excellent</p>
                        </span>
                        <span className='seller-performance'>
                            <i><StarsIcon className='icon'/></i>
                            <p>Quality Score: </p>
                            <p className='grade'>Good</p>
                        </span>
                        <span className='seller-performance'>
                            <i><StarsIcon className='icon'/></i>
                            <p>Customer rating: </p>
                            <p className='grade'>Good</p>
                        </span>
                    </article>
                </div>
                <article className='other-similar-products'>
                    <h4 className='title'>Other similar product</h4>
                    {similarProduct[0] && 
                    <Link to='/product/' className='similar-product'>
                        <img src={similarProduct[0].img[0]} alt="" />
                        <p>NGN{similarProduct[0].price}</p>
                    </Link>}

                    {similarProduct[1] && 
                    <Link to={`/product/`} className='similar-product'>
                        <img src={similarProduct[1].img[0]} alt="" />
                        <p>NGN{similarProduct[1].price}</p>
                    </Link>}

                </article>
            </section>
        </div>

    </main>
}

export default Product