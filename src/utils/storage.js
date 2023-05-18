const get = (key, defaultValue) => {
  // Obtiene los datos del almacenamiento local correspondientes a la clave especificada
  const localStorageData = localStorage.getItem(key);
  // Si los datos son nulos, devuelve el valor predeterminado, de lo contrario, los analiza como JSON y los devuelve
  if (localStorageData === null) {
    return defaultValue;
  } else {
    return JSON.parse(localStorageData);
  }
};

const set = (key, value) => {
  // Convierte el valor a JSON y lo almacena en el almacenamiento local utilizando la clave especificada
  const localStorageData = JSON.stringify(value);
  localStorage.setItem(key, localStorageData);
};

const remove = (key) => {
  // Elimina los datos del almacenamiento local correspondientes a la clave especificada
  localStorage.removeItem(key);
};

const clear = () => {
  // Elimina todos los datos del almacenamiento local
  localStorage.clear();
};

const storage = {
  get,
  set,
  remove,
  clear,
};

export default storage;
