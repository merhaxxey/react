import { margin } from '@mui/system'
import React,{useState, useEffect} from 'react'
import {FaStarHalf} from 'react-icons/fa'
import {FaStar} from 'react-icons/fa'

const CreateRatingStars = ({productRating})=>{
    const value = (productRating - Math.floor(productRating)) > 0? true: false
    const [isFractionNumber, setIsFractionNumber] = useState(value)
    const [stars, setStars] = useState([])
    useEffect(()=>{
        let starsTemp = []
        for(let i=0; i<(Math.floor(productRating)-1); i++){
            starsTemp.push(true)
        }
        if(isFractionNumber){
            starsTemp.push(false)
        }
        setStars(starsTemp)
    }, [])

    return <span className='stars-wrapper'>{stars.map((item, index)=>{
        if(index===0){
            return <FaStar className='star first-star'/>
        }
        if(item){
            return <FaStar className='star'/>
        }
        return <FaStarHalf className='star last-star'/>
    })}</span>
}

export default CreateRatingStars