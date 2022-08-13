import CloseIcon from '@mui/icons-material/Close';
import React,{useState, useEffect} from 'react'
import {useGlobalContext} from '../StateProvider'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './SidebarCategory.css'
import {useHistory} from 'react-router-dom'

const SidebarCategory = ({payload})=>{
    const history = useHistory()
    const {categories, setToggleSidebar} = useGlobalContext()
    const [hovering, setHovering] = useState(100)

    return <aside className={`${payload}Wrapper`}>
        <span id={`${payload}Close-id`} className={`${payload}Close`} onClick={setToggleSidebar}><CloseIcon className={`close-sidebar`}/></span>
        <section className={`sidebar-wrapper ${payload}`}>
            <article className='sidebar-header'>
                <h2>Browse products from categories</h2>
                <button type='button' onClick={()=> history.replace('/signin')} className='sidebar-signin'><span>Sign in</span><PersonOutlineIcon/></button>
            </article>
            <article className='sidebar-categories'>
                {categories.map((item, index)=>{
                    return (
                        <a
                            className={`sidebar-category sidebar-category${index} ${hovering===index? 'sidebar-category-onHover': ''}`}
                            onMouseOver={()=> setHovering(index)} 
                            onMouseOut={()=> setHovering(100)}
                            href={`/category/${index}`}
                        >
                            <span className='text'>{item.name}</span>
                            <span className='icon'>{item.icon}</span>
                        </a>
                    )})}
            </article>
        </section>
    </aside>
}
export default SidebarCategory