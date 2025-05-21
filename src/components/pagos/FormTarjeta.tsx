import React, { useState } from 'react';

// Interfaces
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

// Props del componente
interface FormularioTarjetaProps {
  onSubmit: (datos: TarjetaFormData) => void;
  onCancel: () => void;
}

const FormularioTarjeta: React.FC<FormularioTarjetaProps> = ({ onSubmit, onCancel }) => {
  const [nuevaTarjeta, setNuevaTarjeta] = useState<TarjetaFormData>({
    tipo: 'visa',
    numeroTarjeta: '',
    nombreTarjeta: '',
    direccion: '',
    codigoPostal: '',
    fechaVencimiento: '',
    cvv: '',
    predeterminada: false
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Función para detectar el tipo de tarjeta basado en el número
  const detectarTipoTarjeta = (numero: string): 'visa' | 'mastercard' | 'amex' | 'otro' => {
    const limpio = numero.replace(/\s+/g, '');
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(limpio)) return 'visa';
    if (/^5[1-5][0-9]{14}$/.test(limpio)) return 'mastercard';
    if (/^3[47][0-9]{13}$/.test(limpio)) return 'amex';
    return 'otro';
  };

  // Función para formatear el número de tarjeta según se escribe
  const formatearNumeroTarjeta = (numero: string): string => {
    const limpio = numero.replace(/\s+/g, '');
    const grupos = [];
    
    // AMEX tiene formato 4-6-5, otros tienen 4-4-4-4
    if (detectarTipoTarjeta(limpio) === 'amex') {
      for (let i = 0; i < limpio.length; i += 
      i === 0 ? 4 : i === 4 ? 6 : 5) {
        grupos.push(limpio.substring(i, i + 
        (i === 0 ? 4 : i === 4 ? 6 : 5)));
      }
    } else {
      for (let i = 0; i < limpio.length; i += 4) {
        grupos.push(limpio.substring(i, i + 4));
      }
    }
    
    return grupos.join(' ');
  };

  // Manejador para el cambio en los inputs del formulario
  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Manejar caso especial para checkbox
    if (type === 'checkbox') {
      setNuevaTarjeta(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
      return;
    }
    
    let valorProcesado = value;

    // Formatear según el campo
    if (name === 'numeroTarjeta') {
      // Permitir sólo números
      valorProcesado = value.replace(/[^\d]/g, '');
      // Limitar longitud según tipo de tarjeta (amex:15, otros:16)
      const tipo = detectarTipoTarjeta(valorProcesado);
      const maxLength = tipo === 'amex' ? 15 : 16;
      valorProcesado = valorProcesado.slice(0, maxLength);
      // Formatear con espacios
      valorProcesado = formatearNumeroTarjeta(valorProcesado);
    } 
    else if (name === 'fechaVencimiento') {
      // Formato MM/YY
      valorProcesado = value.replace(/[^\d]/g, '');
      if (valorProcesado.length > 0) {
        valorProcesado = valorProcesado.slice(0, 4);
        if (valorProcesado.length > 2) {
          valorProcesado = valorProcesado.slice(0, 2) + '/' + valorProcesado.slice(2);
        }
      }
    }
    else if (name === 'cvv') {
      // Solo permitir números y limitar longitud según tipo de tarjeta
      valorProcesado = value.replace(/[^\d]/g, '');
      const maxLength = nuevaTarjeta.tipo === 'amex' ? 4 : 3;
      valorProcesado = valorProcesado.slice(0, maxLength);
    }
    else if (name === 'codigoPostal') {
      // Limitar a 5 dígitos para código postal
      valorProcesado = value.replace(/[^\d]/g, '');
      valorProcesado = valorProcesado.slice(0, 5);
    }
    
    setNuevaTarjeta(prev => ({
      ...prev,
      [name]: valorProcesado,
      // Actualizar tipo de tarjeta automáticamente si cambia el número
      ...(name === 'numeroTarjeta' ? { tipo: detectarTipoTarjeta(valorProcesado) } : {})
    }));
    
    // Limpiar error del campo que se está editando
    if (errores[name]) {
      setErrores(prev => {
        const nuevoErrores = { ...prev };
        delete nuevoErrores[name];
        return nuevoErrores;
      });
    }
  };

  // Validar formulario antes de enviar
  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};
    
    // Validar número de tarjeta (algoritmo de Luhn)
    const numeroLimpio = nuevaTarjeta.numeroTarjeta.replace(/\s+/g, '');
    if (!numeroLimpio) {
      nuevosErrores.numeroTarjeta = 'El número de tarjeta es requerido';
    } else if (nuevaTarjeta.tipo === 'amex' && numeroLimpio.length !== 15) {
      nuevosErrores.numeroTarjeta = 'El número de AMEX debe tener 15 dígitos';
    } else if (nuevaTarjeta.tipo !== 'amex' && numeroLimpio.length !== 16) {
      nuevosErrores.numeroTarjeta = 'El número de tarjeta debe tener 16 dígitos';
    } else if (!validarLuhn(numeroLimpio)) {
      nuevosErrores.numeroTarjeta = 'Número de tarjeta inválido';
    }
    
    // Validar nombre
    if (!nuevaTarjeta.nombreTarjeta.trim()) {
      nuevosErrores.nombreTarjeta = 'El nombre es requerido';
    }
    
    // Validar dirección
    if (!nuevaTarjeta.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es requerida';
    }
    
    // Validar código postal
    if (!nuevaTarjeta.codigoPostal.trim()) {
      nuevosErrores.codigoPostal = 'El código postal es requerido';
    } else if (nuevaTarjeta.codigoPostal.length < 5) {
      nuevosErrores.codigoPostal = 'Ingrese un código postal válido (5 dígitos)';
    }
    
    // Validar fecha de vencimiento
    if (!nuevaTarjeta.fechaVencimiento) {
      nuevosErrores.fechaVencimiento = 'La fecha de vencimiento es requerida';
    } else {
      const [mes, anio] = nuevaTarjeta.fechaVencimiento.split('/');
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = fechaActual.getFullYear() % 100;
      
      if (!mes || !anio || mes.length !== 2 || anio.length !== 2) {
        nuevosErrores.fechaVencimiento = 'Formato inválido (MM/YY)';
      } else {
        const mesNum = parseInt(mes);
        const anioNum = parseInt(anio);
        
        if (isNaN(mesNum) || isNaN(anioNum) || mesNum < 1 || mesNum > 12) {
          nuevosErrores.fechaVencimiento = 'Mes inválido';
        } else if (anioNum < anioActual || (anioNum === anioActual && mesNum < mesActual)) {
          nuevosErrores.fechaVencimiento = 'La tarjeta ha expirado';
        }
      }
    }
    
    // Validar CVV
    if (!nuevaTarjeta.cvv) {
      nuevosErrores.cvv = 'El código de seguridad es requerido';
    } else {
      const cvvLength = nuevaTarjeta.tipo === 'amex' ? 4 : 3;
      if (nuevaTarjeta.cvv.length !== cvvLength) {
        nuevosErrores.cvv = `El CVV debe tener ${cvvLength} dígitos`;
      }
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Implementación del algoritmo de verificación de Luhn
  const validarLuhn = (numeroTarjeta: string): boolean => {
    let suma = 0;
    let doble = false;
    
    // Recorrer de derecha a izquierda
    for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
      let digito = parseInt(numeroTarjeta.charAt(i));
      
      if (doble) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      
      suma += digito;
      doble = !doble;
    }
    
    return (suma % 10) === 0;
  };

  // Manejar el envío del formulario
  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit(nuevaTarjeta);
    }
  };

  return (
    <div className="fixed inset-0 bg-background-80 flex items-center justify-center z-50">
      <div className="bg-background w-full max-w-xl p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-text">Agregar nueva tarjeta</h2>
        
        <form onSubmit={manejarSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-text">
              Número de tarjeta
            </label>
            <input
              type="text"
              name="numeroTarjeta"
              value={nuevaTarjeta.numeroTarjeta}
              onChange={manejarCambioInput}
              placeholder="0000 0000 0000 0000"
              className={`w-full p-2 border rounded-md bg-background ${
                errores.numeroTarjeta ? 'border-danger' : 'border-detail'
              }`}
            />
            {errores.numeroTarjeta && (
              <p className="text-danger text-xs mt-1">{errores.numeroTarjeta}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-text">
              Nombre en la tarjeta
            </label>
            <input
              type="text"
              name="nombreTarjeta"
              value={nuevaTarjeta.nombreTarjeta}
              onChange={manejarCambioInput}
              placeholder="NOMBRE APELLIDO"
              className={`w-full p-2 border rounded-md bg-background ${
                errores.nombreTarjeta ? 'border-danger' : 'border-detail'
              }`}
            />
            {errores.nombreTarjeta && (
              <p className="text-danger text-xs mt-1">{errores.nombreTarjeta}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-text">
              Dirección de facturación
            </label>
            <input
              type="text"
              name="direccion"
              value={nuevaTarjeta.direccion}
              onChange={manejarCambioInput}
              placeholder="Calle, número, colonia"
              className={`w-full p-2 border rounded-md bg-background ${
                errores.direccion ? 'border-danger' : 'border-detail'
              }`}
            />
            {errores.direccion && (
              <p className="text-danger text-xs mt-1">{errores.direccion}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-text">
              Código postal
            </label>
            <input
              type="text"
              name="codigoPostal"
              value={nuevaTarjeta.codigoPostal}
              onChange={manejarCambioInput}
              placeholder="00000"
              className={`w-full p-2 border rounded-md bg-background ${
                errores.codigoPostal ? 'border-danger' : 'border-detail'
              }`}
            />
            {errores.codigoPostal && (
              <p className="text-danger text-xs mt-1">{errores.codigoPostal}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 xs:grid-cols-1">
            <div>
              <label className="block text-sm font-medium mb-1 text-text">
                Fecha de vencimiento
              </label>
              <input
                type="text"
                name="fechaVencimiento"
                value={nuevaTarjeta.fechaVencimiento}
                onChange={manejarCambioInput}
                placeholder="MM/YY"
                className={`w-full p-2 border rounded-md bg-background ${
                  errores.fechaVencimiento ? 'border-danger' : 'border-detail'
                }`}
              />
              {errores.fechaVencimiento && (
                <p className="text-danger text-xs mt-1">{errores.fechaVencimiento}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-text">
                Código de seguridad (CVV)
              </label>
              <input
                type="password"
                name="cvv"
                value={nuevaTarjeta.cvv}
                onChange={manejarCambioInput}
                placeholder={nuevaTarjeta.tipo === 'amex' ? "4 dígitos" : "3 dígitos"}
                className={`w-full p-2 border rounded-md bg-background ${
                  errores.cvv ? 'border-danger' : 'border-detail'
                }`}
              />
              {errores.cvv && (
                <p className="text-danger text-xs mt-1">{errores.cvv}</p>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="predeterminada"
                checked={nuevaTarjeta.predeterminada}
                onChange={manejarCambioInput}
                className="mr-2"
              />
              <span className="text-sm text-text">Establecer como tarjeta predeterminada</span>
            </label>
          </div>
          
          <div className="flex justify-end gap-3 xs:flex-col">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-detail rounded-md text-text hover:bg-detail-hover"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-background rounded-md hover:bg-primary-strong"
            >
              Guardar tarjeta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioTarjeta;
