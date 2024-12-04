import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { store } from './services/store.js'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <App />
        </Router>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
)
