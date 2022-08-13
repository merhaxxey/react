import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {flashSalesData} from './flashSalesData'
import CurrencyFormat from 'react-currency-format'
import './FlashSales.css'
import { useGlobalContext } from '../StateProvider'
import {getRemainingTimeUntilMsTimeStamp} from '../contd/countdownTimer'

const defaultTime = {
    seconds: '00',
    minutes: '00',
    hours: '00'
}

function FlashSales({countdownTimestampMs, width}) {
    const {windowWidth} = useGlobalContext()    
    const [dealData, setDealData] = useState(flashSalesData)
    const [remainingTime, setRemainingTime] = useState(defaultTime)

    useEffect(()=>{
        const timer = setInterval(()=>{
            setRemainingTime(updateRemainingTime(countdownTimestampMs))
        }, 500)
        return ()=>clearInterval(timer)
    })
    
    const updateRemainingTime =(countdownTimestampMs)=>{
        return getRemainingTimeUntilMsTimeStamp(countdownTimestampMs)
    }

    return (
        <main style={{width}} className='flashSales-wrapper'>
            <section className='flashSales-header'>
                <div className='left-of-flashSales'>
                    <h2>Flash sales</h2>
                    <div className='count-down-wrapper'>
                        <p>Time left at this prices</p>
                        <span className='count-down'>
                            <span className='hour'>{remainingTime.hours}</span>
                            <span className='time-colon'>:</span>
                            <span className='min'>{remainingTime.minutes}</span>
                            <span className='time-colon'>:</span>
                            <span className='sec'>{remainingTime.seconds}</span>
                        </span>
                    </div>
                </div>
                <Link to='/flashSales'>View more</Link>
            </section>
            <section className='flashSales-product-wrapper'>

                {dealData.map((item, index)=>{
                    const {img, price, discount, amount} = item
                    if(windowWidth <=962 && index>2){
                        return
                    }
                    return <article className={`flashSales-product ${index===0 && 'flashSalesFirstProduct'} ${index===dealData.length-1 && 'flashSalesLastProduct'}`}>
                        <img src={img[0]} alt="" />
                        
                        <span className='price'><p>NGN</p><CurrencyFormat className='price-format' value={Math.ceil(price*((100-discount)/100))} displayType={'text'} thousandSeparator={true}  /></span>
                        <p className='discount'>-{discount}%</p>
                        <p className='left'>{amount} left</p>
                    </article>
                })}
            </section>

        </main>
    )
}
export default FlashSales