import ReactDom from 'react-dom'
import React from 'react'
import App from './App.js'
import {StateProvider} from './StateProvider'
import {initialState, reducer} from './reducer'
ReactDom.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App/>
        </StateProvider>
    </React.StrictMode>,

    document.getElementById('root')
)