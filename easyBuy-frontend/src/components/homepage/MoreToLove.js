import React,{ useEffect, useState} from 'react'
import CurrencyFormat from 'react-currency-format'
import {Link} from 'react-router-dom'
import data from './randGenData'
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from '../../features/home/homeSlice'
import Circular from '../progress/Circular'

function MoreToLove({width}) {
	const [randGeneratedNumbers, setRandGeneratedNumbers] = useState([])
	const [productsIndex, setProductsIndex] = useState(data.productsIndex)
	const {products, isLoading} = useSelector((store)=> store.home)
	const dispatch = useDispatch()
	
	useEffect(()=>{
		dispatch(getProducts())
	}, [])

	
	if(isLoading){
		return <Circular/>
	}

	return (
		<main  style={{width}} className='moreToLove-wrapper'>
			<section className='moreToLove-header'>
				<hr />
				<h2 id="moreToLove-h2-id">More To Explore</h2>
				<hr />
			</section>
			{products.length>0 &&
				<section className='moreToLove-products-wrapper'>
				{ 
					products.map((item, index)=>{
						const {img, name, price, sold, discount, freeShipping} = item

						return <Link to={`/product/${name}`} id="moreToLove-product-id" className='moreToLove-product'>
							<img src={img[0]} alt='products image' />
							<p id={'name-id'} className='name'>{name}</p>
							<span className='discount'>
								<span className='currency-name'>NGN</span><CurrencyFormat className='price-format' value={Math.ceil(price*((100-discount)/100))} displayType={'text'} thousandSeparator={true} />
							</span>
							{discount!==0
							&&
							<span className='price'>
								<span className='currency-name'>NGN</span><CurrencyFormat className='price-format' value={price} displayType={'text'} thousandSeparator={true} />
								<span className='discount-rate'>-{discount}%</span>
							</span>}
							<p className='sold'>{sold} sold</p>
							{freeShipping && <p className='freeShipping'>Free shipping</p>}
						</Link>
					})
				}
			</section>}
		</main>
	)
}

export default MoreToLove