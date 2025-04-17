import React from 'react'

type Props = {
  title: string
}

const PageTitle = ({ title }: Props) => {
  return (
    <h1 className="capitalize text-center text-4xl font-extrabold py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text shadow-md"> {title}</h1>
  )
}

export default PageTitle