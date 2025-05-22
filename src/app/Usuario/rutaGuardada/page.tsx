'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Actividad {
  id: string;
  tipo: 'servicio' | 'hotel' | 'alimento';
  estado?: 'reserva' | 'eliminar'; 
}

interface Guardado {
  id: string;
  status: 'reserva' | 'eliminar';
  fecha_guardado: string;
  actividades: Actividad[];
}

const GuardadosPage = () => {
  const [guardados, setGuardados] = useState<Guardado[]>([
    {
      id: 'ruta-001',
      status: 'reserva',
      fecha_guardado: '2025-05-10',
      actividades: [
        { id: 'act-001', tipo: 'hotel' },
        { id: 'act-002', tipo: 'servicio' },
        { id: 'act-003', tipo: 'alimento' },
      ],
    },
    {
      id: 'ruta-002',
      status: 'eliminar',
      fecha_guardado: '2025-05-14',
      actividades: [
        { id: 'act-004', tipo: 'servicio' },
        { id: 'act-005', tipo: 'alimento' },
      ],
    },
    {
      id: 'ruta-003',
      status: 'reserva',
      fecha_guardado: '2025-05-19',
      actividades: [
        { id: 'act-006', tipo: 'hotel' },
        { id: 'act-007', tipo: 'hotel' },
        { id: 'act-008', tipo: 'servicio' },
      ],
    },
  ]);

  const eliminarGuardado = (id: string) => {
    setGuardados(prev =>
      prev.map(g => (g.id === id ? { ...g, status: 'eliminar' } : g))
    );
  };

  const editarActividad = (rutaId: string, actId: string, estado: 'reserva' | 'eliminar') => {
    setGuardados(prev =>
      prev.map(g => {
        if (g.id !== rutaId) return g;
        return {
          ...g,
          actividades: g.actividades.map(a =>
            a.id === actId ? { ...a, estado } : a
          ),
        };
      })
    );
  };

  return (
    <main className="p-6 bg-background text-text min-h-screen">
      <h1 className='text-5xl font-bold text-text mb-8 ml-4'>Rutas Guardadas</h1>
      <Guardados guardados={guardados} onEliminar={eliminarGuardado} onEditarActividad={editarActividad} />
    </main>
  );
};

const Guardados: React.FC<{
  guardados: Guardado[];
  onEliminar: (id: string) => void;
  onEditarActividad: (rutaId: string, actId: string, estado: 'reserva' | 'eliminar') => void;
}> = ({ guardados, onEliminar, onEditarActividad }) => {
  const router = useRouter();
  const [modalRuta, setModalRuta] = useState<Guardado | null>(null);

  if (guardados.length === 0) {
    return <p className="text-text-secondary">No hay rutas guardadas.</p>;
  }

  return (
    <>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guardados.map((g) => (
          <div
            key={g.id}
            className="border border-detail rounded-xl p-5 bg-detail shadow hover:shadow-accent transition duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-primary">Ruta: {g.id}</h2>
              <span
                className={`text-sm font-medium ${
                  g.status === 'reserva'
                    ? 'text-secondary'
                    : 'text-danger line-through'
                }`}
              >
                {g.status === 'reserva' ? 'Activa' : 'Eliminada'}
              </span>
            </div>

            <p className="text-sm text-text-secondary mb-2">
              Guardado el {g.fecha_guardado}
            </p>

            <div className="text-sm mb-3">
              <p className="font-semibold text-accent mb-1">Actividades:</p>
              <ul className="list-disc pl-4 space-y-1">
                {g.actividades.map((a) => (
                  <li key={a.id}>
                    ID: {a.id} - <span className="capitalize">{a.tipo}</span>
                    {a.estado === 'eliminar' && <span className="text-danger ml-2">(Eliminada)</span>}
                    {a.estado === 'reserva' && <span className="text-secondary ml-2">(Reservada)</span>}
                  </li>
                ))}
              </ul>
            </div>

            {g.status === 'reserva' && (
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => router.push(`/mis-reservas?id=${g.id}`)}
                  className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primary-strong"
                >
                  Mandar a mis reservas
                </button>
                <button
                  onClick={() => onEliminar(g.id)}
                  className="px-3 py-1 text-sm rounded bg-danger text-white hover:bg-danger-hover"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setModalRuta(g)}
                  className="px-3 py-1 text-sm rounded bg-accent text-white hover:bg-accent-hover"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalRuta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-80">
          <div className="bg-detail p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-primary mb-4">Editar Ruta: {modalRuta.id}</h2>
            <ul className="space-y-4">
              {modalRuta.actividades.map((a) => (
                <li key={a.id} className="border border-detail p-3 rounded bg-background">
                  <p className="mb-2">
                    <span className="font-medium">ID:</span> {a.id} <br />
                    <span className="font-medium">Tipo:</span> {a.tipo}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditarActividad(modalRuta.id, a.id, 'reserva')}
                      className="px-3 py-1 text-sm rounded bg-secondary text-background hover:bg-secondary/80"
                    >
                      Reservar
                    </button>
                    <button
                      onClick={() => onEditarActividad(modalRuta.id, a.id, 'eliminar')}
                      className="px-3 py-1 text-sm rounded bg-danger text-white hover:bg-danger-hover"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <button
                onClick={() => setModalRuta(null)}
                className="px-4 py-2 text-sm rounded bg-detail hover:bg-detail-hover border border-text text-text"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuardadosPage;
