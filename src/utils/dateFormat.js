export const dateFormat = (date) => {
  // Crea un nuevo objeto de fecha a partir de la cadena de fecha proporcionada
  const clearDate = new Date(date);

  // Formatea y devuelve la fecha en el formato "dd/mm/yyyy"
  return `${clearDate.getDate()}/${
    clearDate.getMonth() + 1
  }/${clearDate.getFullYear()}`;
};
