import React from 'react'
import CardPueblo from './cardPueblo'

const Pueblos = () => {
  return (
    <div id='Pueblos' className='mt-0 lg:mt-40 justify-center scroll-mt-24'>
        <div>
            <h1 className='font-bold text-3xl mb-4'>Pueblos Magicos en México</h1>
            <p>A continuacion puedes ver algunos de los pueblos magicos en nuestro sitio</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl">

            <CardPueblo href='/landing/pueblos/San_Miguel_Allende.jpg' titulo='San Miguel de Allende, Guanajuato' descripcion='Conocido por su impresionante arquitectura colonial, ambiente artístico y vibrante vida cultural. Sus calles empedradas y la icónica Parroquia de San Miguel Arcángel te encantarán.'/>
            <CardPueblo href='/landing/pueblos/San_Miguel_Allende.jpg' titulo='San Miguel de Allende, Guanajuato' descripcion='Conocido por su impresionante arquitectura colonial, ambiente artístico y vibrante vida cultural. Sus calles empedradas y la icónica Parroquia de San Miguel Arcángel te encantarán.'/>
            <CardPueblo href='/landing/pueblos/San_Miguel_Allende.jpg' titulo='San Miguel de Allende, Guanajuato' descripcion='Conocido por su impresionante arquitectura colonial, ambiente artístico y vibrante vida cultural. Sus calles empedradas y la icónica Parroquia de San Miguel Arcángel te encantarán.'/>
            <CardPueblo href='/landing/pueblos/San_Miguel_Allende.jpg' titulo='San Miguel de Allende, Guanajuato' descripcion='Conocido por su impresionante arquitectura colonial, ambiente artístico y vibrante vida cultural. Sus calles empedradas y la icónica Parroquia de San Miguel Arcángel te encantarán.'/>
            <CardPueblo href='/landing/pueblos/San_Miguel_Allende.jpg' titulo='San Miguel de Allende, Guanajuato' descripcion='Conocido por su impresionante arquitectura colonial, ambiente artístico y vibrante vida cultural. Sus calles empedradas y la icónica Parroquia de San Miguel Arcángel te encantarán.'/>
            <CardPueblo href='/landing/pueblos/San_Miguel_Allende.jpg' titulo='San Miguel de Allende, Guanajuato' descripcion='Conocido por su impresionante arquitectura colonial, ambiente artístico y vibrante vida cultural. Sus calles empedradas y la icónica Parroquia de San Miguel Arcángel te encantarán.'/>
        </div>

    </div>
  )
}

export default Pueblos