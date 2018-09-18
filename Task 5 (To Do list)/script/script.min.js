let inp = document.querySelector('.inp');
let ul = document.querySelector('.list');
let add = document.querySelector('.add');
let clear = document.querySelectorAll('.clear');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const storageData = JSON.parse(localStorage.getItem('items'));
let itemsCount = 0;

const liMaker = (data) => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    const text = document.createElement('span');
    const close = document.createElement('img');
    const edit = document.createElement('img');
    cb.type = "checkbox";
    text.innerHTML = data;
    text.classList.add("text");
    inp.value = "";
    li.className = "item";
    close.src = "media/close.png";
    close.className = "item-button close";
    edit.className = "item-button edit";
    edit.src = "media/edit.png";
    close.addEventListener('click', () => {
        if (confirm("Remove this item?")) {
            li.remove();
            itemsCount--;
            check();
            itemsArray.splice(itemsArray.indexOf(data), 1);
            localStorage.setItem('items', JSON.stringify(itemsArray));
        }
    });
    edit.addEventListener('click', () => {
        let input = prompt("Edit text here", text.innerHTML);
        text.innerHTML = input ? input : text.innerHTML;
        itemsArray.splice(itemsArray.indexOf(data), 1, text.innerHTML);
        localStorage.setItem('items', JSON.stringify(itemsArray));
    });

    text.addEventListener('click', event => {
        if (event.toElement != edit && event.toElement != close) {
            if (li.classList.length > 1) {
                li.classList.remove("checked");
                li.firstChild.checked = false;
            } else {
                li.classList.add("checked");
                li.firstChild.checked = true;
            }
        }
    });

    li.addEventListener('click', event => {
        if (event.toElement == li || event.toElement == cb) {
            if (li.classList.length > 1) {
                li.classList.remove("checked");
                li.firstChild.checked = false;
            } else {
                li.classList.add("checked");
                li.firstChild.checked = true;
            }
        }
    });

    li.appendChild(cb);
    li.appendChild(text);
    li.appendChild(edit);
    li.appendChild(close);
    ul.appendChild(li);
    itemsCount++;
    check();
    add.disabled = true;
}

function check() {
    if (!itemsCount) {
        clear.forEach((elem) => {
            elem.style.display = "none";
        });
    } else {
        clear.forEach((elem) => {
            elem.style.display = "inline";
        });
    }
}

inp.addEventListener('keyup', () => {
    if (!inp.value) {
        add.disabled = true;
    } else {
        add.disabled = false;
    }
});

add.addEventListener('click', () => {
    if (inp.value) {
        itemsArray.push(inp.value);
        liMaker(inp.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        inp.value = "";
    }
});

clear[0].addEventListener('click', () => {
    if (confirm("Clear all items?")) {
        ul.innerHTML = "";
        itemsCount = 0;
        check();
        localStorage.clear();
        itemsArray.splice(0, itemsArray.length);
    }
});

clear[1].addEventListener('click', () => {
    if (confirm("Clear selected items?")) {
        itemsArray.splice(0, itemsArray.length);
        document.querySelectorAll('.item').forEach((elem) => {
            if (elem.firstChild.checked) {
                elem.remove();
                itemsCount--;
            } else {
                itemsArray.push(elem.children[1].innerHTML);
            }
        });
        check();
        localStorage.setItem('items', JSON.stringify(itemsArray));
    }
});

storageData.forEach(item => {
    liMaker(item);
});