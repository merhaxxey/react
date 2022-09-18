import React, {useRef, useState, useEffect} from 'react'
import './subCategory.css'
import './MoreToLove.css'
import Slider from './mobile/Slider'
import FirstRowSection from './FirstRowSection'
import FirstOrderDeal from './mobile/FirstOrderDeal';
import FlashSales from './FlashSales'
import MoreToLove from './MoreToLove'
import VisualCategory from './mobile/VisualCategory'
import './Home.css'
import {useSelector} from 'react-redux'
import { setFirstRowSectionWidth } from '../../features/home/homeSlice'
import './mobile/VisualCategory.css'
//use reducer for category
function Home() {
  const {products, firstRowSectionWidth} = useSelector((store)=> store.home)

  useEffect(()=>{
    console.log('products')
  })

  return <main id='Home'>
      {/* <Slider/>  */}
      <FirstRowSection />
      <FirstOrderDeal/>
      <FlashSales countdownTimestampMs={1653670957777 + (1000*60*60*24*3)} width={firstRowSectionWidth}/>
      <MoreToLove width={firstRowSectionWidth}/>
    </main>
    
}
export default Home