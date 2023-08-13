import { usuariosTodos } from './api/superagent';
import './style.css'


document.querySelector('#app').innerHTML = `

      <button id="btnMostrarLikes" class="btn btn-info position-fixed top-2 end-0 m-3">Mis Likes</button>
      <div>
        <h2 class="d-flex justify-content-center p-3">TIN USERS</h2>
      </div>
      <div class="ocultar" id="likesContenedor">
        <button class="btn btn-danger position-fixed top-0 end-0 m-3" id="vaciarLikes">Borrar todo</button>
        <div id="misLikes" class="likesVisibility"></div>
      </div>
      <div id="resultado" class="d-flex flex-wrap"></div>
`
const divResultado = document.querySelector('#resultado');
const mostrarLikes = document.querySelector('#misLikes');
const btnMostrarLikes = document.querySelector('#btnMostrarLikes');
const btnVaciarLikes = document.querySelector('#vaciarLikes');

window.addEventListener('load', () => {
  mostrarTarjeta()
})

const mostrarTarjeta = async () => {
  const usuarioRandom = await usuariosTodos()

  divResultado.innerHTML = ''; //limpia el html cada ves que se llama la funcion

  usuarioRandom.map(us => {
    const user = document.createElement('div');
    user.innerHTML = `
    <div id="card" class="card m-2 tarjeta-persona">
    <img src="${us.picture.large}" class="card-img-top" alt="user">
      <div class="card-body">
        <h3 class="card-title text-center">${us.name.first} ${us.name.last}</h3>
        <h4 class="text-center">Edad: ${us.dob.age}</h4>
        <p class="card-text">Localidad: ${us.location.city}, ${us.location.country}</p>
        <p class="card-text">Género: ${us.gender}</p>
      </div>
      <div class="d-flex justify-content-center p-3">
        <button id="negativo" class="btn btn-danger m-2">NO :(</button>
        <button id="positivo" class="btn btn-success m-2">SI :)</button>
      </div>
    </div>
   `;
    divResultado.appendChild(user);

    const noLike = document.querySelector('#negativo');
    const like = document.querySelector('#positivo');
    like.addEventListener('click', async () => {
      adjuntarLikes(us);
      mostrarTarjeta();
    });
    noLike.addEventListener('click', mostrarTarjeta);
  })
}

const adjuntarLikes = (us) => {
  const user = document.createElement('div');
  user.innerHTML = `
  <div>
  <img src="${us.picture.large}" class="card-img-top" alt="user">
    <div class="card-body">
      <p class="card-title text-center text-xs">${us.name.first} ${us.name.last}</p>
    </div>
  </div>
 `;
  user.classList.add('card', 'miniatura')
  mostrarLikes.appendChild(user);

}


const fnOcultarLikes = ()=>{
  const likesContenedor = document.querySelector('#likesContenedor');
  likesContenedor.classList.toggle('ocultar')
}
btnMostrarLikes.addEventListener('click', fnOcultarLikes);

btnVaciarLikes.addEventListener('click', ()=>{
  mostrarLikes.textContent = ""
  fnOcultarLikes();
})