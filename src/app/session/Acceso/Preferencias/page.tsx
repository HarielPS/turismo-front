"use client";

import React, { useState, useEffect } from "react";
import { obtenerAtributos } from "@/app/services/atributos";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface Atributo {
  _id: string;
  nombre: string;
  nivel: number;
  padre?: string | null;
  img?: string;
}

// Atributos:
//     - Id (sera un objectID)
//     -Nombre (sera el nombre de las categorias,tipo y subtipo esta en la pagina 47-54)(ej.sitios naturales, montañas,cerros,Museos y otros,etc..)
//     -Nivel (sera un int referente a la tabla Nivel)
//     -Padre (sera un string que sera el id del padre de la categoria, en caso de no tener padre sera null)
//     -Img (sera un string que sera la url de la imagen de la categoria, en caso de no tener imagen sera null)

const Preferencias = () => {
  const [preferencias, setPreferencias] = useState<string[]>([]);
  const [todosLosAtributos, setTodosLosAtributos] = useState<Atributo[]>([]);
  const [atributosVisibles, setAtributosVisibles] = useState<Atributo[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    obtenerAtributos()
      .then((data: Atributo[]) => {
        setTodosLosAtributos(data);
        setLoading(false);
        // Mostrar solo nivel 1 al inicio
        actualizarAtributosVisibles(data.filter(a => a.nivel === 1), []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Preferencias:", preferencias);
  },[preferencias])

  // Obtener hijos directos ordenados
  const obtenerHijos = (id: string): Atributo[] => {
    return todosLosAtributos
      .filter(attr => attr.padre === id)
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  };

  // Obtener todos los ancestros de un atributo
  const obtenerAncestros = (id: string): Atributo[] => {
    const atributo = todosLosAtributos.find(a => a._id === id);
    if (!atributo || !atributo.padre) return [];
    
    const padre = todosLosAtributos.find(a => a._id === atributo.padre);
    if (!padre) return [];
    
    return [...obtenerAncestros(padre._id), padre];
  };

  // Obtener todos los hijos recursivamente
  const obtenerTodosLosHijos = (id: string): string[] => {
    const hijosDirectos = obtenerHijos(id);
    const hijosDeHijos = hijosDirectos.flatMap(hijo => obtenerTodosLosHijos(hijo._id));
    return [...hijosDirectos.map(h => h._id), ...hijosDeHijos];
  };

  // Actualizar la lista visible de atributos
  const actualizarAtributosVisibles = (nivel1: Atributo[], expandidos: string[]) => {
    let nuevosVisibles: Atributo[] = [];
    
    nivel1.forEach(atributo => {
      // Agregar el atributo de nivel 1
      nuevosVisibles.push(atributo);
      
      // Si está expandido, agregar sus hijos
      if (expandidos.includes(atributo._id)) {
        nuevosVisibles = [...nuevosVisibles, ...obtenerHijos(atributo._id)];
      }
    });
    
    setAtributosVisibles(nuevosVisibles);
  };

  // Manejar selección/deselección
  const togglePreferencia = (id: string) => {
    setPreferencias(prev => {
      const estaSeleccionado = prev.includes(id);
      
      if (estaSeleccionado) {
        // Deseleccionar: remover este y todos sus hijos
        const hijos = obtenerTodosLosHijos(id);
        return prev.filter(prefId => prefId !== id && !hijos.includes(prefId));
      } else {
        // Seleccionar: agregar este y todos sus ancestros
        const ancestros = obtenerAncestros(id).map(a => a._id);
        return [...prev, id, ...ancestros.filter(aId => !prev.includes(aId))];
      }
    });

    // Manejar expansión/colapso
    if (!preferencias.includes(id)) {
      const atributo = todosLosAtributos.find(a => a._id === id);
      if (atributo && obtenerHijos(id).length > 0) {
        // Expandir si tiene hijos
        setCategoriasExpandidas(prev => 
          prev.includes(id) ? prev : [...prev, id]
        );
      }
    }
  };

  // Manejar expansión/colapso
  const toggleExpansion = (id: string) => {
    setCategoriasExpandidas(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id) // Colapsar
        : [...prev, id] // Expandir
    );
  };

  // Manejar búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      // Mostrar solo nivel 1 si no hay búsqueda
      const nivel1 = todosLosAtributos.filter(a => a.nivel === 1);
      actualizarAtributosVisibles(nivel1, categoriasExpandidas);
    } else {
      // Mostrar resultados de búsqueda con contexto
      const resultados = todosLosAtributos
        .filter(attr => attr.nombre.toLowerCase().includes(term))
        .flatMap(attr => [attr, ...obtenerAncestros(attr._id)])
        .filter((v, i, a) => a.findIndex(t => t._id === v._id) === i); // Eliminar duplicados
      
      setAtributosVisibles(resultados);
    }
  };

  // Efecto para actualizar visibles cuando cambian las expansiones
  useEffect(() => {
    if (searchTerm === "") {
      const nivel1 = todosLosAtributos.filter(a => a.nivel === 1);
      actualizarAtributosVisibles(nivel1, categoriasExpandidas);
    }
  }, [categoriasExpandidas, todosLosAtributos, searchTerm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) throw new Error('Token no encontrado');

      const response = await fetch(`${process.env.BACKEND_URL}/usuarios/preferencias`, {
        method: 'POST',
        body: JSON.stringify({ preferencias }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error al guardar preferencias');
      window.location.href = "/Usuario";
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar las preferencias');
    }
  };

  if (loading) return <p>Cargando atributos...</p>;

  return (
    <div className="p-4">
      <ThemeToggle/>
      <h1 className="text-2xl font-bold mb-4">Preferencias</h1>

      <div className="mb-20">
        <input
          type="text"
          placeholder="Buscar categoría"
          onChange={handleSearch}
          value={searchTerm}
          className="border p-2 w-full"
        />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {atributosVisibles.map((atributo) => {
            const isSelected = preferencias.includes(atributo._id);
            const tieneHijos = obtenerHijos(atributo._id).length > 0;
            const esNivel1 = atributo.nivel === 1;
            const estaExpandido = categoriasExpandidas.includes(atributo._id);
            
            return (
              <div key={atributo._id} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => togglePreferencia(atributo._id)}
                  onDoubleClick={() => tieneHijos && toggleExpansion(atributo._id)}
                  className={`relative w-36 h-36 rounded-full overflow-hidden group
                    ${isSelected ? 'ring-4 ring-primary' : 'ring-2 ring-secondary'}
                    ${esNivel1 ? 'border-2 border-gray-300' : ''}`}
                  style={{
                    backgroundImage: `url('${atributo.img || "/atributos/default.png"}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className={`
                    absolute inset-0 flex items-center justify-center 
                    transition-opacity duration-300
                    ${isSelected ? 'bg-black/60' : 'bg-black/0 group-hover:bg-black/50'}
                  `}>
                    {isSelected && (
                      <div className="text-white text-4xl font-bold animate-bounce">
                        ✓
                      </div>
                    )}
                    {tieneHijos && !isSelected && (
                      <div className={`text-white text-xl transition-all
                        ${estaExpandido ? 'rotate-90' : 'group-hover:opacity-100 opacity-0'}`}>
                        →
                      </div>
                    )}
                  </div>
                </button>
                <p className="text-center mt-2">
                  {atributo.nombre}
                  {tieneHijos && (
                    <span className="text-xs block mt-1">
                      ({obtenerHijos(atributo._id).length} subcategorías)
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Preferencias
        </button>
      </form>
    </div>
  );
};

export default Preferencias;