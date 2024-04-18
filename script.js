//grabbing id's from index.html
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
var mainName = document.getElementById("currentExercise").innerText;
let originalContent = document.getElementById("currentExercise").innerText;

//making the random functions 
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

//setting all the variables 
randomWarmuptime = randomIntFromInterval(300, 420)
let interval;
let timeLeft = randomWarmuptime;
let timerRunning = false;
let timeSinceLastExcersice = 0;
//Exercise sets
let warmupExercises = ["Jog", "Walk Slowly", "Arm Circles", "High Kicks", "Lunges", "Squats", "Shoulder Rolls"];//random 10s-15s
let legExercises = ["Army Squats", "Jumping Jacks", "Calf Raises", "Squats", "[R] Lunges", "[L] Lunges", "[R] Step-up on Block", "[L] Step-up on Block", "[Both] Step-up on Block"];//30s + 10s 
let upperExercises = ["Pushups", "Pike Pushups", "Plank", "Leg Lift to Roof", "Ankle Taps", "Pushups", "Roof Raises", "Sit Ups", "Plank", "Bicycle Crunches", "Arm Circles", "Ball Pushups", "[R] Plank", "[L] PLank"];//45s + 10s 
let warmupExerciseChosen = get_random(warmupExercises);

function updateTimer() {
    if (mainName == originalContent){
        document.getElementById("currentExercise").innerText = "Warm-Up!";
        mainName = "Warm-Up!";
    }
    timeSinceLastExcersice++
    if (mainName == 'Warm-Up!' || mainName == warmupExerciseChosen){
        if (timeSinceLastExcersice == randomIntFromInterval(1, 5)){
            warmupExerciseChosen = get_random(warmupExercises);
            document.getElementById("currentExercise").innerText = warmupExerciseChosen;
            mainName = warmupExerciseChosen;
            console.log(warmupExerciseChosen);
            timeSinceLastExcersice = 0;
        }
    };
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    
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
    updateTimer();
    document.getElementById("currentExercise").innerText = "Warm-Up!";
    timeLeft = randomIntFromInterval(300, 420);
    timeSinceLastExcersice=0;
    timerRunning = false;
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);