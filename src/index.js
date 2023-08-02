const elementos = ["primera", "segunda", "tercera", "cuarta", "quinta", "sexta", "septima", "octava", "novena", "decima"];
const imagenes = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]; // Cambiamos las cadenas por números
const rutaImg = "./src/img/";

// Función para mezclar el array de elementos de forma aleatoria
function mezclarElementos(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
}

// Mezclar el array de elementos
const shuffledElementos = mezclarElementos(elementos);

// Crear un objeto que asocie cada elemento con una imagen del array mezclado
const elementoImagenes = {};
shuffledElementos.forEach((elemento, index) => {
    elementoImagenes[elemento] = rutaImg + imagenes[index] + ".jpg";
});

// Conjunto para almacenar los elementos clicados
const elementosClicados = new Set();

function verificarIguales(elemento1, elemento2) {
    const img1 = document.getElementById(elemento1);
    const img2 = document.getElementById(elemento2);

    // Comparar solo los números en las rutas de las imágenes
    const num1 = parseInt(img1.src.split("/").pop().split(".")[0], 10);
    const num2 = parseInt(img2.src.split("/").pop().split(".")[0], 10);

    return num1 === num2;
}
let canClick = true; // Variable para controlar el clic de imágenes durante el retraso

function cambiarImagen(id) {
    if (!canClick) return; // Evitar clics durante el retraso
    const img = document.getElementById(id);

    // Verificar el estado actual de la imagen y cambiarlo
    if (img.dataset.estado === "reversa") {
        img.src = elementoImagenes[id];
        img.dataset.estado = "normal";
    } else {
        img.src = rutaImg + "reverse.jpg";
        img.dataset.estado = "reversa";
    }

    // Agregar el elemento clicado al conjunto
    elementosClicados.add(id);

    // Verificar si hay dos elementos clicados y si sus imágenes son iguales
    if (elementosClicados.size === 2) {
        const [elemento1, elemento2] = elementosClicados;
        if (verificarIguales(elemento1, elemento2)) {
            const img1 = document.getElementById(elemento1);
            const img2 = document.getElementById(elemento2);

            img1.classList.add('coincidencia');
            img2.classList.add('coincidencia');

        } else {
            canClick = false; // Evitar clics durante el retraso
            setTimeout(() => {
                // Volver a colocar las imágenes en reversa después del retraso
                const img1 = document.getElementById(elemento1);
                const img2 = document.getElementById(elemento2);

                img1.src = rutaImg + "reverse.jpg";
                img1.dataset.estado = "reversa";
                img2.src = rutaImg + "reverse.jpg";
                img2.dataset.estado = "reversa";

                canClick = true; // Permitir clics nuevamente
            }, 1500); // Tiempo de retraso en milisegundos (1 segundo en este caso)
        }

        elementosClicados.clear(); // Limpiar el conjunto para el próximo par de clics
    }
}

// Agregar el evento 'click' para cada imagen del array 'elementos'
shuffledElementos.forEach((elemento) => {
    const imgElemento = document.getElementById(elemento);
    imgElemento.addEventListener('click', () => cambiarImagen(elemento));
});
