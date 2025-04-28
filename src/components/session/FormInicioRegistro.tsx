"use client";
import React, { useState } from "react";
import TermsModal from "./notificacion/Terminos";
import PrivacyModal from "./notificacion/Privacidad";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface FormData {
  nombre_viajero: string;
  correo_viajero: string;
  pass_viajero: string;
  sexo_viajero: string;
  fecha_nacimiento_viajero: string;
  telefono_viajero: string;
}

const FormInicioRegistro = () => {
  const router = useRouter();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [form, setForm] = useState<FormData>({
    nombre_viajero: "",
    correo_viajero: "",
    pass_viajero: "",
    sexo_viajero: "",
    fecha_nacimiento_viajero: "",
    telefono_viajero: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_BACK}/auth/registro-usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Registro exitoso de Usuario:", data);
        // Guardar token en cookies
        Cookies.set('token', data.token);
        // Redirigir
          router.push('/session/Acceso/Preferencia');
      } else {
        const errorData = await response.json();
        console.error("Error en el registro:", errorData.message);
        // Mostrar el error en UI
        alert("Error en el registro: " + errorData.message);
      }
    }
    catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Regístrate Usuario</h2>

      <div className="flex gap-2 mb-4">
        <button className="w-full border-text border flex items-center justify-center gap-2 bg-detail py-2 px-4 rounded hover:bg-gray-700">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Iniciar sesión con Google
        </button>
        <button className="w-full border-text border flex items-center justify-center gap-2 bg-detail py-2 px-4 rounded hover:bg-gray-700">
          <svg className="w-10 h-10 text-text fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
          </svg>
          Iniciar sesión con Facebook
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <hr className="w-full border-gray-700" />
        <span className="text-sm text-gray-400 px-2">o</span>
        <hr className="w-full border-gray-700" />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm mb-1" htmlFor="nombre_viajero">Nombre</label>
        <input
          type="text"
          name="nombre_viajero"
          id="nombre_viajero"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="Tu nombre"
          value={form.nombre_viajero}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="correo_viajero">Correo</label>
        <input
          type="email"
          name="correo_viajero"
          id="correo_viajero"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="name@correo.com"
          value={form.correo_viajero}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="pass_viajero">Contraseña</label>
        <input
          type="password"
          name="pass_viajero"
          id="pass_viajero"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          value={form.pass_viajero}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="sexo">Sexo</label>
        <select
          name="sexo"
          id="sexo_viajero"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          value={form.sexo_viajero}
          onChange={handleChange}
          required
        >
          <option value="" disabled >Selecciona tu sexo</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="otro">Otro</option>
        </select>

        <label className="block text-sm mb-1" htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          id="fecha_nacimiento_viajero"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          value={form.fecha_nacimiento_viajero}
          onChange={handleChange}
          min="1900-01-01"
          max={new Date().toISOString().split('T')[0]}
          required
        />

        <label className="block text-sm mb-1" htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          id="telefono_viajero"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="10 dígitos"
          value={form.telefono_viajero}
          onChange={handleChange}
          required
        />

        <div className="flex items-start mb-4">
          <input
            id="terms"
            type="checkbox"
            name="acceptTerms"
            // onChange={handleChange}
            className="mr-2 mt-1"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            Al registrarte, aceptas los{" "}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="underline text-blue-600 hover:text-blue-800 text-sm"
            >
              Términos de uso
            </button>{" "}
            y{" "}
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="underline text-blue-600 hover:text-blue-800 text-sm"
            >
              Política de privacidad
            </button>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Crear cuenta
        </button>
      </form>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
};

export default FormInicioRegistro;
