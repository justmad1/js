const myCanvas = document.querySelector('.myCanvas'),
    addButton = document.querySelector('.add'),
    deleteButton = document.querySelector('.delete'),
    clearButton = document.querySelector('.clear'),
    ctx = myCanvas.getContext("2d"),
    maxFigures = 10,
    colors = ['#229DBF', '#B2184C', '#FC7F5F', '#FAE7C9', '#6B2257', '#00582F', '#84908C', '#D3E1A4', '#521B32', '#1A1F35'],
    canvasWidth = 700,
    canvasHeight = 700,
    editSize = 15;

let figures = [],
    i = 0,

    mouse = {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        down: false
    },

    getRandomValue = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    fillRect = rect => {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    },

    strokeRect = rect => {
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.fillRect(rect.x - editSize / 2, rect.y - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x + rect.width - editSize / 2, rect.y - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x - editSize / 2, rect.y + rect.height - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x + rect.width - editSize / 2, rect.y + rect.height - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x + rect.width / 2 - editSize / 2, rect.y - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x - editSize / 2, rect.y + rect.height / 2 - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x + rect.width - editSize / 2, rect.y + rect.height / 2 - editSize / 2, editSize, editSize);
        ctx.fillRect(rect.x + rect.width / 2 - editSize / 2, rect.y + rect.height - editSize / 2, editSize, editSize);
    },

    Rect = function(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.selected = false;
        this.dragging = false;
        this.editing = 0;
        this.fill = () => {
            fillRect(this);
        }
        this.stroke = () => {
            strokeRect(this);
        }
    },

    cursorInRect = rect => {
        x = mouse.x;
        y = mouse.y;
        return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
    },

    cursorInEditingRect = rect => {
        if (mouse.x > rect.x - editSize / 2 && mouse.x < rect.x + editSize / 2 && mouse.y > rect.y - editSize / 2 && mouse.y < rect.y + editSize / 2) return 1;
        if (mouse.x > rect.x + rect.width / 2 - editSize / 2 && mouse.x < rect.x + rect.width / 2 + editSize / 2 && mouse.y > rect.y - editSize / 2 && mouse.y < rect.y + editSize / 2) return 2;
        if (mouse.x > rect.x + rect.width - editSize / 2 && mouse.x < rect.x + rect.width + editSize / 2 && mouse.y > rect.y - editSize / 2 && mouse.y < rect.y + editSize / 2) return 3;
        if (mouse.x > rect.x + rect.width - editSize / 2 && mouse.x < rect.x + rect.width + editSize / 2 && mouse.y > rect.y + rect.height / 2 - editSize / 2 && mouse.y < rect.y + rect.height / 2 + editSize / 2) return 4;
        if (mouse.x > rect.x + rect.width - editSize / 2 && mouse.x < rect.x + rect.width + editSize / 2 && mouse.y > rect.y + rect.height - editSize / 2 && mouse.y < rect.y + rect.height + editSize / 2) return 5;
        if (mouse.x > rect.x + rect.width / 2 - editSize / 2 && mouse.x < rect.x + rect.width / 2 + editSize / 2 && mouse.y > rect.y + rect.height - editSize / 2 && mouse.y < rect.y + rect.height + editSize / 2) return 6;
        if (mouse.x > rect.x - editSize / 2 && mouse.x < rect.x + editSize / 2 && mouse.y > rect.y + rect.height - editSize / 2 && mouse.y < rect.y + rect.height + editSize / 2) return 7;
        if (mouse.x > rect.x - editSize / 2 && mouse.x < rect.x + editSize / 2 && mouse.y > rect.y + rect.height / 2 - editSize / 2 && mouse.y < rect.y + rect.height / 2 + editSize / 2) return 8;
        return 0;
    },

    draw = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        figures.forEach(item => {
            ctx.fillStyle = item.color;

            item.fill();

            if (item.selected && !item.dragging) {
                item.stroke();
            }
            if (item.editing) {
                switch (item.editing) {
                    case 1:
                        mouse.dx = mouse.x - mouse.startX;
                        mouse.dy = mouse.y - mouse.startY;
                        item.x += mouse.dx;
                        item.y += mouse.dy;
                        item.width -= mouse.dx;
                        item.height -= mouse.dy;
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        break;
                    case 2:
                        mouse.dx = mouse.x - mouse.startX;
                        mouse.dy = mouse.y - mouse.startY;
                        item.y += mouse.dy;
                        item.height -= mouse.dy;
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        break;

                    case 3:
                        mouse.dx = mouse.x - mouse.startX;
                        mouse.dy = mouse.y - mouse.startY;
                        item.y += mouse.dy;
                        item.width += mouse.dx;
                        item.height -= mouse.dy;
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        break;

                    case 4:
                        mouse.dx = mouse.x - mouse.startX;
                        item.width += mouse.dx;
                        mouse.startX = mouse.x;
                        break;

                    case 5:
                        mouse.dx = mouse.x - mouse.startX;
                        mouse.dy = mouse.y - mouse.startY;
                        item.width += mouse.dx;
                        item.height += mouse.dy;
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        break;

                    case 6:
                        mouse.dy = mouse.y - mouse.startY;
                        item.height += mouse.dy;
                        mouse.startY = mouse.y;
                        break;

                    case 7:
                        mouse.dx = mouse.x - mouse.startX;
                        mouse.dy = mouse.y - mouse.startY;
                        item.x += mouse.dx;
                        item.width -= mouse.dx;
                        item.height += mouse.dy;
                        mouse.startX = mouse.x;
                        mouse.startY = mouse.y;
                        break;

                    case 8:
                        mouse.dx = mouse.x - mouse.startX;
                        item.x += mouse.dx;
                        item.width -= mouse.dx;
                        mouse.startX = mouse.x;
                        break;

                    case 0:
                        break;
                }

            } else
            if (item.selected && item.dragging && mouse.down) {
                mouse.dx = mouse.x - mouse.startX;
                mouse.dy = mouse.y - mouse.startY;
                item.x += mouse.dx;
                item.y += mouse.dy;
                mouse.startX = mouse.x;
                mouse.startY = mouse.y;
                item.stroke();
            }
        });
    },

    init = () => {
        myCanvas.width = canvasWidth;
        myCanvas.height = canvasHeight;
        setInterval(draw, 0);
    }

