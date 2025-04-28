import React from 'react'
import Card from './card'

const DataCards = () => {
  return (
    <div id='Datos' className="scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Card 1</h2>
            <p className="text-gray-600 dark:text-gray-400">This is a description for card 1.</p>
            </div> */}

            <div>
                <Card href='/landing/card/card1.png' titulo='85+ Pueblos Mágicos' descripcion=' Descubre la increíble diversidad y encanto de cada rincón mágico de México.'/>
            </div>
            <div>
                <Card href='/landing/card/card2.png' titulo='500+ Rutas Personalizadas' descripcion='Inspírate en rutas únicas creados por nuestra IA o diseña el tuyo a tu medida.'/>
            </div>
            <div>
                <Card href='/landing/card/card3.png' titulo='5,000+ Actividades Auténticas' descripcion='Sumérgete en experiencias inolvidables, desde aventuras naturales hasta inmersiones culturales.'/>
            </div>
            <div>
                <Card href='/landing/card/card4.png' titulo='Comunidad de +10,000 Viajeros' descripcion='Conéctate con otros amantes de los Pueblos Mágicos, comparte tus experiencias y descubre nuevos destinos.'/>
            </div>
            <div>
                <Card href='/landing/card/card6.png' titulo='Experiencias Locales Únicas' descripcion='Vive la auténtica esencia de cada destino a través de actividades imperdibles.'/>
            </div>
            <div>
                <Card href='/landing/card/card5.png' titulo='Planifica en 3 Simples Pasos' descripcion='Crea tu ruta perfecta de forma rápida y sencilla, ¡listo para explorar!'/>
            </div>
        </div>
    </div>
  )
}

export default DataCards