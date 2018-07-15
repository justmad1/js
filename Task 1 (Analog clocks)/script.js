window.onload = () => {
    let d = new Date();
    let seconds = d.getSeconds() * 6;
    let minutes = d.getMinutes() * 6;
    let hours = d.getHours();
    if (hours >= 12) {
        hours -= 12;
    }
    hours = hours * 30 + minutes / 12;

    function tick () {
        document.querySelector('#second').style.transform = "rotate(" + seconds + "deg)";
        document.querySelector('#minute').style.transform = "rotate(" + minutes + "deg)";
        document.querySelector('#hour').style.transform = "rotate(" + hours + "deg)";
        seconds += 6;
        minutes += 1 / 10;
        hours += 1 / 300;
        if (seconds == 360) {
            seconds = 0;
        }
        if (minutes == 360) {
            minutes = 0;
        }
        if (hours == 360) {
            hours = 0;
        }
        let timerId = setTimeout(tick, 1000);
    }
    tick();
    let time = document.querySelector('#time');
    time.oninput = function() {
        minutes = parseInt(time.value[3] + time.value[4]) * 6;
        hours = parseInt(time.value[0] + time.value[1]) * 30 + minutes / 12;
    };
}