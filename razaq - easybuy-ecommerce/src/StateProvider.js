import React,{ useReducer, createContext, useContext} from 'react'

const AppContext = createContext()

export const StateProvider = ({initialState, reducer, children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const setSubCategoryIndex = (value)=>{
        dispatch({type: 'subCategoryIndex', value})
    }
    const setOpenSubCategory = (value)=>{
        dispatch({type: 'openSubCategory', value})
    }
    const setToggleSidebar = ()=>{
        dispatch({type: 'setToggleSidebar'})
    }
    const setWindowWidth = ()=>{
        dispatch({type: 'setWindowWidth'})
    }
    const setFirstRowSectionWidth = (value)=>{
        dispatch({type: 'setFirstRowSectionWidth', value})
    }
    return <AppContext.Provider value={{
        ...state,
        setToggleSidebar,
        setSubCategoryIndex,
        setOpenSubCategory,
        setWindowWidth,
        setFirstRowSectionWidth
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}