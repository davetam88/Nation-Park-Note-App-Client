import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import FavControlForm from './FavControlForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <FavControlForm />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})

