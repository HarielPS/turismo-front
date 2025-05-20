import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Atributo {
  _id: string;
  nombre: string;
  img?: string;
  descripcion?: string;
}

interface PerfilAtributosProps {
  atributos: Atributo[];
  isOpen: boolean;
  onClose: () => void;
}

const PerfilAtributos: React.FC<PerfilAtributosProps> = ({ atributos, isOpen, onClose }) => {
  if (!isOpen) return null;

  console.log('Atributos:', atributos);

    return (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-5">
    <div className="bg-detail rounded-lg p-6 w-4/5 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mis Preferencias</h2>
        <button 
          onClick={onClose}
          className="text-text cursor-pointer hover:text-primary"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {atributos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4">
          {atributos.map((atributo) => (
            <li 
              key={atributo._id}
              className="relative p-4 rounded-lg h-48 overflow-hidden shadow-md border-2 border-text transition-all duration-500 ease-in-out hover:scale-105 group"
              style={{
                backgroundImage: `url(${atributo.img || '/atributos/default.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative z-10 h-full flex flex-col justify-end text-white p-2">
                <h3 className="font-semibold text-lg">{atributo.nombre}</h3>
                {atributo.descripcion && (
                  <p className="text-sm line-clamp-2">{atributo.descripcion}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay preferencias registradas</p>
      )}
    </div>
  </div>
);


};

export default PerfilAtributos;