import superagent from 'superagent';

const apiUrl = 'https://randomuser.me/api/';

export const usuariosTodos = async () => {
  try {
    const respuesta = await superagent.get(apiUrl);
    const datos = respuesta.body.results;
    return datos

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    throw error; // Importante lanzar el error para manejarlo fuera de la función
  }
};