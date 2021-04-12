document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('restart').addEventListener('click', restart);

    setTimeout(() => {
        main();
    }, 500);
});

let timer;

function main() {

    let [ timer1, timer2 ] = getMillisecondsForEachPlayer();

    setupTimers(timer1, timer2);

    let player1Turn = true;

    document.addEventListener('keypress', event => {
        
        if (event.code === 'Space') {

            clearInterval(timer)

            if (player1Turn) {
                timer = setInterval(() => {
                    timer1 -= 1;
                    document.getElementById('1').innerHTML = formatTime(timer1);

                    if (timer1 <= -100) {
                        clearInterval(timer);
                        timeout(1);
                    };

                }, 10);
            } else {
                timer = setInterval(() => {
                    timer2 -= 1;
                    document.getElementById('2').innerHTML = formatTime(timer2);

                    if (timer2 <= -100) {
                        clearInterval(timer);
                        timeout(2);
                    };

                }, 10);
            }
 
            player1Turn = !player1Turn;

        }

    });

}

function getMillisecondsForEachPlayer() {

    let timer1 = Number(prompt('Minutes for player 1:'));
    let timer2 = Number(prompt('Minutes for player 2:'));

    while (isNaN(timer1) || isNaN(timer2)) {

        alert('Be sure to type a number');

        timer1 = Number(prompt('Minutes for player 1:'));
        timer2 = Number(prompt('Minutes for player 2:'));

    }

    return [ (timer1 * 60 * 100) - 100, (timer2 * 60 * 100) - 100];

}

function setupTimers(timer1, timer2) {

    document.getElementById('1').innerHTML = formatTime(timer1);
    document.getElementById('2').innerHTML = formatTime(timer2);

} 

function formatTime(milliseconds) {

    let hours = Math.floor(milliseconds / 100 / (60 * 60));

    let divisor_for_minutes = milliseconds / 100 % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let millis = Math.ceil((divisor_for_seconds - seconds + 1) * 100);

    // corrects 21:60 to 22:00, for example
    if (millis == 100) {
        millis = 0;
        seconds += 1;
    }
    if (seconds == 60) {
        minutes += 1;
        seconds = 0;
    }
    if (minutes == 60) {
        hours += 1;
        minutes = 0;
    }
    
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;

        if (milliseconds < -100) millis = 0
    }

    const twoDigitsStrings = [hours, minutes, seconds, millis].map(number => number.toLocaleString('pt-BR', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }));

    if (minutes == 0 && seconds < 20) return `${twoDigitsStrings[1]}:${twoDigitsStrings[2]}:${twoDigitsStrings[3]}`
    
    return `${twoDigitsStrings[0]}:${twoDigitsStrings[1]}:${twoDigitsStrings[2]}`

}

function timeout(player) {
    document.getElementById(`player${player}`).style.background = "red";
    
    setTimeout(() => {
        alert(`Timeout for player ${player}`);

        restart();
    }, 100);

}

function restart() {
    clearInterval(timer);
    main();
}