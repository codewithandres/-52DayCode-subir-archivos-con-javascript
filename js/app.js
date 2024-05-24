
const dropArea = document.querySelector('.drag-area');
const dragText = dropArea.querySelector('h2');
const buttom = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');

let files;

buttom.addEventListener('click', event => input.click());

input.addEventListener('change', event => {
    files = this.files;

    dropArea.classList.add('active');
    showFile();
    dropArea.classList.remove('active')
});

//eventos drag and drop 
dropArea.addEventListener('dragover', event => {
    event.preventDefault();

    dropArea.classList.add('active');
    dropArea.textContent = 'Suelta para subir los archivos';
});

dropArea.addEventListener('dragleave', event => {
    event.preventDefault();

    dropArea.classList.remove('active');
    dropArea.textContent = 'Arrasta y suelta la imagen';
});

dropArea.addEventListener('drop', event => {
    event.preventDefault();

    files = event.dataTransfer.files;
    showFile(files);

    dropArea.classList.add('active');
    dropArea.textContent = 'Suelta para subir los archivos';
});

const showFile = files => {
    if (files.length === undefined) {
        procesFile(files)
    } else {

        for (const file of files) {
            procesFile(file)
        };
    };
};

const procesFile = file => {
    const docType = file.type;
    const validExtencion = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtencion.includes(docType)) {
        //archivo valido
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`

        fileReader.addEventListener('load', event => {
            const fileUrl = fileReader.result;

            const img = `<div id="${id} class="fill-container">
                <img src="${fileUrl}" alt ="${file.name}" width="50"/>
                <div class="status">
                    <span>${file.name}</span>
                    <span class="status-text"> louding... </span>
                </div>
            </div>`;
            const html = document.querySelector('#preview').innerHTML;
            document.querySelector('#preview').innerHTML = img + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    } else {
        //archivo no valido
        alert('archivo no valido')
    };
};

const uploadFile = async file => {
    const formData = new FormData();

    formData.append('file', file);
    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        const responseText = await response.text();
        console.log(responseText);

        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="sucsses">Archivo subido correctamente 😊</span>`;
    } catch (error) {
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="failure">Opps ocurrio un error al subir 😥</span>`;

    }
};