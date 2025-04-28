"use client";
import React, { useState } from "react";
import TermsModal from "./notificacion/Terminos";
import PrivacyModal from "./notificacion/Privacidad";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProveedorFormData {
  nombre_proveedor: string;
  correo_proveedor: string;
  pass_proveedor: string;
  telefono_proveedor: string;
  direccion_proveedor: string;
  persona_contacto_proveedor: string;
  tipo_persona_proveedor: 'Física' | 'Moral';
}

const FormInicioRegistroProveedor = () => {
  const router = useRouter();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const [form, setForm] = useState<ProveedorFormData>({
    nombre_proveedor: "",
    correo_proveedor: "",
    pass_proveedor: "",
    telefono_proveedor: "",
    direccion_proveedor: "",
    persona_contacto_proveedor: "",
    tipo_persona_proveedor: "Física",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleTipoPersona = () => {
    setForm((prev) => ({
      ...prev,
      tipo_persona_proveedor: prev.tipo_persona_proveedor === "Física" ? "Moral" : "Física",
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_BACK}/auth/register-proveedor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Registro exitoso de provedor:", data);
          // Guardar token en cookies
          Cookies.set('token', data.token);
          // Redirigir
            router.push('/Proveedor');
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
      <h2 className="text-2xl font-bold mb-6">Regístrate como Proveedor</h2>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm mb-1" htmlFor="nombre_proveedor">Nombre de la empresa</label>
        <input
          type="text"
          name="nombre_proveedor"
          id="nombre_proveedor"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="Nombre comercial"
          value={form.nombre_proveedor}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="correo_proveedor">Correo electrónico</label>
        <input
          type="email"
          name="correo_proveedor"
          id="correo_proveedor"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="correo@ejemplo.com"
          value={form.correo_proveedor}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="pass_proveedor">Contraseña</label>
        <input
          type="password"
          name="pass_proveedor"
          id="pass_proveedor"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="********"
          value={form.pass_proveedor}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="telefono_proveedor">Teléfono</label>
        <input
          type="tel"
          name="telefono_proveedor"
          id="telefono_proveedor"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="10 dígitos"
          value={form.telefono_proveedor}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="direccion_proveedor">Dirección</label>
        <input
          type="text"
          name="direccion_proveedor"
          id="direccion_proveedor"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="Ubicación física"
          value={form.direccion_proveedor}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1" htmlFor="persona_contacto">Persona de contacto</label>
        <input
          type="text"
          name="persona_contacto_proveedor"
          id="persona_contacto_proveedor"
          className="w-full p-2 rounded bg-detail border border-text text-text mb-4"
          placeholder="Representante o encargado"
          value={form.persona_contacto_proveedor}
          onChange={handleChange}
          required
        />

        <label className="block text-sm mb-1">Tipo de persona</label>
        <div className="flex items-center justify-between bg-detail border border-text text-text rounded mb-4 p-2">
          <span>{form.tipo_persona_proveedor}</span>
          <button
            type="button"
            onClick={toggleTipoPersona}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Cambiar a {form.tipo_persona_proveedor === "Física" ? "Moral" : "Física"}
          </button>
        </div>

        <div className="flex items-start mb-4">
          <input
            id="terms"
            type="checkbox"
            name="acceptTerms"
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

export default FormInicioRegistroProveedor;
