// Selecciona el área de arrastre y los elementos dentro de ella
const dropArea = document.querySelector('.drag-area');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');

// Variable para almacenar los archivos seleccionados
let files;

// Evento para simular un clic en el input cuando se presiona el botón
button.addEventListener('click', event => input.click());

// Evento que se dispara cuando los archivos son seleccionados a través del input
input.addEventListener('change', event => {
    files = event.target.files; // Almacena los archivos seleccionados

    dropArea.classList.add('active'); // Añade la clase 'active' para estilos visuales
    showFile(); // Llama a la función para mostrar los archivos
    dropArea.classList.remove('active'); // Remueve la clase 'active' después de mostrar los archivos
});

// Eventos de arrastrar y soltar
dropArea.addEventListener('dragover', event => {
    event.preventDefault(); // Previene el comportamiento por defecto

    dropArea.classList.add('active'); // Añade la clase 'active' para estilos visuales
    dragText.textContent = 'Suelta para subir los archivos'; // Cambia el texto
});

dropArea.addEventListener('dragleave', event => {
    event.preventDefault(); // Previene el comportamiento por defecto

    dropArea.classList.remove('active'); // Remueve la clase 'active'
    dragText.textContent = 'Arrastra y suelta la imagen'; // Restablece el texto original
});

dropArea.addEventListener('drop', event => {
    event.preventDefault(); // Previene el comportamiento por defecto

    files = event.dataTransfer.files; // Almacena los archivos arrastrados
    showFile(files); // Llama a la función para mostrar los archivos

    dropArea.classList.add('active'); // Añade la clase 'active' para estilos visuales
    dragText.textContent = 'Suelta para subir los archivos'; // Cambia el texto
});

// Función para mostrar los archivos seleccionados o arrastrados
const showFile = files => {
    if (files.length === undefined) {
        processFile(files); // Procesa un solo archivo
    } else {
        for (const file of files) { // Itera sobre múltiples archivos
            processFile(file); // Procesa cada archivo
        };
    };
};

// Función para procesar cada archivo
const processFile = file => {
    const docType = file.type; // Obtiene el tipo de archivo
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']; // Extensiones válidas

    if (validExtensions.includes(docType)) {
        // Si el archivo es válido
        const fileReader = new FileReader(); // Crea un nuevo FileReader
        const id = `file-${Math.random().toString(32).substring(7)}`; // Genera un ID único

        fileReader.addEventListener('load', event => {
            const fileUrl = fileReader.result; // Obtiene la URL del archivo

            // Crea un elemento HTML para mostrar la imagen y el estado de carga
            const img = `<div id="${id}" class="file-container">
                <img src="${fileUrl}" alt ="${file.name}" width="50"/>
                <div class="status">
                    <span>${file.name}</span>
                    <span class="status-text">Cargando...</span>
                </div>
            </div>`;
            const html = document.querySelector('#preview').innerHTML; // Obtiene el HTML actual
            document.querySelector('#preview').innerHTML = img + html; // Añade la nueva imagen al HTML
        });

        fileReader.readAsDataURL(file); // Lee el archivo como URL de datos
        uploadFile(file, id); // Llama a la función para subir el archivo
    } else {
        // Si el archivo no es válido
        alert('Archivo no válido'); // Muestra una alerta
    };
};

// Función asíncrona para subir el archivo
const uploadFile = async (file, id) => {
    const formData = new FormData(); // Crea un nuevo FormData

    formData.append('file', file); // Añade el archivo al FormData
    try {
        // Intenta hacer la petición POST para subir el archivo
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        const responseText = await response.text(); // Obtiene la respuesta como texto
        console.log(responseText); // Muestra la respuesta en la consola

        // Actualiza el estado de carga a 'subido correctamente'
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="success">Archivo subido correctamente 😊</span>`;
    } catch (error) {
        // Si ocurre un error durante la carga
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="failure">Oops, ocurrió un error al subir 😥</span>`;
    }
};
