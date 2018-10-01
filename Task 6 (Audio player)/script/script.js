window.onload = () => {
    const artist = 'Rammstein',
        list = document.querySelector('.list'),
        slider = document.querySelector('.slider'),
        timeEl = document.querySelector('.time'),
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
    let deg = -360,
        count = 0,
        time = 0,
        tempDate,
        seconds = 0,
        date = new Date(null),
        volumeElem = document.querySelector('.volume input'),
        sliderElem = document.querySelector('.slider'),
        replayImgElem = document.querySelector('.replay img'),
        playPauseImgElem = document.querySelector('.play-pause');

    function liMaker(audio, i, songName) {
        audio.innerHTML = i + 1;
        let tempDate = new Date(null);
        const li = document.createElement('li');
        const songNameElem = document.createElement('div');
        const durationElem = document.createElement('div');
        li.classList.add('list-item');
        songNameElem.innerHTML = (i + 1) + songName;
        audio.addEventListener('loadedmetadata', () => {
            tempDate.setSeconds(audio.duration);
            const minutes = tempDate.getUTCMinutes();
            const seconds = tempDate.getUTCSeconds();
            durationElem.innerText = `${minutes.toString()}:${(seconds < 10 ? '0' + seconds.toString() : seconds.toString())}`;
        });
        songNameElem.classList.add('song');
        durationElem.classList.add('duration');
        li.appendChild(songNameElem);
        li.appendChild(durationElem);
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
                document.querySelector('.time').innerHTML = `0:00/${document.querySelector('.selected .duration').innerText}`;
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
            audio = new Audio(`media/audio/${songsArr[i]}.mp3`);
            liMaker(audio, i, ` ${artist} - ${songsArr[i]}`);
        }
        list.firstElementChild.classList.add('selected');
        setTimeout(() => {
            document.querySelector('.time').innerHTML = `0:00/${document.querySelector('.selected .duration').innerText}`;
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

        function moveSlider() {
            if (!audio.paused) {
                time += 10 / seconds;
                slider.value = time;
                date.setMilliseconds(date.getUTCMilliseconds() + 100);
                timeEl.innerHTML = `${date.getUTCMinutes().toString()}:${(date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds().toString() : date.getUTCSeconds().toString())}/${document.querySelector('.selected .duration').innerText}`;
                console.log(audio.currentTime, audio.duration - 1, audio.currentTime >= audio.duration - 1);
                if (audio.currentTime >= audio.duration - 1) {
                    console.log('ended');
                    slider.value = "0";
                    date.setTime(null);
                    time = 0;
                    timeEl.innerHTML = "0:00/" + document.querySelector('.selected .duration').innerText;
                    setTimeout(() => {
                        document.querySelector('.play-pause img').src = "media/images/play.png";
                    }, 100);
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

    playPauseImgElem.addEventListener('click', () => { playMusic(false) });

    replayImgElem.addEventListener('click', event => {
        audio = document.querySelector('.selected').lastElementChild;
        event.target.style.webkitTransform = `rotate(${deg}deg)`;
        event.target.style.mozTransform = `rotate(${deg}deg)`;
        event.target.style.msTransform = `rotate(${deg}deg)`;
        event.target.style.oTransform = `rotate(${deg}deg)`;
        event.target.style.transform = `rotate(${deg}deg)`;
        deg -= 360;
        audio.currentTime = 0;
        reset();
    });

    volumeElem.addEventListener('input', () => {
        document.querySelector('.selected').lastElementChild.volume = document.querySelector('.volume input').value;
    });

    sliderElem.addEventListener('mousedown', () => {
        document.querySelector('.selected').lastElementChild.pause();
    });

    sliderElem.addEventListener('mouseup', () => {
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