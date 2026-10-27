/*
  CONFIGURACIÓN: 7 categorías, 6 candidatos en cada una.
  Cambiá nombre, imagen y puntos libremente. El máximo sugerido es 6.
  Si tus imágenes se llaman .png, cambiá la extensión en las rutas.
  Las fotos deben existir en esas carpetas para verse.
*/
const categorias = [
  {
    titulo: "FUERZA",
    candidatos: [
      { nombre: "orsted", imagen: "imagenes/fuerza/6.jpeg", puntos: 6 },
      { nombre: "atofe", imagen: "imagenes/fuerza/5.jpeg", puntos: 5 },
      { nombre: "ruijerd", imagen: "imagenes/fuerza/4.jpeg", puntos: 4 },
      { nombre: "ghislaine", imagen: "imagenes/fuerza/3.jpeg", puntos: 3 },
      { nombre: "eris", imagen: "imagenes/fuerza/2.jpeg", puntos: 2 },
      { nombre: "nokopara", imagen: "imagenes/fuerza/1.jpeg", puntos: 1 }
    ]
  },
  {
    titulo: "RASGO DE MAGIA",
    candidatos: [
      { nombre: "Candidato 1", imagen: "imagenes/magia/1.jpeg", puntos: 6 },
      { nombre: "Candidato 2", imagen: "imagenes/magia/2.jpeg", puntos: 5 },
      { nombre: "Candidato 3", imagen: "imagenes/magia/3.jpeg", puntos: 4 },
      { nombre: "Candidato 4", imagen: "imagenes/magia/4.jpeg", puntos: 3 },
      { nombre: "Candidato 5", imagen: "imagenes/magia/5.jpeg", puntos: 2 },
      { nombre: "Candidato 6", imagen: "imagenes/magia/6.jpeg", puntos: 1 }
    ]
  },
  {
    titulo: "CUERPO A CUERPO",
    candidatos: [
      { nombre: "Candidato 1", imagen: "imagenes/cuerpo/1.jpeg", puntos: 6 },
      { nombre: "Candidato 2", imagen: "imagenes/cuerpo/2.jpeg", puntos: 5 },
      { nombre: "Candidato 3", imagen: "imagenes/cuerpo/3.jpeg", puntos: 4 },
      { nombre: "Candidato 4", imagen: "imagenes/cuerpo/4.jpeg", puntos: 3 },
      { nombre: "Candidato 5", imagen: "imagenes/cuerpo/5.jpeg", puntos: 2 },
      { nombre: "Candidato 6", imagen: "imagenes/cuerpo/6.jpeg", puntos: 1 }
    ]
  },
  {
    titulo: "RAZA",
    candidatos: [
      { nombre: "perugius", imagen: "imagenes/raza/1.jpeg", puntos: 7 },
      { nombre: "atofe", imagen: "imagenes/raza/2.jpeg", puntos: 6 },
      { nombre: "ruijerd", imagen: "imagenes/raza/3.jpeg", puntos: 5 },
      { nombre: "sylvaril", imagen: "imagenes/raza/4.jpeg", puntos: 4 },
      { nombre: "gyes", imagen: "imagenes/raza/5.jpeg", puntos: 3 },
      { nombre: "rudeus", imagen: "imagenes/raza/6.jpeg", puntos: 2 },
      { nombre: "elinalise", imagen: "imagenes/raza/7.jpeg", puntos: 1 }
    ]
  },
  {
    titulo: "CRIATURA",
    candidatos: [
      { nombre: "hydra", imagen: "imagenes/criatura/1.jpeg", puntos: 6 },
      { nombre: "dragon rojo", imagen: "imagenes/criatura/2.jpeg", puntos: 5 },
      { nombre: "cobra de capucha", imagen: "imagenes/criatura/3.jpeg", puntos: 4 },
      { nombre: "leo", imagen: "imagenes/criatura/4.jpeg", puntos: 3 },
      { nombre: "osos grizzly", imagen: "imagenes/criatura/5.jpeg", puntos: 2 },
      { nombre: "tarantula del camino de la muerte", imagen: "imagenes/criatura/6.jpeg", puntos: 1 }
    ]
  },
  {
    titulo: "CI EN BATALLA",
    candidatos: [
      { nombre: "orsted", imagen: "imagenes/CI-de-batalla/1.jpeg", puntos: 6 },
      { nombre: "rudeus", imagen: "imagenes/CI-de-batalla/2.jpeg", puntos: 5 },
      { nombre: "paul", imagen: "imagenes/CI-de-batalla/3.jpeg", puntos: 4 },
      { nombre: "soldat", imagen: "imagenes/CI-de-batalla/4.jpeg", puntos: 3 },
      { nombre: "geese", imagen: "imagenes/CI-de-batalla/5.jpeg", puntos: 2 },
      { nombre: "cliff", imagen: "imagenes/CI-de-batalla/6.jpeg", puntos: 1 }
    ]
  },
  {
    titulo: "VILLANO",
    candidatos: [
      { nombre: "hitogami", imagen: "imagenes/villano/1.jpeg", puntos: 6 },
      { nombre: "laplace", imagen: "imagenes/villano/2.jpeg", puntos: 5 },
      { nombre: "atofe", imagen: "imagenes/villano/3.jpeg", puntos: 4 },
      { nombre: "pax", imagen: "imagenes/villano/4.jpeg", puntos: 3 },
      { nombre: "soldat", imagen: "imagenes/villano/5.jpeg", puntos: 2 },
      { nombre: "geese", imagen: "imagenes/villano/6.jpeg", puntos: 1 }
    ]
  }
];

