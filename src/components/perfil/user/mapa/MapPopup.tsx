// components/MapPopup.tsx
import React from 'react';
import { MapPopupProps } from '@/components/perfil/user/interfaces/mapa';

const MapPopup: React.FC<MapPopupProps> = ({
  name,
  rating,
  reviewCount,
  type,
  feature_1,
  // feature_2,
  // feature_3,
  status,
  closingTime,
  img
}) => {
  // Función para convertir rating a estrellas
  const renderStars = () => {
    const safeRating = rating ?? 0;
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
  const safeRating = rating ?? 0;

  return (
    <div className="w-[220px] h-[300px] font-sans bg-detail text-text rounded-lg overflow-hidden">
      {/* Imagen */}
      <div className="relative w-full h-[120px]">
        <img
          src={img || "/atributos/default.png"}
          alt={`${name}_img`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-2">
        {/* Nombre */}
        <h3 className="text-base font-bold truncate">{name}</h3>

        {/* Calificación */}
        <div className="flex items-center mt-1">
          <span className="text-yellow-400 text-sm">
            {safeRating.toFixed(1)} {renderStars()} 
          </span>
          <span className="ml-1 text-xs text-text-secondary">({reviewCount})</span>
        </div>

        {/* Tipo */}
        <p className="text-sm mt-1 capitalize">{type}</p>

        {/* Característica */}
        <p className="text-sm truncate">{feature_1}</p>

        {/* Estado y cierre */}
        <p className="text-sm mt-1">
          <span className={`font-semibold ${status === 'Abierto' ? 'text-green-600' : 'text-danger'}`}>
            {status}
          </span>{' '}
          · {closingTime === 'Hoy no hay horario' ? closingTime : `Cierra a las ${closingTime}`}
        </p>
      </div>
    </div>

  );
};

export default MapPopup;