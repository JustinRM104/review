const button = document.getElementById('startStop');
const times = document.getElementById('times');

const timeTracking = {
  tracking: false,
  canStart: true,
  currentTime: 0,
  amount: 0
}
const trackingObject = Object.create(timeTracking);

function resetTrack() {
  trackingObject.currentTime = 0;
  setInterval(function(){trackingObject.canStart = true}, 1000);
}

function timeToString() {
  let m = Math.floor(trackingObject.currentTime / 60);
  let s = trackingObject.currentTime - (m * 60);

  if (s < 10) {s = '0' + s.toString()}
  if (m < 10) {m = '0' + m.toString()}

  return `${m}:${s}`
}

function createBar() {
  let bar = document.createElement("div");
  let amount = document.createElement("h2");
  let time = document.createElement("h3");

  bar.className = "timeBar";
  amount.className = "amount";
  time.className = "time";

  bar.append(amount);
  bar.append(time);

  return bar
}

function timerBar(bar) {
  bar.childNodes[1].innerHTML = timeToString();
  let loop = setInterval(function(){
    if (trackingObject.tracking) {
      trackingObject.currentTime = trackingObject.currentTime + 1;
      bar.childNodes[1].innerHTML = timeToString();
    }
    else {
      clearInterval(loop);
    }
  }, 1000);
}

function startTrack() {
  button.value = "STOP";
  trackingObject.tracking = true;
  trackingObject.amount = trackingObject.amount + 1;

  let bar = createBar();
  bar.childNodes[0].innerHTML = `#${trackingObject.amount}`;
  timerBar(bar);

  times.prepend(bar);
}

function stopTrack() {
  button.value = "START";
  trackingObject.canStart = false;
  trackingObject.tracking = false;
  resetTrack();
}

function toggle() {
  if (!trackingObject.tracking && trackingObject.canStart) {
    console.log("Not tracking, starting...");
    startTrack();
  }
  else {
    console.log("Tracking, stopping...");
    stopTrack();
  }
}

button.addEventListener('click', toggle)
