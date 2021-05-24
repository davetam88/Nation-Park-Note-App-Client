import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AboutContent from './AboutContent'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AboutContent />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})


