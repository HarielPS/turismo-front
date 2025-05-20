"use client";
import React, { useState } from 'react';
import Cancelacion from '@/components/pagos/cancelacion'; 
import Reservas from '@/components/pagos/reservas'; 

const botones = [
  "Mis reservas",
  "Mis pagos",
  "Cancelaciones",
  "Tarjetas registradas"
];

// Define the Reserva interface if not imported
interface Reserva {
  id: number;
  id_actividad: string;
  necesita_pago: boolean;
  pago_hecho: boolean;
  status: number;
  fecha_reserva: string;
  fecha_cancelacion?: string | null;
  pago: { id: string; monto: number; metodo: string } | null;
}

const Pagos = () => {
  const [activo, setActivo] = useState(0);

  // Asegúrate de que la interfaz Reserva esté importada o definida en este archivo
  const [reservasPorRuta, setReservasPorRuta] = useState<Record<string, Reserva[]>>({
    ruta1: [
      {
        id: 1,
        id_actividad: 'hotel_123',
        necesita_pago: true,
        pago_hecho: true,
        status: 1,
        fecha_reserva: '2025-05-10',
        fecha_cancelacion: null,
        pago: { id: 'pago_1', monto: 500, metodo: 'tarjeta' }
      },
      {
        id: 2,
        id_actividad: 'actividad_456',
        necesita_pago: false,
        pago_hecho: false,
        status: 0,
        fecha_reserva: '2025-05-01',
        fecha_cancelacion: null,
        pago: null
      }
    ],
    ruta2: [
      {
        id: 3,
        id_actividad: 'alimento_789',
        necesita_pago: true,
        pago_hecho: false,
        status: 2,
        fecha_reserva: '2025-05-12',
        fecha_cancelacion: '2025-05-15',
        pago: null
      }
    ],
    ruta3: [
      {
        id: 4,
        id_actividad: 'hotel_999',
        necesita_pago: true,
        pago_hecho: true,
        status: 1,
        fecha_reserva: '2025-04-30',
        fecha_cancelacion: null,
        pago: { id: 'pago_9', monto: 750, metodo: 'efectivo' }
      },
      {
        id: 5,
        id_actividad: 'actividad_111',
        necesita_pago: false,
        pago_hecho: false,
        status: 0,
        fecha_reserva: '2025-05-08',
        fecha_cancelacion: null,
        pago: null
      }
    ],
    ruta4: [
      {
        id: 6,
        id_actividad: 'alimento_321',
        necesita_pago: true,
        pago_hecho: true,
        status: 1,
        fecha_reserva: '2025-05-14',
        fecha_cancelacion: null,
        pago: { id: 'pago_10', monto: 350, metodo: 'paypal' }
      },
      {
        id: 7,
        id_actividad: 'actividad_654',
        necesita_pago: false,
        pago_hecho: false,
        status: 2,
        fecha_reserva: '2025-05-05',
        fecha_cancelacion: '2025-05-10',
        pago: null
      }
    ]
  });

  const renderContenido = () => {
    switch (activo) {
      case 0:
        return <Reservas reservasPorRuta={reservasPorRuta} setReservasPorRuta={setReservasPorRuta} />;
      case 1:
        return <div>Contenido de Mis pagos</div>;
      case 2:
        return <Cancelacion reservasPorRuta={reservasPorRuta} />;
      case 3:
        return <div>Contenido de Tarjetas registradas</div>;
      default:
        return null;
    }
  };

 return (
  <div title='cabecera'>
    <h1 className='text-5xl font-bold text-text mb-10 ml-4'>Mis reservas y pagos</h1>
    <div className="menu">
      {botones.map((texto, i) => (
        <div
          key={i}
          className={`inline-block px-4 py-2.5 m-1 rounded-full cursor-pointer transition-colors duration-300 ${
            activo === i 
              ? "bg-primary text-white" 
              : "bg-detail text-text hover:bg-text-secondary"
          } font-medium`}
          onClick={() => setActivo(i)}
        >
          {texto}
        </div>
      ))}
    </div>
    <div className="contenido">
      {renderContenido()}
    </div>
  </div>
);
};

export default Pagos;