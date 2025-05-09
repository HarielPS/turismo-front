import Preferencias from "../session/Acceso/Preferencias/page";

// estructura de Atributo
export interface Atributo {
    _id: string;
    nombre: string;
    nivel: number;
    padre?: string | null;
    img?: string;
}

// funcion para la searchBar
export const buscarAtributos = (
    term: string,
    atributos: Atributo[]
  ): Atributo[] => {
    if (!term.trim()) {
      return filtrarAtributosPorPadre(atributos, null);
    }
  
    const termLower = term.toLowerCase();
    
    // Solo mostrar coincidencias directas mientras se busca
    return atributos.filter(atributo => 
      atributo.nombre.toLowerCase().includes(termLower)
    );
  };
  export const obtenerJerarquiaCompleta = (
    id: string,
    atributos: Atributo[]
  ): Atributo[] => {
    const jerarquia: Atributo[] = [];
    let currentId: string | null | undefined = id;
    
    while (currentId) {
      const atributo = atributos.find(a => a._id === currentId);
      if (!atributo) break;
      
      jerarquia.unshift(atributo); // Agregar al inicio para mantener orden jerárquico
      currentId = atributo.padre;
    }
    
    return jerarquia;
  };
  
  

// filtrar por el id = id_padre para obtener los hijos
export const filtrarAtributosPorPadre = (atributos: Atributo[], padreId: string | null): Atributo[] => {
    // se filtra en todos los atributos por el id = null o por el id del padre
    return atributos.filter(atributo => atributo.padre === padreId);
};
  

// filtrar por el id = id_padre para obtener los hijos y los nietos ademas de comprobar preferencias
export const obtenerDecendenciaEnPreferencias = (
    padreId: string,
    atributos: Atributo[],
    preferencias: string[]
  ): Atributo[] => {
    // Obtener todos los hijos del padre
    const hijosDirectos = filtrarAtributosPorPadre(atributos, padreId);
    let todosHijos = [...hijosDirectos];
  
    // Recorrer los hijos directos y obtener sus descendencias
    hijosDirectos.forEach(hijo => {
      if (preferencias.includes(hijo._id)) {
        todosHijos = [...todosHijos, ...obtenerDecendenciaEnPreferencias(hijo._id, atributos, preferencias)];
      }
    });
  
    return todosHijos;
};


// obtener los hijos directos
export const getChildren = (
    id: string,
    atributos: Atributo[],
    atributosVisibles: Atributo[]
  ): Atributo[] => {

    // Obtener los hijos del elemento con el id
    const hijos = filtrarAtributosPorPadre(atributos, id);
    console.log("Hijos:", hijos);
  
    // Crear una copia del array original para no mutarlo directamente
    const nuevoArray = [...atributosVisibles];
    
    // Encontrar la posición del padre en el array
    const indicePadre = nuevoArray.findIndex(atributo => atributo._id === id);
    
    //Insertar los hijos justo despues del padre
    if (indicePadre !== -1) {
      nuevoArray.splice(indicePadre + 1, 0, ...hijos);
    }
    
    return nuevoArray;
  };


// obtener los hijos directos y los nietos ademas de mostrar y ocultar los hijos depende de la seleccion
export const getVisibleChildren = (
    id: string,
    atributos: Atributo[],
    atributosVisibles: Atributo[],
    preferencias: string[],
  ): Atributo[] => {
    // Copia del array original
    let nuevoArray = [...atributosVisibles];
  
    // Comprobar si esta en preferencias
    if (preferencias.includes(id)) {
      // Obtener todos los hijos anidados que tambien estan en preferensias
      const hijosParaRemover = obtenerDecendenciaEnPreferencias(id, atributos, preferencias);
      
      nuevoArray = nuevoArray.filter(atributo => 
        atributo._id === id || !hijosParaRemover.some(hijo => hijo._id === atributo._id)
      ); 
    } else {
      // Si no está en preferencias, obtener solo hijos directos
      nuevoArray = getChildren(id, atributos, atributosVisibles);
    }
    console.log("nuevoArray dentro de getVisibleChildren:", nuevoArray);
    return nuevoArray;
};

// funcion para remover los hijos y los nietos de las preferencias
export const removeFromPreferencias = (
    id: string,
    atributos: Atributo[],
    currentPreferencias: string[]
  ): string[] => {
    // Obtener todos los IDs a remover (padre + descendencia seleccionada)
    const hijosParaRemover = obtenerDecendenciaEnPreferencias(id, atributos, currentPreferencias);
    const idsParaRemover = [id, ...hijosParaRemover.map(h => h._id)];
    
    // Filtrar para removerlos
    return currentPreferencias.filter(prefId => !idsParaRemover.includes(prefId));
  };