window.onload = () => {
    let count = 0;
    const artist = 'Rammstein',
        list = document.querySelector('.list'),
        slider = document.querySelector('.slider');
    let deg = -360,
        time = 0,
        seconds = 0,
        date = new Date(null),
        songsArr = [
            'Benzin',
            'Ein Lied',
            'Feuer Und Wasser',
            'Hilf Mir',
            'Mann Gegen Mann',
            'Rosenrot',
            'Spring',
            'Wo Bist Du',
            'Zerstoeren',
            'Stirb Nicht Vor Mir'
        ];

    function liMaker(audio, i, songName) {
        audio.innerHTML = i + 1;
        let tempDate = new Date(null);
        const li = document.createElement('li');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        li.classList.add('list-item');
        div1.innerHTML = (i + 1) + songName;
        audio.addEventListener('loadedmetadata', () => {
            tempDate.setSeconds(audio.duration);
            div2.innerHTML = tempDate.getUTCMinutes().toString() + ':' + (tempDate.getUTCSeconds() < 10 ? '0' + tempDate.getUTCSeconds().toString() : tempDate.getUTCSeconds().toString());
        });
        div1.classList.add('song');
        div2.classList.add('duration');
        li.appendChild(div1);
        li.appendChild(div2);
        li.appendChild(audio);
        li.addEventListener('click', () => {
            if (li.classList.contains('selected')) {
                audio.currentTime = 0;
                playMusic(true);
            } else {
                let selected = document.querySelector('.selected').lastElementChild;
                if (!selected.paused) {
                    selected.pause();
                    selected.currentTime = 0;
                }
                document.querySelector('.selected').classList.remove('selected');
                li.classList.add('selected');
                document.querySelector('.time').innerHTML = "0:00/" + document.querySelector('.selected .duration').innerText;
                document.querySelector('.name').innerHTML = document.querySelector('.selected .song').innerHTML;
                playMusic(true);
            }
        });
        list.appendChild(li);
    }

    function init() {
        let i;
        let audio;
        const length = songsArr.length;
        for (i = 0; i < length; i++) {
            audio = new Audio('media/audio/' + songsArr[i] + '.mp3');
            liMaker(audio, i, ' ' + songsArr[i]);
        }
        list.firstElementChild.classList.add('selected');
        setTimeout(() => {
            document.querySelector('.time').innerHTML = "0:00/" + document.querySelector('.selected .duration').innerText;
            document.querySelector('.name').innerHTML = document.querySelector('.selected .song').innerHTML;
            const mas = document.querySelector('.selected .duration').innerText.split(":");
            seconds = (+mas[0] * 60) + (+mas[1]);
        }, 300);
    };

    function reset() {
        const mas = document.querySelector('.selected .duration').innerText.split(":");
        seconds = (+mas[0] * 60) + (+mas[1]);
        time = 0;
        date.setTime(null);
        slider.value = "0";
    }

    function playMusic(onlyPlay) {
        let audio = document.querySelector('.selected').lastElementChild;
        audio.volume = document.querySelector('.volume input').value;
        let timeEl = document.querySelector('.time');

        function moveSlider() {
            if (!audio.paused) {
                time += 10 / seconds;
                slider.value = time;
                date.setMilliseconds(date.getUTCMilliseconds() + 100);
                timeEl.innerHTML = date.getUTCMinutes().toString() + ':' + (date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds().toString() : date.getUTCSeconds().toString()) + "/" + document.querySelector('.selected .duration').innerText;
                if (slider.value === "100" || audio.ended) {
                    slider.value = "0";
                    date.setTime(null);
                    time = 0;
                    timeEl.innerHTML = "0:00/" + document.querySelector('.selected .duration').innerText;
                    document.querySelector('.play-pause img').src = "media/images/play.png";
                    document.querySelector('.status').innerHTML = 'Play';
                } else setTimeout(moveSlider, 100);
            }
        }
        if (onlyPlay) reset();
        if (audio.paused || onlyPlay) {
            audio.play();
            moveSlider();
            document.querySelector('.play-pause img').src = "media/images/pause.png";
            document.querySelector('.status').innerHTML = 'Playing';
        } else {
            audio.pause();
            document.querySelector('.play-pause img').src = "media/images/play.png";
            document.querySelector('.status').innerHTML = 'Paused...';
        }
    }

    document.querySelector('.play-pause').addEventListener('click', () => { playMusic(false) });

    document.querySelector('.replay img').addEventListener('click', event => {
        audio = document.querySelector('.selected').lastElementChild;
        event.target.style.webkitTransform = 'rotate(' + deg + 'deg)';
        event.target.style.mozTransform = 'rotate(' + deg + 'deg)';
        event.target.style.msTransform = 'rotate(' + deg + 'deg)';
        event.target.style.oTransform = 'rotate(' + deg + 'deg)';
        event.target.style.transform = 'rotate(' + deg + 'deg)';
        deg -= 360;
        audio.currentTime = 0;
        reset();
    });

    document.querySelector('.volume input').addEventListener('input', () => {
        document.querySelector('.selected').lastElementChild.volume = document.querySelector('.volume input').value;
    });

    document.querySelector('.slider').addEventListener('mousedown', () => {
        document.querySelector('.selected').lastElementChild.pause();
    });

    document.querySelector('.slider').addEventListener('mouseup', () => {
        
        const mas = document.querySelector('.selected .duration').innerText.split(":");
        seconds = (+mas[0] * 60) + (+mas[1]);
        time = parseInt(document.querySelector('.slider').value);
        date.setTime(null);
        const currentTime = seconds * time * 0.01;
        date.setSeconds(currentTime);
        document.querySelector('.selected').lastElementChild.currentTime = currentTime;
        playMusic();
    });

    init();
}