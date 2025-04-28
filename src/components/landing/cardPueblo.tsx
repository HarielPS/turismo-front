import React from 'react'

interface CardPuebloProps {
    href?: string;
    titulo?: string;
    descripcion?: string;
}

const CardPueblo = ({href, titulo, descripcion}: CardPuebloProps) => {
  return (
    
    <div className="max-w-sm border border-detail rounded-lg bg-detail text-text shadow-text">

        <img className="rounded-t-lg" src={href} alt="Pueblo" />

        <div className="p-5">

            <h5 className="mb-2 text-2xl font-bold tracking-tight ">{titulo}</h5>
            <p className="mb-3 font-normal ">{descripcion}</p>
            {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
            </a> */}
        </div>
    </div>

  )
}

export default CardPueblo