import React,{ useEffect, useState} from 'react'
import CurrencyFormat from 'react-currency-format'
import {Link} from 'react-router-dom'
import data from './randGenData'

function MoreToLove({width}) {
	const [products, setProducts] = useState([]) 
	const [randGeneratedNumbers, setRandGeneratedNumbers] = useState([])
	const [productsIndex, setProductsIndex] = useState(data.productsIndex)
	
	useEffect(()=>{
		const getProducts = async()=>{
			const response = await fetch('http://localhost:3000/products.json')
			const productsData = await response.json()
			
			setProducts(productsData)
		}
		getProducts()
	}, [])
	useEffect(()=>{
		if(products.length < 1) return
		
		const productsLength = products.length-1
		let index = 0
		let randNumber = 0
		const arr = []
		while(index < 24){
			while(true){
				randNumber = Math.ceil(Math.random() * productsLength)
				if(arr.find((item, index)=> item === randNumber) === undefined) break
			}
			arr.push(randNumber)
			index++
		}
		console.log(arr)
		setRandGeneratedNumbers(arr)
	}, [products])

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
					productsIndex
						.slice(0,18)
						.map((item, index)=>{
						
							const {img, name, price, sold, discount, freeShipping} = products[item]

							return <Link to={`/product/${item}`} id="moreToLove-product-id" className='moreToLove-product'>
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