// La ruleta dura 1 segundo, con cambios instantáneos cada 100 ms.
const DURACION_RULETA = 1000;
const VELOCIDAD_RULETA = 100;
const CLAVE_RANKING = "tapone-ranking-v1";
let seleccionados = [];
let actuales = [];
let girando = false;
let intervaloRuleta = null;
let finRuleta = null;
let tokenRonda = 0;

function mostrarPantalla(id) {
  ["inicio", "menu", "seccionPersonajes", "pantallaResultado"].forEach(nombre => {
    document.getElementById(nombre).hidden = nombre !== id;
  });
}

function mostrarMenu() {
  detenerRuleta();
  document.body.classList.remove("fondo-personajes");
  document.body.classList.add("con-fondo");
  mostrarPantalla("menu");
  const menu = document.getElementById("menu");
  menu.classList.remove("visible");
  void menu.offsetWidth;
  menu.classList.add("visible");
}

function volverMenu() { mostrarMenu(); }
function seleccionar(opcion) { alert("Seleccionaste: " + opcion); }

function abrirPersonajes() {
  document.body.classList.remove("con-fondo");
  document.body.classList.add("fondo-personajes");
  mostrarPantalla("seccionPersonajes");
  reiniciarPartida();
}

function reiniciarPartida() {
  detenerRuleta();
  seleccionados = categorias.map(() => null);
  actuales = categorias.map(() => null);
  document.body.classList.remove("con-fondo");
  document.body.classList.add("fondo-personajes");
  mostrarPantalla("seccionPersonajes");
  construirTarjetas();
  sortearSinAnimacion();
  actualizarEstado("Elegí una tarjeta para empezar");
}

function construirTarjetas() {
  const rejilla = document.getElementById("rejillaPersonajes");
  rejilla.replaceChildren();
  categorias.forEach((categoria, indice) => {
    const envoltura = document.createElement("div");
    envoltura.className = "tarjeta-personaje";
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "personaje";
    boton.id = "botonPersonaje" + indice;
    boton.setAttribute("aria-label", "Elegir " + categoria.titulo);
    boton.addEventListener("click", () => fijarPersonaje(indice));
    const img = document.createElement("img");
    img.id = "imagenPersonaje" + indice;
    img.alt = "Imagen de " + categoria.titulo;
    const titulo = document.createElement("span");
    titulo.textContent = categoria.titulo;
    boton.append(img, titulo);
    envoltura.appendChild(boton);
    rejilla.appendChild(envoltura);
  });
}

function candidatoAleatorio(indice) {
  const opciones = categorias[indice].candidatos;
  if (!opciones.length) return null;
  // Si hay varias opciones, evitar repetir la misma de la ronda anterior.
  const anterior = actuales[indice];
  const disponibles = opciones.length > 1 ? opciones.filter(item => item !== anterior) : opciones;
  return disponibles[Math.floor(Math.random() * disponibles.length)];
}