window.addEventListener('mousemove', () => {
    mouse.x = event.pageX - myCanvas.offsetLeft;
    mouse.y = event.pageY - myCanvas.offsetTop;
});

window.addEventListener('mousedown', () => {
    mouse.down = true;
    mouse.startX = mouse.x;
    mouse.startY = mouse.y;

    function unselectAll() {
        figures.forEach(item => {
            if (item.selected)
                item.selected = false;
        });
    }

    for (i = figures.length - 1; i >= 0; i--) {
        if (cursorInEditingRect(figures[i]))
            figures[i].editing = cursorInEditingRect(figures[i]);
        else
        if (cursorInRect(figures[i])) {
            unselectAll();
            figures.push(figures.splice(figures.indexOf(figures[i]), 1)[0]);
            figures[figures.length - 1].selected = true;
            figures[figures.length - 1].dragging = true;
            deleteButton.disabled = false;
            break;
        }
    }

});

window.addEventListener('mouseup', () => {
    mouse.down = false;
    if (figures.length) {
        figures[figures.length - 1].editing = false;
        figures[figures.length - 1].dragging = false;
    } 
});

deleteButton.addEventListener('click', () => {
    if (confirm("Удалить выбранный элемент?")) {
        figures.pop();
        deleteButton.disabled = true;
    }
});

addButton.addEventListener('click', () => {
    if (figures.length <= maxFigures) {
        figures.push(new Rect(getRandomValue(0, 400), getRandomValue(0, 400), getRandomValue(50, 300), getRandomValue(50, 300), colors[getRandomValue(0, 9)]));
    } else {
        alert("Холст переполнен!");
    }
});

clearButton.addEventListener('click', () => {
    if (confirm('Очистить холст?')) {
        figures = [];
        deleteButton.disabled = true;
    }
});

init();