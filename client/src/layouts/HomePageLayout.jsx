import React from 'react'
import { HomePage } from '../pages/HomePage'
import { NavBarHome } from '../components/NavBarHome'

export const HomePageLayout = () => {
  return (
    <>
        <NavBarHome />
        <HomePage />
    </>
  )
}
