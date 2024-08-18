const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

async function loadMusicData() {
  try {
    const response = await fetch("resources/json/music.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const musics = await response.json();
    return musics;
  } catch (error) {
    console.error("Error loading music data:", error);
    return [];
  }
}

function getRandomMusic(musics) {
  const randomIndex = Math.floor(Math.random() * musics.length);
  console.log("Random Index:", randomIndex);
  return musics[randomIndex];
}

// Función para renderizar la música en el contenedor
async function renderMusic() {
  const musics = await loadMusicData();
  const music = getRandomMusic(musics);
  console.log("Selected Music:", music);
  const redirectSite = $(".redirect-site");

  // Crear el contenido de la música
  const musicLink = document.createElement("a");
  musicLink.className = "music-link";
  musicLink.textContent = music.name;
  musicLink.href = music.url;

  const musicAuthors = document.createElement("div");
  musicAuthors.className = "music-authors";

  music.authors.forEach((author) => {
    const authorLink = document.createElement("a");
    authorLink.textContent = author;
    musicAuthors.appendChild(authorLink);
    musicAuthors.appendChild(document.createTextNode(", "));
  });

  if (musicAuthors.lastChild) {
    musicAuthors.removeChild(musicAuthors.lastChild);
  }

  redirectSite.innerHTML = "";

  redirectSite.appendChild(musicLink);
  redirectSite.appendChild(musicAuthors);
}

document.addEventListener("DOMContentLoaded", renderMusic);