function cambiarImagen(indice) {
  if (seleccionados[indice]) return;
  const candidato = candidatoAleatorio(indice);
  actuales[indice] = candidato;
  const img = document.getElementById("imagenPersonaje" + indice);
  if (!img) return;
  if (candidato) {
    img.src = candidato.imagen;
    img.alt = candidato.nombre;
  } else {
    img.removeAttribute("src");
  }
}

function sortearSinAnimacion() {
  categorias.forEach((_, indice) => cambiarImagen(indice));
}

function actualizarEstado(mensaje) {
  document.getElementById("contador").textContent = "Elegidos: " + seleccionados.filter(Boolean).length + "/" + categorias.length;
  document.getElementById("mensajeRonda").textContent = mensaje;
}

function fijarPersonaje(indice) {
  if (girando || seleccionados[indice] || !actuales[indice]) return;
  seleccionados[indice] = actuales[indice];
  const boton = document.getElementById("botonPersonaje" + indice);
  boton.classList.add("seleccionado");
  boton.setAttribute("aria-label", categorias[indice].titulo + " seleccionada: " + actuales[indice].nombre);
  actualizarEstado("¡" + actuales[indice].nombre + " elegido!");
  if (seleccionados.every(Boolean)) {
    mostrarResultado();
  } else {
    iniciarRuleta();
  }
}

function detenerRuleta() {
  tokenRonda++;
  clearInterval(intervaloRuleta);
  clearTimeout(finRuleta);
  intervaloRuleta = null;
  finRuleta = null;
  girando = false;
  document.querySelectorAll(".personaje.rodando").forEach(boton => boton.classList.remove("rodando"));
}

function iniciarRuleta() {
  detenerRuleta();
  girando = true;
  const token = tokenRonda;
  actualizarEstado("Sorteando nuevas imágenes...");
  categorias.forEach((_, indice) => {
    if (!seleccionados[indice]) document.getElementById("botonPersonaje" + indice).classList.add("rodando");
  });
  sortearSinAnimacion();
  intervaloRuleta = setInterval(sortearSinAnimacion, VELOCIDAD_RULETA);
  finRuleta = setTimeout(() => {
    if (token !== tokenRonda) return;
    detenerRuleta();
    sortearSinAnimacion();
    actualizarEstado("Elegí otra tarjeta");
  }, DURACION_RULETA);
}

function leerRanking() {
  try {
    const valor = JSON.parse(localStorage.getItem(CLAVE_RANKING) || "[]");
    return Array.isArray(valor) ? valor.filter(x => Number.isFinite(x.puntos)).slice(0, 10) : [];
  } catch (_) { return []; }
}

function guardarRanking(puntos) {
  const ranking = leerRanking();
  ranking.push({ puntos, fecha: new Date().toLocaleDateString("es-AR") });
  ranking.sort((a, b) => b.puntos - a.puntos);
  const mejores = ranking.slice(0, 10);
  try { localStorage.setItem(CLAVE_RANKING, JSON.stringify(mejores)); } catch (_) {}
  return mejores;
}

function mostrarResultado() {
  detenerRuleta();
  const total = seleccionados.reduce((suma, personaje) => suma + personaje.puntos, 0);
  const maximo = categorias.reduce((suma, categoria) => suma + Math.max(...categoria.candidatos.map(c => c.puntos)), 0);
  document.getElementById("puntajeTotal").textContent = total + " / " + maximo;
  const resumen = document.getElementById("resumenElegidos");
  resumen.replaceChildren();
  seleccionados.forEach((personaje, indice) => {
    const item = document.createElement("div");
    item.className = "resultado-item";
    const img = document.createElement("img");
    img.src = personaje.imagen;
    img.alt = personaje.nombre;
    const titulo = document.createElement("strong");
    titulo.textContent = categorias[indice].titulo;
    const detalle = document.createElement("span");
    detalle.textContent = personaje.nombre + " · +" + personaje.puntos + " pts";
    item.append(img, titulo, detalle);
    resumen.appendChild(item);
  });
  const ranking = guardarRanking(total);
  const lista = document.getElementById("listaRanking");
  lista.replaceChildren();
  ranking.forEach(partida => {
    const li = document.createElement("li");
    li.textContent = partida.puntos + " puntos — " + partida.fecha;
    lista.appendChild(li);
  });
  mostrarPantalla("pantallaResultado");
}
