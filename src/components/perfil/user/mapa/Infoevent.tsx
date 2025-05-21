import React, { useEffect } from 'react';
import { ServicioAll } from '@/components/perfil/user/interfaces/mapa';

const Infoevent: React.FC<{ servicio: ServicioAll; onClose?: () => void }> = ({
  servicio,
  onClose,
}) => {
  const {
    nombre,
    img_profile,
    calificacion,
    descripcion,
    imagenes,
    duracion,
    precio,
    tel,
    email,
    web,
    horarios,
    fecha,
    comentarios,
    localidad,
    categoria,
    tipo,
    subtipo,
    jerarquia,
    tangible,
    pueblo,
    coordenadas,
    ubicacion,
  } = servicio;

  useEffect(() => {
    console.log(servicio);
  }, [servicio]);

  const parsedFecha = React.useMemo(() => {
    if (!fecha) return null;
    try {
        return typeof fecha === 'string' ? JSON.parse(fecha) : fecha;
    } catch (e) {
        console.error('Error parsing fecha:', e);
        return null;
    }
    }, [fecha]);

    // Función para convertir rating a estrellas
    const renderStars = () => {
        const safeRating = calificacion ?? 0;
        const fullStars = Math.floor(safeRating);
        const hasHalfStar = safeRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
        <>
            {'★'.repeat(fullStars)}
            {hasHalfStar && (
            <span style={{position: 'relative', display: 'inline-block'}}>
                <span style={{position: 'absolute', width: '50%', overflow: 'hidden'}}>★</span>
                <span style={{opacity: 0.5}}>☆</span>
            </span>
            )}
            {'☆'.repeat(emptyStars)}
        </>
        );
    };

  return (
    <div className="relative h-full overflow-y-auto p-4 bg-background rounded-r-xl">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-text hover:text-detail cursor-pointer"
        >
          ✕
        </button>
      )}

      {/* Título */}
      <h1 className="text-2xl font-bold mb-2">{nombre}</h1>

      {/* Imagen principal */}
      {img_profile && (
        <img
          src={img_profile}
          alt={nombre}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* Calificación general */}
      <div className="text-sm">
        <strong>Calificación:</strong> {calificacion ?? 'N/A'}/5
      </div>
      {/* Calificación */}
    <div className="flex items-center mt-1">
        <span className="text-yellow-400 text-sm">
        {calificacion.toFixed(1)} {renderStars()} 
        </span>
        <span className="ml-1 text-xs text-text-secondary">({comentarios.length})</span>
    </div>

      {/* Descripción */}
      {descripcion && <p className="text-sm mb-4">{descripcion}</p>}

      {/* Categoría y tipo */}
      <div className="mb-2 text-sm">
        <p><strong>Categoría:</strong> {categoria?.nombre || 'N/A'}</p>
        <p><strong>Tipo:</strong> {tipo?.nombre || 'N/A'}</p>
        <p><strong>Subtipo:</strong> {subtipo?.nombre || 'N/A'}</p>
      </div>

      {/* Info general */}
      <div className="mb-2 text-sm">
        <p><strong>Duración:</strong> {duracion ?? 'N/A'} mins</p>
        <p><strong>Precio:</strong> {precio !== undefined ? `$${precio}` : 'N/A'}</p>
        <p><strong>Ubicación:</strong> {ubicacion || 'N/A'}</p>
        <p><strong>Pueblo:</strong> {pueblo || 'N/A'}</p>
        <p><strong>Localidad:</strong> {localidad || 'N/A'}</p>
        <p><strong>Coordenadas:</strong> {coordenadas?.lat}, {coordenadas?.long}</p>
        <p><strong>Tangible:</strong> {tangible ? 'Sí' : 'No'}</p>
        <p><strong>Jerarquía:</strong> {jerarquia || 'N/A'}</p>
        
        {parsedFecha && (
        <>
            <p><strong>Fecha:</strong> {parsedFecha.descripcion}</p>
            <p><strong>Desde:</strong> {parsedFecha.inicio} <strong>hasta:</strong> {parsedFecha.fin}</p>
        </>
        ) }
      </div>

      {/* Contacto */}
      <div className="mb-2 text-sm">
        <p><strong>Teléfono:</strong> {tel || 'N/A'}</p>
        <p><strong>Email:</strong> {email || 'N/A'}</p>
        <p>
          <strong>Web:</strong>{' '}
          {web ? (
            <a href={web} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              {web}
            </a>
          ) : 'N/A'}
        </p>
      </div>

      {/* Horarios */}
      {horarios?.length > 0 && (
        <div className="mb-4 text-sm">
          <strong>Horarios:</strong>
          <ul className="list-disc list-inside">
            {horarios.map(h => (
              <li key={h._id}>
                {h.dia}: {h.apertura} - {h.cierre}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Imágenes adicionales */}
      {imagenes?.length > 0 && (
        <div className="mb-4">
          <strong>Galería:</strong>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {imagenes.map(img => (
              <img
                key={img._id}
                src={img.url}
                alt="Imagen"
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* Comentarios */}
      {comentarios?.length > 0 && (
        <div className="mb-4">
          <strong>Comentarios:</strong>
          <ul className="mt-2 space-y-2">
            {comentarios.map(c => (
              <li key={c._id} className="border-b pb-2">
                <p className="text-sm font-semibold">{c.usuario?.nombre_viajero || 'Anónimo'}:</p>
                <p className="text-xs">{c.comentario}</p>
                <p className="text-xs text-gray-500">Calificación: {c.calificacion}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Infoevent;
