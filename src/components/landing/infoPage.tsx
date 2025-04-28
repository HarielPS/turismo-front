import React from 'react'

const InfoPage = () => {
  return (
    <div id='Infopage' className='mt-20 mb-20 scroll-mt-24'>

        {/* primera imagen */}
        <div className='flex flex-col lg:flex-row items-center'>
            <div className='hidden lg:flex items-center lg:w-1/2 px-8 '>
                <img src="/landing/infopage/iglesia.jpg" alt="Iglesia" className='rounded-lg' />
            </div>

            <div className='w-full lg:w-1/2'>
                <h1 className='mb-5 font-bold text-3xl'>Aventuras en Paisajes de Ensueño</h1>
                <p className='text-justify'>
                    Embárcate en emocionantes aventuras en los paisajes naturales que rodean a los encantadores Pueblos Mágicos. Desde imponentes sierras y profundos cañones hasta valles cubiertos por un etéreo mar de nubes, la geografía de estos destinos te invita a explorar y a conectar con la grandeza de la naturaleza. Descubre senderos escondidos, cascadas cristalinas y miradores con vistas panorámicas que te dejarán sin aliento.
                </p>
                <p className='mt-3 text-justify'>
                    Siente la libertad de respirar aire puro y de maravillarte con la diversidad de ecosistemas que albergan estas regiones. Ya sea practicando senderismo, explorando grutas misteriosas o simplemente contemplando la inmensidad del paisaje, la naturaleza mágica de los Pueblos Mágicos te ofrece experiencias inolvidables y un escape del bullicio cotidiano.
                </p>
            </div>

            <div className='lg:hidden flex items-center justify-center w-full mt-20'>
                <img src="/landing/infopage/iglesia.jpg" alt="Iglesia" className='rounded-lg md:h-90' />
            </div>

        </div>

        {/* segunda imagen */}
        <div className='flex flex-col lg:flex-row items-center mt-20'>

            <div className='w-full lg:w-1/2'>
                <h1 className='mb-5 font-bold text-3xl'>Conecta con la Naturaleza Mágica</h1>
                <p className='text-justify'>
                    Descubre la profunda conexión que existe entre los Pueblos Mágicos y los impresionantes entornos naturales que los rodean. Sumérgete en la serenidad de sus bosques, la majestuosidad de sus montañas y la belleza de sus lagos y ríos. Estos escenarios te invitan a la introspección y a disfrutar de la tranquilidad que solo la naturaleza puede ofrecer.
                </p>
                <p className='mt-3 text-justify'>
                    Explora la diversidad de flora y fauna que habita en estas regiones, y déjate maravillar por la armonía entre la cultura local y el medio ambiente. Ya sea a través de actividades al aire libre o simplemente contemplando el paisaje, la naturaleza mágica de los Pueblos Mágicos te renovará el espíritu y te dejará recuerdos imborrables.  
                </p>
            </div>

            <div className='flex items-center lg:w-1/2 px-8 lg:mt-0 mt-20 justify-end'>
                <img src="/landing/infopage/paisaje.jpeg" alt="Iglesia" className='rounded-lg md:h-100' />
            </div>

        </div>

    </div>
  )
}

export default InfoPage