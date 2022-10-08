import React,{useState, useEffect} from 'react'
import './Header.css'
import {AiOutlineSearch} from 'react-icons/ai'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {Link, useNavigate} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import SidebarCategory from './SidebarCategory';
import {setToggleSidebar} from '../../features/header/headerSlice'
import {setWindowWidth} from '../../features/home/homeSlice'
import {getCurrentUser} from '../../features/header/headerSlice'
import {setSearch} from '../../features/search/searchSlice'
import {useSelector, useDispatch} from 'react-redux'
import {BsPerson} from 'react-icons/bs'
import {MdBookmarkBorder} from 'react-icons/md'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {FiHelpCircle, FiUserCheck} from 'react-icons/fi'


function Header() {
  const {accountComponentsMsg} = useSelector((store)=> store.home)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {windowWidth, categories, firstRowSectionWidth} = useSelector((store)=> store.home)
  const {toggleSidebar,} = useSelector((store)=> store.header)
  const {addItemsToCart} = useSelector((store)=> store.product)
  const {search} = useSelector((store)=> store.search)
  const [showUser, setShowUser] = useState(true)
  const [username, setUsername] = useState(accountComponentsMsg?.payload?.user?.name?.split(' ')[0])
  const {user, isLoading} = useSelector((store)=> store.header)
  const [accountOptions, setAccountOptions] = useState(false)
  const [signedInUserOption, setSignedInUserOption] = useState(0)
  const userSelectRef = React.useRef(null)
  const [searchStr, setSearchStr] = useState('')
  // this is to check the window screen size
  const changeWindowWidth = ()=>{
    dispatch(setWindowWidth())
  }
  
  useEffect(()=>{
    setUsername(user?.name?.split(' ')[0])
  }, [user])
  
  useEffect(()=>{
    dispatch(getCurrentUser())
  }, [])
  
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

  useEffect(()=>{
    setSignedInUserOption((windowWidth - userSelectRef.current.offsetLeft) - (userSelectRef.current.clientWidth+5) )
    console.log(userSelectRef)
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(setSearch(!search))
    navigate(`/search?q=${searchStr}`)
  }

  return <>
      <section className="headerOptions">
        <h2>Welcome to easyBuy</h2>
        <div className='headerOptions-sub'>
          <Link to='/' className='headerOptions-link headerOptions-link1'>Sell on easyBuy</Link>
          <hr />
          <span className='headerOptions-help'>Help <ArrowDropDownOutlinedIcon className="dropIcon"/></span>
          <hr />
          <div className="help-options">
            {/* <Link>Help Center</Link>
            <Link>Place & track order</Link>
            <Link>Order cancellation</Link>
            <Link>Returns and refund</Link> */}
          </div>
          <Link to='/' className='headerOptions-link headerOptions-link2'>Wish List</Link>
          <hr />
          <span className='headerOptions-account'>Account <ArrowDropDownOutlinedIcon className='dropIcon'/></span>
          <div className="account-options">
            <button type='button'>Sign In</button>
            {/* <Link>Place & track order</Link>
            <Link>Order cancellation</Link>
            
            <Link>Returns and refund</Link> */}
          </div>
        </div>
      </section>
      <section className='header-wrapper'>
        <section className={`${windowWidth<=962 || 'header-largeScreen'} header`}>
            <SidebarCategory payload={`${toggleSidebar?'toggleSidebar': ''}`} />
            <div className="left">
              {windowWidth<=1150 && <span onClick={()=> dispatch(setToggleSidebar())} className='categoriesIcon-wrapper'><MenuIcon className="categoriesIcon"/></span>}
              <Link to='/' className="header-logo">
                  <img 
                      src={"https://res.cloudinary.com/dswxrlrm6/image/upload/v1659947058/my-website-logos/easybuy_zzwzfc.jpg"}
                      alt=""
                  />
              </Link>
            </div>
            {windowWidth<=962 || <form onSubmit={handleSubmit} className="header-search" >
                <select className="header-searchOption">
                  <option>All Categories</option>
                  {
                    categories.map((item, index)=>{
                      const newItem = item.name.length<=16? item.name: `${item.name.substring(0,16)}...`
                      return <option >{newItem}</option>
                    })
                  }
                </select>
                <input placeholder='Search for products' onChange={(e)=> setSearchStr(e.target.value)} type="text" />
                <button type='submit' className='searchIcon'>
                  <AiOutlineSearch className='searchIcon'/>
                </button>
            </form>}
            <div className="header-rightLinks" id="header-rightLinks-id">
              <span className='account' onMouseOver={()=> {
                  setShowUser(true)
                  setAccountOptions(true)
                }} 
                onMouseOut={()=> {
                  setAccountOptions(false)
                  setShowUser(false)
                }}
              >
                <div className='user-select' ref={userSelectRef}>
                  <BsPerson className="person-icon"/>
                  <span  className='showUser'>Hello, {username || 'Sign In'}</span>
                </div>
                
                <div style={{right: `${signedInUserOption}px`}} id='signedInUser-options-id' onMouseOut={()=> setAccountOptions(false)} className={`signedInUser-options ${accountOptions || 'signedInUser-options-remove'}`}>
                  <Link to="/profile" style={{display: `${!username? 'flex': 'none'}`}} className='person'>
                    <BsPerson className='icon'/>
                    <p>Create account</p>
                  </Link >
                  <Link to="/profile" className='person' style={{display: `${!username? 'flex': 'none'}`}}>
                    <FiUserCheck className='icon'/>
                    <p>Sign in</p>
                  </Link >

                  {!username || 
                  <Link to="/profile" className=''>
                    <BsPerson className='icon'/>
                    <p>Account</p>
                  </Link >
                  }
                  {!username || 
                  <Link to="/profile" className='bookmark'>
                    <MdBookmarkBorder className='icon'/>
                    <p>Orders</p>
                  </Link >
                  }
                  {!username || 
                  <Link to="/profile" className='logout'>
                    <RiLogoutCircleLine className='icon'/>
                    <p>Log out</p>
                  </Link >
                  }

                  <Link to="/profile" className='person'>
                    <FiHelpCircle className='icon'/>
                    <p>Help center</p>
                  </Link >
                </div>
              </span>
              <Link to='/' className='cart'>
                <ShoppingCartOutlinedIcon className='cart-icon'/>
                <span className="cart-text"> <p>My</p> <p>Cart</p></span>
                <span className="cart-count">{addItemsToCart===undefined? 0: addItemsToCart }</span>
              </Link>
            </div>
          {(windowWidth >962) || <form onSubmit={handleSubmit} className="header-search-mobile" >
            <input placeholder='Search for a product' type="text" onChange={(e)=> setSearchStr(e.target.value)} />
            <button onClick={()=> setSearch(true)} className='searchIcon-wrapper' type='submit' >
              <AiOutlineSearch className='searchIcon'/>
            </button>
          </form>}
        </section>
      </section>
    </>
}

export default Header