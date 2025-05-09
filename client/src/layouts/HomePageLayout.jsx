import React from 'react'

//Componentes
import { HomePage } from '../pages/HomePage'
import { NavBarHome } from '../components/NavBarHome'
import { ChatBot } from '../components/ChatBot'
import { Footer } from "../components/Footer";

export const HomePageLayout = ({ children }) => {
  return (
    <>
        <NavBarHome />
        {children}
        <Footer />
        <ChatBot />
    </>
  )
}