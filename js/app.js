
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