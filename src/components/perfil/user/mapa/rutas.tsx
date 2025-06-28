"use client"
import React, { useState } from 'react';
import { MapProps, Servicio } from '@/components/perfil/user/interfaces/mapa';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
// import { getEstadoYHoraCierre } from '@/components/perfil/user/mapa/FuncionHora';
import { Actividad, Guardado } from '@/components/perfil/user/interfaces/guardado';

interface RutasBoxProps {
  servicio: Servicio[];
  setServicios: (servicios: Servicio[]) => void;
  locations: Servicio[];
}

const RutasBox: React.FC<RutasBoxProps> = ({ servicio, setServicios, locations }) => {
  const [loadingItinerario, setLoadingItinerario] = useState(false);
  const [errorItinerario, setErrorItinerario] = useState<string | null>(null);
  const [showHotels, setShowHotels] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showActivities, setShowActivities] = useState(true);
  const [itinerario, setItinerario] = useState<
    { actividad: string; inicio: string; fin: string }[]
  >([]);

  const [presupuesto, setPresupuesto] = useState({
    hotel: 0,
    restaurantes: 0,
    servicio: 0
  });

  const [filtrosActivos, setFiltrosActivos] = useState({
    hotel: false,
    restaurantes: false,
    servicio: false
  });

  // Función para formatear fechas
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generar ruta aleatoria incluyendo todos los tipos seleccionados
  const generarRutaAleatoria = () => {
    // Filtrar por tipo
    const hoteles = locations.filter(loc => loc.type === 'hotel');
    const restaurantes = locations.filter(loc => loc.type === 'restaurante');
    const actividades = locations.filter(loc => loc.type === 'actividad');

    // Función para tomar N elementos aleatorios sin repetir
    const tomarAleatorios = <T,>(array: T[], n: number): T[] => {
      if (array.length <= n) return [...array];
      const copia = [...array];
      const seleccionados: T[] = [];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * copia.length);
        seleccionados.push(copia[idx]);
        copia.splice(idx, 1);
      }
      return seleccionados;
    };

    // Tomar los elementos al azar según la cantidad requerida
    const hotelSeleccionado = tomarAleatorios(hoteles, 1)[0];
    const restaurantesSeleccionados = tomarAleatorios(restaurantes, 3);
    let actividadesSeleccionadas = tomarAleatorios(actividades, 8);

    // Asignar horarios a las actividades (de 8:00 a 20:00, dividido en bloques)
    const horariosDisponibles = [
      '08:00 - 10:00',
      '10:00 - 12:00',
      '12:00 - 14:00',
      '14:00 - 16:00',
      '16:00 - 18:00',
      '18:00 - 20:00'
    ];

    // Preparar itinerario en el formato esperado
    const itinerario = actividadesSeleccionadas.map((actividad, index) => {
      const horarioIndex = index % horariosDisponibles.length;
      const [inicio, fin] = horariosDisponibles[horarioIndex].split(' - ');
      
      return {
        actividad: actividad.name ?? '', // Garantiza que siempre sea string
        inicio,
        fin,
        // Puedes añadir más campos si son necesarios en tu interfaz
        _id: actividad._id,
        tipo: 'actividad',
        // ubicacion: actividad.ubicacion || '',
        duracion: '2 horas' // Puedes calcular esto dinámicamente
      };
    });

    // Preparar servicios (hotel + restaurantes) en el formato esperado
    const servicios: Servicio[] = [];

    // Agregar hotel si existe
    if (hotelSeleccionado) {
      servicios.push({
        _id: hotelSeleccionado._id,
        name: hotelSeleccionado.name,
        type: 'hotel',
        img: hotelSeleccionado.img || '',
        rating: hotelSeleccionado.rating || 0,
        feature_1: hotelSeleccionado.feature_1 || '',
        feature_2: hotelSeleccionado.feature_2 || '',
        feature_3: hotelSeleccionado.feature_3 || '',
        lat: hotelSeleccionado.lat || 0,
        lng: hotelSeleccionado.lng || 0,
        reviewCount: hotelSeleccionado.reviewCount || 0,
        status: hotelSeleccionado.status || '',
        fecha: '', // Puedes asignar una fecha si es necesario
        closingTime: hotelSeleccionado.closingTime || ''
      });
    }

    // Agregar restaurantes
    restaurantesSeleccionados.forEach(restaurante => {
      servicios.push({
        _id: restaurante._id,
        name: restaurante.name,
        type: 'restaurante',
        img: restaurante.img || '',
        rating: restaurante.rating || 0,
        feature_1: restaurante.feature_1 || '',
        feature_2: restaurante.feature_2 || '',
        feature_3: restaurante.feature_3 || '',
        lat: restaurante.lat || 0,
        lng: restaurante.lng || 0,
        reviewCount: restaurante.reviewCount || 0,
        status: restaurante.status || '',
        fecha: '', // Puedes asignar una fecha si es necesario
        closingTime: restaurante.closingTime || ''
      });
    });

    // Actualizar estados
    setServicios(servicios);
    setItinerario(
      itinerario.map(({ actividad, inicio, fin }) => ({
        actividad,
        inicio,
        fin
      }))
    );

    console.log("Ruta aleatoria generada:", {
      servicios,
      itinerario
    });
  };

  // Generar itinerario inteligente
  const generarItinerarioInteligente = async () => {
    setLoadingItinerario(true);
    setErrorItinerario(null);
    
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate());
      
      // const res = await fetch(
      //   `/api/planner?fecha_inicio=${formatDate(today)}&fecha_fin=${formatDate(endDate)}`
      // );
      const res = await fetch(`/api/planner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_inicio: formatDate(today),
          fecha_fin: formatDate(endDate),
          hotel: presupuesto.hotel || undefined,
          restaurantes: presupuesto.restaurantes || undefined,
          servicio: presupuesto.servicio || undefined,
        }),
      });

      if (!res.ok) throw new Error('Error al obtener itinerario');
      
      const data = await res.json();
      console.log("Respuesta del backend:", data);
      const fechas = Object.keys(data.plan);
      if (fechas.length === 0) throw new Error("No se encontró información de itinerario");

      const plan = data.plan[fechas[0]];

      // Guardar itinerario
      if (!plan.itinerario || !Array.isArray(plan.itinerario)) {
        throw new Error("Itinerario no encontrado en el plan");
      }
      setItinerario(plan.itinerario);

      // Preparar servicios (hotel + restaurantes)
      const serviciosPlanificados: Servicio[] = [];

      // Agregar hotel
      if (plan.hotel) {
        serviciosPlanificados.push({
          _id: plan.hotel._id,
          name: plan.hotel.nombre,
          type: 'hotel',
          img: plan.hotel.img_profile || '',
          rating: plan.hotel.calificacion,
          feature_1: plan.hotel.descripcion,
          feature_2: plan.hotel.feature_2 || '',
          feature_3: plan.hotel.feature_3 || '',
          lat: plan.hotel.lat || 0,
          lng: plan.hotel.lng || 0,
          reviewCount: plan.hotel.reviewCount || 0,
          status: plan.hotel.status || '',
          fecha: plan.hotel.fecha || '', // Añadido para cumplir con Servicio
          closingTime: plan.hotel.closingTime || '', // Añadido para cumplir con Servicio
        });

        // Agregar restaurantes
        if (plan.restaurantes && Array.isArray(plan.restaurantes)) {
          const restaurantesTransformados = plan.restaurantes.map((r: any) => ({
            _id: r._id,
            name: r.nombre,
            type: 'restaurante',
            img: r.img_profile || '',
            rating: r.calificacion,
            feature_1: r.descripcion,
            feature_2: r.feature_2 || '',
            feature_3: r.feature_3 || '',
            lat: r.lat || 0,
            lng: r.lng || 0,
            reviewCount: r.reviewCount || 0,
            status: r.status || '',
            closingTime: r.closingTime || '',
            fecha: r.fecha || '',
          }));
          serviciosPlanificados.push(...restaurantesTransformados);
        }
      }

      // Actualizar estado
      setServicios(serviciosPlanificados);

      console.log("Itinerario inteligente generado:", serviciosPlanificados);

    } catch (err) {
      console.error("Error al generar itinerario:", err);
      setErrorItinerario(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoadingItinerario(false);
    }
  };

const handleGuardar = async () => {
  const fechaActual = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

  const actividades: Actividad[] = [
    ...servicio.map(s => ({
      id: s._id,
      tipo: s.type === 'restaurante' ? 'alimento' : (s.type === 'hotel' ? 'hotel' : 'servicio') as "alimento" | "hotel" | "servicio",
      estado: "reserva" as const
    })),
    ...itinerario.map(act => ({
      id: act.actividad, // aquí deberías usar el `_id` si está disponible
      tipo: "servicio" as const,
      estado: "reserva" as const
    }))
  ];

  const nuevoGuardado: Guardado = {
    id: `ruta-${Date.now()}`, // ID único temporal
    status: 'reserva',
    fecha_guardado: fechaActual,
    actividades
  };

  try {
    const resUser = await fetch('/api/userinfo', { method: 'POST' });
    const { userId } = await resUser.json();

    const res = await fetch('/api/userinfo/guardar-ruta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoGuardado),
    });

    if (res.ok) {
      alert("✅ Ruta guardada con éxito.");
      console.log("Guardado:", nuevoGuardado);
    } else {
      const errorData = await res.json();
      alert("❌ Error al guardar la ruta: " + (errorData.error || "desconocido"));
      console.error("Error al guardar:", errorData);
    }
  } catch (error) {
    alert("❌ Error de red o del servidor al guardar la ruta.");
    console.error("Error inesperado:", error);
  }
};



  interface FiltrosActivos {
    hotel: boolean;
    restaurantes: boolean;
    servicio: boolean;
  }

  type TipoFiltro = keyof FiltrosActivos;

  const toggleFiltro = (tipo: TipoFiltro) => {
    setFiltrosActivos({
      ...filtrosActivos,
      [tipo]: !filtrosActivos[tipo]
    });

    // Resetear el valor a 0 cuando se activa el filtro
    if (!filtrosActivos[tipo]) {
      setPresupuesto({
        ...presupuesto,
        [tipo]: 0
      });
    }
  };

  const filtrosConfig = [
    { key: 'hotel', label: 'Filtro Hotel' },
    { key: 'restaurantes', label: 'Filtro Restaurantes' },
    { key: 'servicio', label: 'Filtro Actividades' },
  ];

  return (
    <div className='flex flex-col text-text bg-background p-4 h-full'>
      <h1 className='mb-5 text-xl font-bold'>Planificador de Ruta</h1>

      <div className="grid grid-cols-1 gap-3 mb-4">
  {filtrosConfig.map(({ key, label }) => (
    <div key={key} className="flex flex-col gap-2">
      <button
        onClick={() => toggleFiltro(key as keyof typeof filtrosActivos)}
        className={`px-3 cursor-pointer py-1 rounded-full text-sm ${
          filtrosActivos[key as keyof typeof filtrosActivos]
            ? 'bg-green-500 text-white'
            : 'bg-gray-200'
        }`}
      >
        {filtrosActivos[key as keyof typeof filtrosActivos] ? 'Activo' : 'Inactivo'}
      </button>
      <div className='flex'>
        <span>{label}</span>
      </div>
      <input
        type="number"
        placeholder={`Presupuesto ${label.split(' ')[1].toLowerCase()}`}
        value={presupuesto[key as keyof typeof presupuesto]}
        onChange={(e) =>
          setPresupuesto({
            ...presupuesto,
            [key]: Number(e.target.value),
          })
        }
        className="p-2 border rounded"
        min={filtrosActivos[key as keyof typeof filtrosActivos] ? 0 : undefined}
        disabled={!filtrosActivos[key as keyof typeof filtrosActivos]}
      />
    </div>
  ))}
</div>



      {/* Botón de guardado */}
      <button 
        onClick={handleGuardar} 
        className='bg-primary text-white cursor-pointer p-2 rounded-lg mb-4 hover:bg-primary-dark transition'
      >
        Guardar Ruta
      </button>

      {/* Generadores de ruta */}
      <div className='flex flex-col gap-3 mb-5'>
        <div className='flex items-center gap-3'>
          <button 
            onClick={generarRutaAleatoria}
            className='bg-secondary cursor-pointer text-white p-2 rounded-lg hover:bg-secondary-dark transition flex items-center gap-2'
          >
            <ArrowPathIcon className='w-4 h-4' />
            <span>Ruta Aleatoria</span>
          </button>
        </div>
        
        <div className='flex items-center gap-3'>
          <button 
            onClick={generarItinerarioInteligente}
            className='bg-accent cursor-pointer text-white p-2 rounded-lg hover:bg-accent-dark transition flex items-center gap-2 disabled:opacity-50'
            disabled={loadingItinerario}
          >
            {loadingItinerario ? (
              <span>Cargando...</span>
            ) : (
              <>
                <ArrowPathIcon className='w-4 h-4' />
                <span>Itinerario Inteligente</span>
              </>
            )}
          </button>
        </div>
        
        {errorItinerario && (
          <p className='text-red-500 text-sm mt-2'>{errorItinerario}</p>
        )}
      </div>

      {/* Lista de servicios */}
       {/* Lista combinada del itinerario inteligente */}
<div className="mt-6">
  <h2 className='text-lg font-semibold mb-3'>Itinerario Inteligente</h2>

  {/* Hotel */}
  {servicio.find(s => s.type === 'hotel') && (
    <div className="mb-4">
      <h3 className="font-semibold text-md mb-2">🏨 Hospedaje</h3>
      {servicio
        .filter(s => s.type === 'hotel')
        .map((item, index) => (
          <div key={`${item._id}-${index}`} className="border border-blue-200 bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.feature_1}</p>
            <span className="text-yellow-500 text-sm">★ {item.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        ))}
    </div>
  )}

  {/* Restaurantes */}
  {servicio.some(s => s.type === 'restaurante') && (
    <div className="mb-4 mt-4">
      <h3 className="font-semibold text-md mb-2">🍽️ Restaurantes</h3>
      {servicio
        .filter(s => s.type === 'restaurante')
        .map((item, index) => (
          <div key={`${item._id}-${index}`} className="border border-green-200 bg-green-50 rounded-lg p-3">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.feature_1}</p>
            <span className="text-yellow-500 text-sm">★ {item.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        ))}
    </div>
  )}

  {/* Itinerario de actividades ordenado */}
  <div>
    <h3 className="font-semibold text-md mb-2">🗺️ Actividades ({itinerario.length})</h3>
    {itinerario.length === 0 ? (
      <p className='text-gray-500'>No hay actividades aún.</p>
    ) : (
      <div className="grid grid-cols-1 gap-3">
        {[...itinerario] // copiamos el array para no mutar el original
          .sort((a, b) => {
            // Convertir "HH:mm" a número para comparar
            const aNum = parseInt(a.inicio.replace(':', ''), 10);
            const bNum = parseInt(b.inicio.replace(':', ''), 10);
            return aNum - bNum;
          })
          .map((item, index) => (
            <div key={index} className="border border-purple-200 bg-purple-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{item.actividad}</h4>
                <span className="text-sm text-gray-600">
                  {item.inicio} - {item.fin}
                </span>
              </div>
            </div>
          ))}
      </div>
    )}
  </div>
</div>



    </div>
  );
};

export default RutasBox;