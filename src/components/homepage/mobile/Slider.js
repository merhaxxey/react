import React,{useState} from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {imgLinks} from '../../../productAdsImg'

export default () => {
    const [imgs, setImgs] = useState(imgLinks)
  return (
    <Splide
      options={ {
        rewind: true,
        gap   : '1rem',
      } }
      className="my-carousel"
      aria-label="My Favorite Images"
    >
        {imgs.map((item, index)=>{
            return <SplideSlide>
                <img  src={item} alt="ads" />
            </SplideSlide>
        })}

    </Splide>
  );
}
