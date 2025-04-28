import React from 'react'

interface CardProps {
    href?: string;
    titulo?: string;
    descripcion?: string;
}

// 600 X 357

const Card = ({href, titulo, descripcion}: CardProps) => {
  return (
    <div className='bg-detail h-40 p-4 rounded-lg flex items-center'>
        <div className='flex w-1/3 flex-col justify-center items-center'>
            <img src={href} alt="Card"/>
        </div>
        <div className='ml-5 w-2/3'>
            <h2 className='text-xl  lg:text-sm xl:text-xl font-semibold text-text mb-3'>{titulo}</h2>
            <p className='text-text text-sm'>{descripcion}</p>
        </div>
    </div>
  )
}

export default Card