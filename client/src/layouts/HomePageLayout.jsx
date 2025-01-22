import React from 'react'
import { HomePage } from '../pages/HomePage'
import { NavBarHome } from '../components/NavBarHome'
import { ChatBot } from '../components/ChatBot'

export const HomePageLayout = ({ children }) => {
  return (
    <>
        <NavBarHome />
        {children} 
        <ChatBot />
    </>
  )
}
