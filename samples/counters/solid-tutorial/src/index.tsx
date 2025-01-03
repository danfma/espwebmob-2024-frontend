/* @refresh reload */
import {render} from 'solid-js/web'
import './index.css'
import App from './views/App.tsx'

const container = document.getElementById('root')!

render(() => <App/>, container)
