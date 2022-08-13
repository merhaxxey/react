import React,{useState, useEffect} from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {Link} from 'react-router-dom'
import {useGlobalContext} from '../StateProvider.js';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarCategory from './SidebarCategory';

function Header() {
  const {windowWidth, setWindowWidth, categories, toggleSidebar, setToggleSidebar, hideAside, setHideAside,} = useGlobalContext()
  const [showUser, setShowUser] = useState(true)

  // this is to check the window screen size
  const changeWindowWidth = ()=>{
    setWindowWidth()
  }  
  useEffect(()=>{
    window.addEventListener('resize', changeWindowWidth)
    
    return ()=> window.removeEventListener('resize', changeWindowWidth)
  })
  useEffect(()=>{
    if(windowWidth <= 368){
      setShowUser(false)
    }
    else{
      setShowUser(true)
    }
    console.log(showUser)
  }, [windowWidth])

  return <>
      <section className="headerOptions">
        <h2>Welcome to easyBuy</h2>
        <div className='headerOptions-sub'>
          <Link className='headerOptions-link headerOptions-link1'>Sell on easyBuy</Link>
          <hr />
          <span className='headerOptions-help'>Help <ArrowDropDownOutlinedIcon className="dropIcon"/></span>
          <hr />
          <div className="help-options">
            <Link>Help Center</Link>
            <Link>Place & track order</Link>
            <Link>Order cancellation</Link>
            <Link>Returns and refund</Link>
          </div>
          <Link className='headerOptions-link headerOptions-link2'>Wish List</Link>
          <hr />
          <span className='headerOptions-account'>Account <ArrowDropDownOutlinedIcon className='dropIcon'/></span>
          <div className="account-options">
            <button type='button'>Sign In</button>
            <Link>Place & track order</Link>
            <Link>Order cancellation</Link>
            <Link>Returns and refund</Link>
          </div>
        </div>
      </section>
      <section className='header'>
          <SidebarCategory payload={`${toggleSidebar?'toggleSidebar': ''}`} />
          <div className="left">
            <span onClick={setToggleSidebar} className='categoriesIcon-wrapper'><MenuIcon className="categoriesIcon"/></span>
            <div className="header-logo">
                <img 
                    src={"https://res.cloudinary.com/dswxrlrm6/image/upload/v1659947058/my-website-logos/easybuy_zzwzfc.jpg"}
                    alt=""
                />
            </div>

          </div>
          <div className="header-search" >
              <select className="header-searchOption">
                <option>All Categories</option>
                {
                  categories.map((item, index)=>{
                    const newItem = item.name.length<=16? item.name: `${item.name.substring(0,16)}...`
                    return <option >{newItem}</option>
                  })
                }
              </select>
              <input placeholder='Mac book Pro' type="text" />
              <SearchIcon className='searchIcon'/>
          </div>
          <div className="header-rightLinks">
            <Link to='/' className='account' onMouseOver={()=> setShowUser(true)} onMouseOut={()=> setShowUser(false)}>
              <PersonOutlinedIcon className="person-icon"/>
              <span className='showUser'>Hello, Sign In</span>
            </Link>
            <Link to='/' className='cart'>
              <ShoppingCartOutlinedIcon className='cart-icon'/>
              <span className="cart-text"> <p>My</p> <p>Cart</p></span>
              <span className="cart-count">0</span>
            </Link>
          </div>
      </section>
    </>
}

export default Header