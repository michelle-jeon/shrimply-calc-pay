import { useState } from 'react'
import * as S from './App.styles'
import './styles/global.css'
import Home from './pages/Home'
import { createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([]);

function App() {
  return (
    <S.AppContainer>
      <Home />
    </S.AppContainer>
  )
}

export default App
