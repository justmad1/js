let dropzone = document.querySelector('.dropzone'),
    button = document.querySelector('.btn-large'),
    input = document.querySelector('input'),
    imageContainer = document.querySelector('.image-container'),
    progress = document.querySelector('.progress'),
    determinate = document.querySelector('.determinate'),
    files,
    f,
    i = 0,
    reader,
    count = 0,
    step = 0,
    currentValue = 0;

const MAX_COUNT = 12;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});

function initProgress (len) {
    progress.style.opacity = 100;
    step = 100 / len;
}

function incProgress () {
    currentValue += step;
    determinate.style.width = `${currentValue}%`;

    setTimeout(() => {
        determinate.style.width = "0%";
        progress.style.opacity = 0;
        step = 0;
        currentValue = 0;
    }, 3000);
}

function handleFile(e) {
    if (e.type == "drop") {
        files = e.dataTransfer.files;
    } else {
        files = e.target.files;
    }
    
    initProgress(files.length);
    for (;f = files[i]; i++) {
        reader = new FileReader();
        reader.onload = render(f);
        reader.readAsDataURL(f);
        count++;

        if (count >= MAX_COUNT) {
            button.classList.add('disabled');
            break;
        }
    }
    i = 0;
}

function render(theFile) {
    return function(e) {
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = [`<img src="${e.target.result}" />`].join('');
        div.querySelector('img').classList.add('materialboxed');
        let instance = M.Materialbox.init(div.querySelector('img'));
        document.querySelector('.image-container').appendChild(div);
        incProgress();
    };
}

dropzone.addEventListener('dragover', () => {
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', handleFile);

input.addEventListener('change', handleFile);