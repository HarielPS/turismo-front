export function getEstadoYHoraCierre(
  horarios: any[],
  fecha: { inicio: string; fin: string } | null
): { status: 'Abierto' | 'Cerrado'; closingTime: string | "Hoy no hay horario" } {
  const hoy = new Date();
  const opciones: Intl.DateTimeFormatOptions = { timeZone: 'America/Mexico_City', weekday: 'long' };
  const diaHoy = hoy.toLocaleDateString('es-MX', opciones).toLowerCase(); // ej: "lunes"
  const diaCapitalizado = diaHoy.charAt(0).toUpperCase() + diaHoy.slice(1); // "Lunes"

  // Función para comparar fechas tipo MM/DD
  const hoy_mmdd = `${(hoy.getMonth() + 1).toString().padStart(2, '0')}/${hoy.getDate().toString().padStart(2, '0')}`;

  const estaEnRangoFestivo = (fecha?: { inicio: string; fin: string }) => {
    if (!fecha) return false;
    return hoy_mmdd >= fecha.inicio && hoy_mmdd <= fecha.fin;
  };

  // 1. Si hay festivo y está en rango, usarlo
  if (horarios && horarios.length) {
    const festivo = horarios.find((h) => h.dia === 'Festivo');
    if (festivo && estaEnRangoFestivo(fecha ?? undefined)) {
      if (festivo.apertura === 'Cerrado') {
        return { status: 'Cerrado', closingTime: 'Hoy no hay horario' };
      }
      return { status: 'Abierto', closingTime: festivo.cierre };
    }

    // 2. Buscar el día normal de la semana
    const horarioDia = horarios.find((h) => h.dia === diaCapitalizado);
    if (horarioDia) {
      if (horarioDia.apertura === 'Cerrado') {
        return { status: 'Cerrado', closingTime: 'Hoy no hay horario' };
      }
      return { status: 'Abierto', closingTime: horarioDia.cierre };
    }
  }

  // 3. No hay horario disponible para hoy
  return { status: 'Cerrado', closingTime: 'Hoy no hay horario' };
}