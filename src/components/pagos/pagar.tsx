"use client";
import React, { useEffect, useState } from 'react';

interface Pago {
  id: string;
  monto: number;
  actividad: string;
  ruta: string;
  tarjeta: string | null;
  fechaPago: string;
}

interface Devolucion {
  id: string;
  id_reserva: number;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'procesada' | 'rechazada';
  metodo: string;
  ruta: string;
  actividad: string;
}

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

const Pagar: React.FC<Props> = ({ reservasPorRuta }) => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [devoluciones, setDevoluciones] = useState<Devolucion[]>([]);
  const [activeTab, setActiveTab] = useState<'pagos' | 'devoluciones'>('pagos');
  
  useEffect(() => {
    // Extraer los pagos de todas las reservas
    const pagosList: Pago[] = [];
    
    Object.entries(reservasPorRuta).forEach(([ruta, reservas]) => {
      reservas.forEach(reserva => {
        if (reserva.pago_hecho && reserva.pago) {
          pagosList.push({
            id: reserva.pago.id,
            monto: reserva.pago.monto,
            actividad: reserva.id_actividad,
            ruta: ruta,
            tarjeta: reserva.pago.metodo === 'tarjeta' ? 'XXXX-XXXX-XXXX-4321' : null,
            fechaPago: new Date(new Date(reserva.fecha_reserva).getTime() + Math.random() * 86400000).toISOString().split('T')[0]
          });
        }
      });
    });
    
    setPagos(pagosList);
    
    // Generar devoluciones para actividades canceladas que tenían pago
    const actividadesCanceladas = Object.entries(reservasPorRuta).flatMap(([ruta, reservas]) =>
      reservas
        .filter(r => r.status === 2)
        .map(r => ({ ...r, ruta }))
    );
    
    const nuevasDevoluciones: Devolucion[] = actividadesCanceladas
      .filter(actividad => actividad.pago_hecho && actividad.pago)
      .map(actividad => {
        // Calcular una fecha de devolución (1-3 días después de la cancelación)
        const fechaCancelacion = actividad.fecha_cancelacion || actividad.fecha_reserva;
        const fechaBase = new Date(fechaCancelacion);
        const diasAleatorios = Math.floor(Math.random() * 3) + 1; // 1-3 días
        fechaBase.setDate(fechaBase.getDate() + diasAleatorios);
        
        // Determinar estado basado en la fecha (para simular diferentes estados)
        const hoy = new Date();
        let estado: 'pendiente' | 'procesada' | 'rechazada';
        
        if (fechaBase > hoy) {
          estado = 'pendiente';
        } else if (Math.random() > 0.1) { // 90% de probabilidad de ser procesada
          estado = 'procesada';
        } else {
          estado = 'rechazada';
        }
        
        const montoDevolucion = actividad.pago!.monto;
        
        return {
          id: `dev_${actividad.id}_${Date.now().toString().slice(-4)}`,
          id_reserva: actividad.id,
          monto: montoDevolucion,
          fecha: fechaBase.toISOString().split('T')[0],
          estado: estado,
          metodo: actividad.pago!.metodo,
          ruta: actividad.ruta,
          actividad: actividad.id_actividad
        };
      });
      
    setDevoluciones(nuevasDevoluciones);
  }, [reservasPorRuta]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'procesada':
        return 'text-secondary bg-secondary bg-opacity-20';
      case 'pendiente':
        return 'text-accent bg-accent bg-opacity-20';
      case 'rechazada':
        return 'text-danger bg-danger bg-opacity-20';
      default:
        return 'text-text-secondary bg-detail';
    }
  };

  return (
    <div className="pagos-container p-6">
      <h1 className="text-2xl font-bold mb-4 text-text">Mis Pagos y Devoluciones</h1>
      
      {/* Tabs para cambiar entre pagos y devoluciones */}
      <div className="flex space-x-2 mb-6 xs:flex-col xs:space-x-0 xs:space-y-2">
        <button 
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
            activeTab === 'pagos' 
              ? 'bg-primary text-background' 
              : 'bg-detail text-text hover:bg-detail-hover'
          }`}
          onClick={() => setActiveTab('pagos')}
        >
          Pagos
        </button>
        <button 
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-200 ${
            activeTab === 'devoluciones' 
              ? 'bg-primary text-background' 
              : 'bg-detail text-text hover:bg-detail-hover'
          }`}
          onClick={() => setActiveTab('devoluciones')}
        >
          Devoluciones
        </button>
      </div>
      
      {activeTab === 'pagos' ? (
        /* Contenido de Pagos */
        <>
          {pagos.length === 0 ? (
            <div className="text-center p-8 bg-detail rounded-xl shadow-text">
              <p className="text-lg text-text">No tienes pagos registrados</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-background rounded-xl shadow-text">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">ID Pago</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Actividad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Ruta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Tarjeta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Fecha de Pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-detail">
                  {pagos.map((pago) => (
                    <tr key={pago.id} className="hover:bg-detail-hover transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">{pago.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">${pago.monto.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{pago.actividad}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-text">{pago.ruta.replace("ruta", "Ruta ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                        {pago.tarjeta ? pago.tarjeta : <span className="text-text-secondary italic">Otro método</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{pago.fechaPago}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-8 bg-detail p-4 rounded-lg shadow-text">
            <h2 className="text-lg font-bold mb-2 text-text">Resumen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:grid-cols-1">
              <div className="bg-background p-3 rounded shadow-text">
                <p className="text-sm text-text-secondary">Total pagado</p>
                <p className="text-xl font-bold text-text">${pagos.reduce((sum, pago) => sum + pago.monto, 0).toFixed(2)}</p>
              </div>
              <div className="bg-background p-3 rounded shadow-text">
                <p className="text-sm text-text-secondary">Cantidad de pagos</p>
                <p className="text-xl font-bold text-text">{pagos.length}</p>
              </div>
              <div className="bg-background p-3 rounded shadow-text">
                <p className="text-sm text-text-secondary">Último pago</p>
                <p className="text-xl font-bold text-text">
                  {pagos.length > 0 
                    ? new Date(Math.max(...pagos.map(p => new Date(p.fechaPago).getTime()))).toLocaleDateString() 
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Contenido de Devoluciones */
        <>
          {devoluciones.length === 0 ? (
            <div className="text-center p-8 bg-detail rounded-xl shadow-text">
              <p className="text-lg text-text">No tienes devoluciones registradas</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-background rounded-xl shadow-text">
                  <thead className="bg-primary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">ID Devolución</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Monto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Actividad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Ruta</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Método</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Fecha estimada</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-background">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-detail">
                    {devoluciones.map((devolucion) => (
                      <tr key={devolucion.id} className="hover:bg-detail-hover transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">{devolucion.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">${devolucion.monto.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{devolucion.actividad}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-text">{devolucion.ruta.replace("ruta", "Ruta ")}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-text">{devolucion.metodo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{devolucion.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(devolucion.estado)}`}>
                            {devolucion.estado.charAt(0).toUpperCase() + devolucion.estado.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 bg-detail p-4 rounded-lg shadow-text">
                <h2 className="text-lg font-bold mb-2 text-text">Resumen de Devoluciones</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:grid-cols-1">
                  <div className="bg-background p-3 rounded shadow-text">
                    <p className="text-sm text-text-secondary">Total a devolver</p>
                    <p className="text-xl font-bold text-text">${devoluciones.reduce((sum, dev) => sum + dev.monto, 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-background p-3 rounded shadow-text">
                    <p className="text-sm text-text-secondary">Devoluciones procesadas</p>
                    <p className="text-xl font-bold text-secondary">
                      {devoluciones.filter(dev => dev.estado === 'procesada').length}
                    </p>
                  </div>
                  <div className="bg-background p-3 rounded shadow-text">
                    <p className="text-sm text-text-secondary">Devoluciones pendientes</p>
                    <p className="text-xl font-bold text-accent">
                      {devoluciones.filter(dev => dev.estado === 'pendiente').length}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Pagar;
