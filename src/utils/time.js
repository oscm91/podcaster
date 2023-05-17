export const time = (ms) => {
  // Calcula las horas, minutos y segundos a partir de los milisegundos proporcionados
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor(((ms % 3600000) % 60000) / 1000);

  // Determina el formato de resultado dependiendo de si hay horas o no
  const result = hours !== 0 ? [hours, mins, secs] : [mins, secs];

  // Formatea cada unidad de tiempo con ceros a la izquierda y las une con ":"
  return result.map((unit) => String(unit).padStart(2, "0")).join(":");
};
