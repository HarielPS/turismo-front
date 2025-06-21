"use client";

import React, { useState, useEffect, useRef } from "react";
import { obtenerAtributos } from "@/app/services/atributos";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { 
        filtrarAtributosPorPadre, 
        Atributo, 
        getVisibleChildren, 
        removeFromPreferencias, 
        buscarAtributos,
        obtenerJerarquiaCompleta
} from "@/app/services/atributosHelpers";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";

// Atributos:
//     - Id (sera un objectID)
//     -Nombre (sera el nombre de las categorias,tipo y subtipo esta en la pagina 47-54)(ej.sitios naturales, montañas,cerros,Museos y otros,etc..)
//     -Nivel (sera un int referente a la tabla Nivel)
//     -Padre (sera un string que sera el id del padre de la categoria, en caso de no tener padre sera null)
//     -Img (sera un string que sera la url de la imagen de la categoria, en caso de no tener imagen sera null)

const Preferencias = () => {
  const [loading, setLoading] = useState(true);

  const [todosLosAtributos, setTodosLosAtributos] = useState<Atributo[]>([]);
  const [atributosVisibles, setAtributosVisibles] = useState<Atributo[]>([]);
  const [atributosVisibleswhileSearch , setAtributosVisibleswhileSearch]= useState<Atributo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [preferencias, setPreferencias] = useState<string[]>([]);
  const scrolled = useScrollDetection(30);
  const banderaSearch = useRef<boolean | null>(false);
  const router = useRouter();

  useEffect(() => {
    obtenerAtributos()
      .then((data: Atributo[]) => {
        const nivel1 = filtrarAtributosPorPadre(data, null);
        setTodosLosAtributos(data);
        setAtributosVisibles(nivel1);
        setAtributosVisibleswhileSearch(nivel1);
        // atributosVisiblesInicialRef.current = nivel1;
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
  if (searchTerm) {
    const resultados = buscarAtributos(searchTerm, todosLosAtributos);
    setAtributosVisibles(resultados);
    } 
  if (searchTerm.length == 0 && banderaSearch.current === true) {
    setAtributosVisibles(atributosVisibleswhileSearch);
    }
  if (searchTerm.length == 0){
    banderaSearch.current = false;
  }
  if (searchTerm.length == 1) {
    if(banderaSearch.current === false) {
      banderaSearch.current = true;
      setAtributosVisibleswhileSearch(atributosVisibles)
    }
  }
}, [searchTerm, todosLosAtributos]);

  const toggleSelect = (id: string) => {
    setAtributosVisibles(prev => 
      getVisibleChildren(id, todosLosAtributos, prev, preferencias)
    );
  };

  const togglePreferencia = (id: string) => {
    setPreferencias(prev => 
      prev.includes(id)
        ? removeFromPreferencias(id, todosLosAtributos, prev)
        : [...prev, id]
    );
  };

  const handleSearchSelection = (id: string) => {
    // 1. Obtener jerarquía completa del atributo seleccionado
    const jerarquiaCompleta = obtenerJerarquiaCompleta(id, todosLosAtributos);

    // 2. Agregar todos los ancestros a preferencias
    const nuevosIds = jerarquiaCompleta.map(a => a._id);
    setPreferencias(prev => [...new Set([...prev, ...nuevosIds])]);
    
    // 3. Limpiar búsqueda
    setSearchTerm("");
    
    // Expandir la jerarquía manteniendo los atributos ya visibles
    let nuevosVisibles = [...atributosVisibleswhileSearch];

    // Para cada elemento en la jerarquía 
    jerarquiaCompleta.forEach((nivel) => {
      nuevosVisibles = getVisibleChildren(nivel._id, todosLosAtributos, nuevosVisibles, preferencias);
    });

    setAtributosVisibles(nuevosVisibles);
    banderaSearch.current = false;
  };

  const handleSubmit = async () => {
    if (preferencias.length < 4) {
      alert("Debes seleccionar al menos 4 preferencias antes de guardar");
      return;
    }

    console.log("Preferencias a guardar:", preferencias);
  
    const res = await fetch('/api/auth/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferencias }),
    });
  
    if (!res.ok) {
      alert("Error al guardar preferencias");
      return;
    }
  
    if(res.ok) {
      alert("Preferencias guardadas correctamente");
      router.push('/Usuario/mapa');
    }
  };

if (loading) return <Loading/>;
return (
<div className="p-4">

{/* header */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-background-80 shadow-md backdrop-blur' : 'bg-transparent text-white dark:bg-background-60'}`}>
        
  {/* Barra de logo y titulo */}
        <div className="flex items-center p-4">
          <div className="flex-1">
            <ThemeToggle />
          </div>
          <div className="flex-1 justify-center">
            <div className="flex items-center justify-center w-full">
              <h1 className="text-2xl font-bold">Preferencias ({preferencias.length})</h1>
            </div>
            
          </div>
          <div className="flex-1">
            <div className="flex justify-end w-full pr-10">
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="bg-blue-600 text-sm lg:text-lg text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Guardar Preferencias
              </button>
            </div>
            
          </div>
        </div>
  {/* searchBar */}
        <div className="mb-5 px-20 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-text text-text p-2 w-full rounded-xl pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {/* Ícono de búsqueda */}
            <div className="absolute left-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Botón para limpiar (solo visible cuando hay texto) */}
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Limpiar búsqueda"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Contador de resultados y opción para limpiar */}
          {searchTerm && (
            <div className="flex justify-between items-center mt-2 px-2 text-sm text-gray-500">
              <span>
                {atributosVisibles.length} resultado{atributosVisibles.length !== 1 ? 's' : ''} para "{searchTerm}"
              </span>
              <button 
                onClick={() => setSearchTerm("")}
                className="text-primary hover:underline flex items-center"
              >
                Limpiar búsqueda
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

      </div>
      
{/* contenido */}
      <div className="mt-40">

        <form >
          <div className="grid grid-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {atributosVisibles.map((atributo) => {
              const isSelected = preferencias.includes(atributo._id);
              
              return (
                <div key={atributo._id} className="flex flex-col items-center">
                  <button
                    type="button"
                      onClick={() => {
                        if (searchTerm) {
                          // Modo búsqueda - manejar selección especial
                          handleSearchSelection(atributo._id);
                        } else {
                          // Comportamiento normal
                          togglePreferencia(atributo._id);
                          toggleSelect(atributo._id);
                        }
                      }}
                    className={`relative w-36 h-36 rounded-full overflow-hidden group cursor-pointer
                      ${isSelected ? 'ring-4 ring-primary' : 'ring-2 ring-secondary'}`}
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
                    </div>
                  </button>
                  <div className="mt-2 text-center">
                    <span className="text-sm font-semibold">{atributo.nombre}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>

    </div>
  );
};

export default Preferencias;

