import {categories} from './categories'

export const initialState={
    categories,
    subCategoryIndex: 0,
    openSubCategory: false,
    toggleSidebar: false,
    windowWidth: window.innerWidth,
    firstRowSectionWidth: 0
}

export const reducer = (state, action)=>{
    if(action.type==='subCategoryIndex'){
        return {...state, subCategoryIndex:action.value}
    }
    if(action.type==='openSubCategory'){
        return {...state, openSubCategory:action.value}
    }
    if(action.type==='setToggleSidebar'){
        return {...state, toggleSidebar:!state.toggleSidebar}
    }
    if(action.type==='setWindowWidth'){
        return {...state, windowWidth: window.innerWidth}
    }
    if(action.type==='setFirstRowSectionWidth'){
        return {...state, firstRowSectionWidth:action.value}
    }
    return state
}