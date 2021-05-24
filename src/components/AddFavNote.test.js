import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddFavNote from './AddFavNote'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AddFavNote />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})

