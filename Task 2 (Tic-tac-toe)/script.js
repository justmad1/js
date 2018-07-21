window.onload = function() {
    let p1 = { name: prompt("Player 1 (X) name:", "player1"), turn: "X" },
        p2 = { name: prompt("Player 2 (0) name:", "player2"), turn: "0" },
        title = document.querySelector('.title'),
        p = Math.round(Math.random() * 10) % 2 == 0 ? p1 : p2,
        span = document.createElement('span'),
        steps = 9,
        win = false;
    span.textContent = 'Replay game';
    span.className = 'replay';
    span.style.color = '#00008B';
    span.style.cursor = 'pointer';
    span.addEventListener('click', function() { location.reload() });

    title.textContent = `First turn goes to ${p.name} (${p.turn})!`;
    document.querySelectorAll('.cell').forEach(function(item, i) {
        item.addEventListener('click', function listener() {
            if (win) return;
            let p_copy = p;
            steps--;
            if (p.turn == "X") {
                this.innerHTML = "X";
                p = p2;
            } else {
                this.innerHTML = "0";
                p = p1;
            }
            title.textContent = `${p.name} (${p.turn}) turn`;
            this.removeEventListener('click', listener);
            check(p_copy);
        });
    });

    function check(p) {
        let field = document.querySelectorAll('.cell');
        if ((field[0].innerHTML == p.turn && field[1].innerHTML == p.turn && field[2].innerHTML == p.turn) ||
            (field[3].innerHTML == p.turn && field[4].innerHTML == p.turn && field[5].innerHTML == p.turn) ||
            (field[6].innerHTML == p.turn && field[7].innerHTML == p.turn && field[8].innerHTML == p.turn) ||
            (field[0].innerHTML == p.turn && field[3].innerHTML == p.turn && field[6].innerHTML == p.turn) ||
            (field[1].innerHTML == p.turn && field[4].innerHTML == p.turn && field[7].innerHTML == p.turn) ||
            (field[2].innerHTML == p.turn && field[5].innerHTML == p.turn && field[8].innerHTML == p.turn) ||
            (field[0].innerHTML == p.turn && field[4].innerHTML == p.turn && field[8].innerHTML == p.turn) ||
            (field[2].innerHTML == p.turn && field[4].innerHTML == p.turn && field[6].innerHTML == p.turn)) {

            title.style.color = "#228B22";
            title.textContent = `${p.name} (${p.turn}) has won the game!`;
            document.body.querySelector('.wrapper').appendChild(span);
            win = true;
        } else if (!steps) {
            title.style.color = "#FF4500";
            title.textContent = `It's a draw!`;
            document.body.querySelector('.wrapper').appendChild(span);
            win = true;
        }
    }

}