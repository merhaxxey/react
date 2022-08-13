import React, {useRef, useState, useEffect} from 'react'
import './subCategory.css'
import './MoreToLove.css'

import FirstRowSection from './FirstRowSection'
import FirstOrderDeal from './mobile/FirstOrderDeal';
import FlashSales from './FlashSales'
import MoreToLove from './MoreToLove'
import './Home.css'
import {useGlobalContext} from '../StateProvider'
//use reducer for category
function Home() {
  const {firstRowSectionWidth} = useGlobalContext()
    
    return <main id='Home'>
      <FirstRowSection />
      <FirstOrderDeal/>
      <FlashSales countdownTimestampMs={1653670957777 + (1000*60*60*24*3)} width={firstRowSectionWidth}/>
      <MoreToLove width={firstRowSectionWidth}/>
    </main>
  
    
}
export default Home