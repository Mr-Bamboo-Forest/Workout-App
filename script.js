const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
var mainName = document.getElementById("currentExercise").innerText;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
randomWarmuptime = randomIntFromInterval(300, 420)
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}


let interval;
let timeLeft = randomWarmuptime;
let timerRunning = false;
let currentTotalTime = 0;
let warmupExercises = ["Jog", "Walk Slowly", "Arm Circles", "High Kicks", "Lunges", "Squats", "Shoulder Rolls"];

function updateTimer() {
    if (mainName == "Workout Time!"){
        document.getElementById("currentExercise").innerText = "Warm-Up!"
        mainName = "Warm-Up!";
        if (timeLeft == 0){
            timeLeft = randomIntFromInterval(300, 420)
        }
    }
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    currentTotalTime++
    if (mainName == 'Warm-Up!' || mainName == warmupExercises){
        if (currentTotalTime == randomIntFromInterval(10, 15)){
            let warmupExerciseChosen = get_random(warmupExercises);
            document.getElementById("currentExercise").innerText = warmupExerciseChosen;
            console.log(warmupExerciseChosen);
            currentTotalTime = 0;
        }
    };
    timerEl.innerHTML = formattedTime;
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        interval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(interval);
                alert("Time's Up!");
                timeLeft = 1500;
                updateTimer();
                timerRunning = false;
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(interval);
    timeLeft = 0;
    updateTimer();
    document.getElementById("currentExercise").innerText = "Workout Time!"
    timerRunning = false;
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);