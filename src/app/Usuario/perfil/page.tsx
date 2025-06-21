"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import DatosInfo from '@/components/perfil/user/profile/datos'
import PerfilAtributos from '@/components/perfil/user/profile/perfilAtributos'
import AtributosCarousel from '@/components/perfil/user/profile/AtributosCarousel'
import Card from '@/components/perfil/user/profile/cardCifra'
import {bajarUsuarioInfo} from '@/services/bajarUsuarioInfo'
import { subirInformacionInfo } from '@/services/subirInformacionInfo'


interface Preferencia {
  atributoID: string;
  conteo?: number;
}

const Perfil = () => {
  const [userInfo, setUserInfo] = useState<{
    userId?: string;
    role?: string;
    userData?: any;
    atributos?: any[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [Editar, setEditar] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (userInfo.userData) {
      setFormData({ ...userInfo.userData });
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await bajarUsuarioInfo();
        setUserInfo(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Error al obtener información'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Informacion recibida del usuario
  useEffect(() => {
    console.log("User Info:", userInfo);
  }, [userInfo]);


  const toggleModal = () => {
    setModalAbierto(!modalAbierto);
  };

  const handleEditar = async () => {
    if (Editar) {
      console.log('Se esta editando....:', formData);
      // debugger;
    }
    setEditar(!Editar);
  };

  const handleGuardar = async () => {
    console.log('💾 Guardando datos:', formData);
    try {
      await subirInformacionInfo(userInfo.userId, formData);
      alert("Información guardada exitosamente");
      setEditar(false);
      const data = await bajarUsuarioInfo();
      setUserInfo(data);
    } catch (err) {
      alert("Error al guardar información");
    }
  };

  const handleCancelar = () => {
    setFormData({ ...userInfo.userData }); 
    setEditar(false);
  };


  if (loading) return <div className="flex justify-center items-center h-screen">Cargando perfil...</div>;
  if (error) return <div className="text-red-500 p-5">Error: {error}</div>;

  return (
    <div className='flex p-5 w-full flex-col'>
      <>
        <button
          onClick={Editar ? handleGuardar : handleEditar}
          // onClick={handleGuardar}
          className={`sm:absolute    ${Editar? "border-2 border-primary text-primary hover:bg-blue-200" : "bg-primary text-white hover:bg-primary-strong" }  cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          type="button"
        >
          {Editar ? "Guardar cambios" : "Editar perfil"}
        </button>
        {Editar && (
          <button
            onClick={handleCancelar}
            className={`sm:absolute top-20  ${Editar? "border-2 border-background bg-red-600 text-white hover:bg-red-500" : "bg-red-600 text-white hover:bg-primary-strong" }  cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            type="button"
          >
            Cancelar
          </button>
        )}
      </>

      {/* <button onClick={Editar ? handleGuardar : () => setEditar(true)}>
          {Editar ? "Guardar cambios" : "Editar perfil"}
        </button>

        {Editar && (
          <button onClick={handleCancelar}>
            Cancelar
          </button>
        )} */}


      <div className='flex'>
      <DatosInfo
        img={userInfo.userData?.img || "/user/img_usuario.png"}
        rol={userInfo.role}
        editable={Editar}
        formData={formData}
        setFormData={setFormData}
      />


      </div>

      {/* descripcion y cifras */}
      <div className='flex lg:flex-row flex-col mt-5'>

        {/* descripcion */}
        <div className='flex flex-col w-full lg:w-1/2 mt-5 lg:mt-0'>
          <h2 className="text-2xl font-bold">Descripción</h2>
          {/* <p className='bg-detail text-text-secondary mt-5 p-5 lg:mr-30 rounded-2xl '>{userInfo.userData?.descripcion_viajero || "Aquí puedes ingresar una pequeña descripcion para enriqueser tu perfil....."}</p> */}
          {Editar ? (
            <textarea
              value={formData.descripcion || ""}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="bg-detail text-text-secondary mt-5 p-5 lg:mr-30 rounded-2xl "
            />
          ) : (
            <p className='bg-detail text-text-secondary mt-5 p-5 lg:mr-30 rounded-2xl '>
              {userInfo.userData?.descripcion || "Aquí puedes ingresar una pequeña descripcion para enriquecer tu perfil....."}
            </p>
          )}
        </div>

        <div className='flex flex-col w-full lg:w-1/2 mt-5 lg:mt-0'>
          
          <h2 className="text-2xl font-bold mb-5">Cifras de Usuario</h2>
          {/* cards de cifras */}
          <div className='flex flex-col md:flex-row gap-5'>
            <Card 
              title="Total de ventas" 
              value="$12,345" 
              className="border-l-4 border-primary" 
            />
            <Card 
              title="Total de ventas" 
              value="$12,345" 
              className="border-l-4 border-primary" 
            />
            <Card 
              title="Total de ventas" 
              value="$12,345" 
              className="border-l-4 border-primary" 
            />
          </div>

          {/* boton de reporte */}
          <div className='flex justify-start mt-5'>
            <button 
              className="text-white bg-primary cursor-pointer hover:bg-primary-strong focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
            >
              Generar reporte de usaurio
            </button>
          </div>

        </div>

      </div>

      <PerfilAtributos 
        atributos={userInfo.atributos || []}
        isOpen={modalAbierto}
        onClose={toggleModal}
      />

      <div className="mt-8">

        <div className='flex items-center justify-between mb-10'>
          <h2 className="text-2xl font-bold">Mis Preferencias</h2>
          <button 
            onClick={toggleModal}
            className="text-white bg-primary cursor-pointer hover:bg-primary-strong focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
          >
            Ver mis preferencias
          </button>
        </div>

        {(userInfo.atributos ?? []).length > 0 ? (
          <AtributosCarousel atributos={userInfo.atributos ?? []} />
        ) : (
          <p className="text-gray-500">No hay preferencias registradas</p>
        )}
      </div>

    </div>
  );
};

export default Perfil;