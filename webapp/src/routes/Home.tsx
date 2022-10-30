import React, { FC } from 'react'
import { AuthButton } from '../components/AuthButton'
import { Navbar } from '../components/Navbar'

export interface HomeProps {
  
}

export const Home: FC<HomeProps> = (props) => {
  return (
    <div>
      <Navbar />
      <AuthButton />
    </div>
  )
}
