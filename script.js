
let catalogoPeliculas = [];


async function cargarPeliculas() {

    try {

        const respuesta = await fetch("peliculas.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el catálogo");
        }

        catalogoPeliculas = await respuesta.json();

    } catch (error) {

        document.getElementById("peliculas").innerHTML =
            '<p class="mensaje">Error al cargar las películas. Revisa el archivo JSON.</p>';

        console.error(error);
    }
}



function recomendarPeliculas() {

    const campoEdad = document.getElementById("edad");
    const edad = Number(campoEdad.value);

    const genero = document.getElementById("genero").value;

    const contenedor = document.getElementById("peliculas");


    if (
        campoEdad.value === "" ||
        !Number.isInteger(edad) ||
        edad < 1 ||
        edad > 120
    ) {

        contenedor.innerHTML =
            '<p class="mensaje">Por favor, introduce una edad válida.</p>';

        return;
    }



    const recomendadas = catalogoPeliculas.filter(pelicula => {

        const edadPermitida = edad >= pelicula.edadMinima;

        const generoCoincide =
            genero === "" || pelicula.genero === genero;

        return edadPermitida && generoCoincide;

    });


    contenedor.innerHTML = "";



    if (recomendadas.length === 0) {

        contenedor.innerHTML =
            '<p class="mensaje">No encontramos películas para estos filtros. Intenta seleccionar otro género.</p>';

        return;
    }



    recomendadas.forEach(pelicula => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta";



        const imagen = document.createElement("img");

        imagen.src = pelicula.imagen;

        imagen.alt = pelicula.titulo;

        imagen.onerror = function() {
            this.style.display = "none";
        };


        const contenido = document.createElement("div");

        contenido.className = "contenido";



        const titulo = document.createElement("h3");

        titulo.textContent = pelicula.titulo;



        const descripcion = document.createElement("p");

        descripcion.textContent = pelicula.descripcion;


        // GÉNERO

        const generoTexto = document.createElement("p");

        generoTexto.textContent = " Género: " + pelicula.genero;


        const edadTexto = document.createElement("p");

        edadTexto.textContent =
            " Edad mínima: " + pelicula.edadMinima + " años";



        const clasificacion = document.createElement("span");

        clasificacion.className = "clasificacion";

        clasificacion.textContent =
            "Clasificación: " + pelicula.clasificacion;



        contenido.append(
            titulo,
            descripcion,
            generoTexto,
            edadTexto,
            clasificacion
        );

        tarjeta.append(imagen, contenido);

        contenedor.appendChild(tarjeta);

    });

}


cargarPeliculas();
