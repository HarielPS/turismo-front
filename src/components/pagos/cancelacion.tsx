'use client';
import React from 'react';

interface Reserva {
  id: number;
  id_actividad: string;
  necesita_pago: boolean;
  pago_hecho: boolean;
  status: number;
  fecha_reserva: string;
  fecha_cancelacion?: string | null;
  pago: {
    id: string;
    monto: number;
    metodo: string;
  } | null;
}

interface Props {
  reservasPorRuta: Record<string, Reserva[]>;
}

const Cancelacion: React.FC<Props> = ({ reservasPorRuta }) => {
  const actividadesCanceladas = Object.entries(reservasPorRuta).flatMap(([ruta, reservas]) =>
    reservas
      .filter(r => r.status === 2)
      .map(r => ({ ...r, ruta }))
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Actividades canceladas</h2>
      {actividadesCanceladas.length === 0 ? (
        <p className="text-text">No hay actividades canceladas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {actividadesCanceladas.map((actividad) => (
            <div key={actividad.id} className="border border-text-secondary p-4 rounded shadow-md shadow-text  bg-detail">
              <div className="font-semibold text-xl mb-5">Ruta: {actividad.ruta.replace('ruta', 'Ruta ')}</div>
              <div><span className='font-semibold'>Actividad :</span> {actividad.id_actividad}</div>
              <div><span className='font-semibold'>Fecha reserva: </span> {actividad.fecha_reserva}</div>
              <div>
                <span className='font-semibold'>Fecha cancelación: </span>{' '}
                {actividad.fecha_cancelacion}
              </div>
              <div><span className='font-semibold'>¿Pago hecho?: </span>{actividad.necesita_pago ? (actividad.pago_hecho ? 'Sí' : 'No') : '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cancelacion;
