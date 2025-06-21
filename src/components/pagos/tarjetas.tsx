"use client";
import React, { useState, useEffect } from 'react';
import FormularioTarjeta from './FormTarjeta';

// Componentes simples para reemplazar los iconos
// const IconoCreditCard = () => <span className="mr-2">💳</span>;
const IconoTrash = () => <span className="mr-2">🗑️</span>;
const IconoPlusCircle = () => <span className="mr-2">➕</span>;
const IconoCheck = () => <span className="mr-2">✓</span>;

// Interfaces
interface Tarjeta {
  id: string;
  tipo: 'visa' | 'mastercard' | 'amex' | 'otro';
  numeroTarjeta: string;
  nombreTarjeta: string;
  direccion: string;
  codigoPostal: string;
  fechaVencimiento: string;
  predeterminada: boolean;
}

interface TarjetaFormData {
  tipo: 'visa' | 'mastercard' | 'amex' | 'otro';
  numeroTarjeta: string;
  nombreTarjeta: string;
  direccion: string;
  codigoPostal: string;
  fechaVencimiento: string;
  cvv: string;
  predeterminada: boolean;
}

const TarjetasPage: React.FC = () => {
  // Estados
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarjetaGuardadaExito, setTarjetaGuardadaExito] = useState(false);

  // Cargar tarjetas al iniciar (simulado)
  useEffect(() => {
    // Datos de ejemplo
    const tarjetasEjemplo: Tarjeta[] = [
      {
        id: 'card_1234567',
        tipo: 'visa',
        numeroTarjeta: '**** **** **** 4242',
        nombreTarjeta: 'Juan Pérez',
        direccion: 'Calle Principal 123',
        codigoPostal: '28001',
        fechaVencimiento: '12/25',
        predeterminada: true
      },
      {
        id: 'card_7654321',
        tipo: 'mastercard',
        numeroTarjeta: '**** **** **** 5555',
        nombreTarjeta: 'María García',
        direccion: 'Avenida Central 456',
        codigoPostal: '08001',
        fechaVencimiento: '08/24',
        predeterminada: false
      }
    ];
    
    setTarjetas(tarjetasEjemplo);
  }, []);

  // Guardar tarjeta
  const guardarTarjeta = (nuevaTarjeta: TarjetaFormData) => {
    // En un caso real, aquí enviaríamos los datos a una API
    console.log('Tarjeta a guardar:', nuevaTarjeta);
    
    // Simulamos la respuesta exitosa de la API
    setTimeout(() => {
      // Si la nueva tarjeta es predeterminada, desmarcar las demás
      let tarjetasActualizadas = [...tarjetas];
      
      if (nuevaTarjeta.predeterminada) {
        tarjetasActualizadas = tarjetasActualizadas.map(t => ({
          ...t,
          predeterminada: false
        }));
      }
      
      // Añadir nueva tarjeta con un ID generado
      const id = 'card_' + Math.random().toString(36).substr(2, 9);
      
      // Ocultar número completo excepto últimos 4 dígitos
      const numeroLimpio = nuevaTarjeta.numeroTarjeta.replace(/\s+/g, '');
      const numeroEnmascarado = '**** **** **** ' + numeroLimpio.slice(-4);
      
      tarjetasActualizadas.push({
        id,
        tipo: nuevaTarjeta.tipo,
        numeroTarjeta: numeroEnmascarado,
        nombreTarjeta: nuevaTarjeta.nombreTarjeta,
        direccion: nuevaTarjeta.direccion,
        codigoPostal: nuevaTarjeta.codigoPostal,
        fechaVencimiento: nuevaTarjeta.fechaVencimiento,
        predeterminada: nuevaTarjeta.predeterminada
      });
      
      setTarjetas(tarjetasActualizadas);
      setMostrarFormulario(false);
      setTarjetaGuardadaExito(true);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setTarjetaGuardadaExito(false);
      }, 3000);
    }, 1000);
  };

  // Eliminar tarjeta
  const eliminarTarjeta = (id: string) => {
    // En un caso real, aquí enviaríamos una petición a la API
    console.log('Eliminando tarjeta:', id);
    
    // Actualizar estado local
    setTarjetas(tarjetas.filter(t => t.id !== id));
  };

  // Establecer tarjeta predeterminada
  const establecerPredeterminada = (id: string) => {
    // En un caso real, aquí enviaríamos una petición a la API
    console.log('Estableciendo tarjeta predeterminada:', id);
    
    // Actualizar estado local
    setTarjetas(tarjetas.map(t => ({
      ...t,
      predeterminada: t.id === id
    })));
  };

  // Obtener el ícono según el tipo de tarjeta
  const obtenerIconoTarjeta = (tipo: string) => {
    switch (tipo) {
      case 'visa': return '💳 Visa';
      case 'mastercard': return '💳 Mastercard';
      case 'amex': return '💳 American Express';
      default: return '💳 Tarjeta';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-text">Mis Tarjetas</h1>
      
      {/* Mensaje de éxito */}
      {tarjetaGuardadaExito && (
        <div className="bg-secondary border border-secondary text-text px-4 py-3 rounded relative mb-4" role="alert">
          <span className="flex items-center">
            <IconoCheck /> Tarjeta guardada con éxito
          </span>
        </div>
      )}
      
      <div className="bg-background rounded-lg shadow-text p-6">
        <h2 className="text-xl font-semibold mb-4 text-text">Tarjetas guardadas</h2>
        
        {tarjetas.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-text-secondary mb-4">No tienes tarjetas guardadas</p>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="px-4 py-2 bg-primary text-background rounded-md hover:bg-primary-strong"
            >
              <IconoPlusCircle /> Añadir tarjeta
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {tarjetas.map(tarjeta => (
                <div key={tarjeta.id} className="border border-detail rounded-lg p-4 hover:shadow-text transition-all duration-200">
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-medium flex items-center text-text">
                      {obtenerIconoTarjeta(tarjeta.tipo)}
                    </span>
                    {tarjeta.predeterminada && (
                      <span className="ml-3 text-xs bg-accent text-text px-2 py-1 rounded">
                        Predeterminada
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-text-secondary mb-3">
                    <p><span className="font-medium">{tarjeta.numeroTarjeta}</span></p>
                    <p>{tarjeta.nombreTarjeta}</p>
                    <p>Exp: {tarjeta.fechaVencimiento}</p>
                  </div>
                  
                  <div className="flex items-center mt-3 xs:flex-col xs:items-start">
                    {!tarjeta.predeterminada && (
                      <button 
                        onClick={() => establecerPredeterminada(tarjeta.id)}
                        className="text-sm text-primary hover:text-primary-strong hover:underline"
                      >
                        Establecer como predeterminada
                      </button>
                    )}
                    
                    <button 
                      onClick={() => eliminarTarjeta(tarjeta.id)}
                      className="text-sm text-danger hover:text-danger-hover hover:underline flex items-center ml-auto xs:ml-0 xs:mt-2"
                    >
                      <IconoTrash /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setMostrarFormulario(true)}
              className="flex items-center text-primary hover:text-primary-strong hover:underline"
            >
              <IconoPlusCircle /> Añadir otra tarjeta
            </button>
          </>
        )}
      </div>
      
      {/* Modal para añadir tarjeta */}
      {mostrarFormulario && (
        <FormularioTarjeta 
          onSubmit={guardarTarjeta}
          onCancel={() => setMostrarFormulario(false)}
        />
      )}
      
      {/* Información sobre seguridad */}
      <div className="mt-8 bg-detail p-5 rounded-lg">
        <h3 className="font-bold mb-2 text-text"><IconoCheck /> Información segura</h3>
        <p className="text-sm text-text-secondary">
          Tu información de pago se almacena de forma segura y cifrada. Nunca compartimos tus datos de tarjeta con terceros.
        </p>
      </div>
    </div>
  );
};

export default TarjetasPage;
