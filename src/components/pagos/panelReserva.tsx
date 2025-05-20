'use client';
import React, { useState } from 'react';
import Reservas from '@/components/pagos/reservas';
import Cancelacion from '@/components/pagos/cancelacion';

const PanelReservas = () => {
  const [reservasPorRuta, setReservasPorRuta] = useState({
    ruta1: [
      {
        id: 1,
        id_actividad: 'hotel_123',
        necesita_pago: true,
        pago_hecho: true,
        status: 1,
        fecha_reserva: '2025-05-10',
        pago: { id: 'pago_1', monto: 500, metodo: 'tarjeta' }
      },
      {
        id: 2,
        id_actividad: 'actividad_456',
        necesita_pago: false,
        pago_hecho: false,
        status: 0,
        fecha_reserva: '2025-05-01',
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
        pago: { id: 'pago_9', monto: 750, metodo: 'efectivo' }
      },
      {
        id: 5,
        id_actividad: 'actividad_111',
        necesita_pago: false,
        pago_hecho: false,
        status: 0,
        fecha_reserva: '2025-05-08',
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
        pago: { id: 'pago_10', monto: 350, metodo: 'paypal' }
      },
      {
        id: 7,
        id_actividad: 'actividad_654',
        necesita_pago: false,
        pago_hecho: false,
        status: 2,
        fecha_reserva: '2025-05-05',
        pago: null
      }
    ]
  });

  return (
    <div>
      <Reservas reservasPorRuta={reservasPorRuta} setReservasPorRuta={setReservasPorRuta} />
      <Cancelacion reservasPorRuta={reservasPorRuta} />
    </div>
  );
};

export default PanelReservas;
