'use client';
import React, { useState } from 'react';

interface Reserva {
  id: number;
  id_actividad: string;
  necesita_pago: boolean;
  pago_hecho: boolean;
  status: number;
  fecha_reserva: string;
  pago: {
    id: string;
    monto: number;
    metodo: string;
  } | null;
}

interface Props {
  reservasPorRuta: Record<string, Reserva[]>;
  setReservasPorRuta: React.Dispatch<React.SetStateAction<Record<string, Reserva[]>>>;
}

const Reservas: React.FC<Props> = ({ reservasPorRuta, setReservasPorRuta }) => {
  const [seleccionadas, setSeleccionadas] = useState<{ [ruta: string]: number | null }>({
    ruta1: null,
    ruta2: null,
    ruta3: null,
    ruta4: null
  });

  const toggleReserva = (ruta: string, id: number) => {
    setSeleccionadas(prev => ({
      ...prev,
      [ruta]: prev[ruta] === id ? null : id
    }));
  };

  const cancelarActividad = (ruta: string, id: number) => {
    setReservasPorRuta(prev => ({
      ...prev,
      [ruta]: prev[ruta].map(r => r.id === id ? { ...r, status: 2 } : r)
    }));
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return { texto: 'Vencida', color: 'text-red-600' };
      case 1:
        return { texto: 'En progreso', color: 'text-green-600' };
      case 2:
        return { texto: 'Cancelada', color: 'text-yellow-600' };
      default:
        return { texto: 'Desconocido', color: 'text-gray-600' };
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas por Ruta</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(reservasPorRuta).map(([ruta, reservas]) => (
          <div key={ruta} className="border border-text-secondary p-4 rounded-2xl shadow-md shadow-text bg-detail">
            <h2 className="text-xl font-bold mb-4 capitalize">{ruta.replace("ruta", "Ruta ")}</h2>
            {reservas.map((reserva) => {
              const statusInfo = getStatusInfo(reserva.status);
              const estaSeleccionada = seleccionadas[ruta] === reserva.id;

              return (
                <div
                  key={reserva.id}
                  className="w-full border border-text-secondary rounded-lg shadow-sm mb-3 p-3 cursor-pointer hover:bg-detail-hover transition"
                  onClick={() => !reserva.necesita_pago && toggleReserva(ruta, reserva.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-base">
                      Actividad: {reserva.id_actividad}
                    </span>
                    <span className={`text-sm font-semibold ${statusInfo.color}`}>
                      {statusInfo.texto}
                    </span>
                  </div>

                  <div className="text-sm text-text mt-1">
                    Fecha de reserva: {reserva.fecha_reserva}
                  </div>

                  {(reserva.necesita_pago || estaSeleccionada) && (
                    <div className="mt-2 text-sm text-text space-y-1">
                      <div>¿Necesita pago?: {reserva.necesita_pago ? 'Sí' : 'No'}</div>
                      <div>¿Pago hecho?: {reserva.necesita_pago ? (reserva.pago_hecho ? 'Sí' : 'No') : '-'}</div>
                      <div>
                        Pago: {reserva.pago
                          ? `ID: ${reserva.pago.id}, Monto: ${reserva.pago.monto}, Método: ${reserva.pago.metodo}`
                          : reserva.necesita_pago ? 'Pendiente' : '-'}
                      </div>
                    </div>
                  )}

                  {reserva.status === 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirmar = window.confirm(`¿Estás seguro de que deseas cancelar la actividad "${reserva.id_actividad}"?`);
                        if (confirmar) cancelarActividad(ruta, reserva.id);
                      }}
                      className="cursor-pointer mt-3 px-3 py-1 text-sm bg-accent text-white rounded hover:bg-accent-hover" // hover:bg-yellow-600
                    >
                      Cancelar reserva
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservas;
