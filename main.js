

import * as timer from "./timer.js"
import * as taskmanager from "./taskManager.js"

let bclickpomodoro = true; //it check pomodoro is clicked again, after first click, before click anything it prevent it to happen.
function ProgramOnLoad() {
    console.log("ProgramOnLoad çalıştı!");

    document.addEventListener(timer.OnTimeUpdate, e => {
       _UpdateTimeText(e.detail)
       _UpdateTimeTextinTitle(e.detail);
        bclickpomodoro = true;
    });
    document.addEventListener(timer.OnTimerEnded, _UpdateTimeEndedText);
    document.addEventListener(timer.OnTimerEnded, t => {
        _SetSkipButtonVisibility(false)
    });
    document.addEventListener(timer.OnTimerTypeChanged, t => {
        bclickpomodoro = true;
    });
    document.addEventListener(taskmanager.OnPomodoroUpdate, e =>
    {
        _UpdatePomodoroCountText(e.detail.pomodoro);
    }
    );
    _UpdatePomodoroCountText(taskmanager.getCurrentPomodoro());
    _SetButtons()
    _SetSkipButtonVisibility(false)
    //WriteAllTaskOnDocument();
}

function _SetSkipButtonVisibility(isVisible){
    if(!isVisible){
        document.getElementById('btnSkip').style.visibility = "hidden";
    }
    else{
        document.getElementById('btnSkip').style.visibility = "visible";
    }
}

function WriteAllTaskOnDocument(){
    const text = taskmanager.GetAllTaskinHTMLForm();
    document.getElementById('divTaskList').innerHTML = text;
}
let bclickstart = true
function ClickStartButton(){
    _UpdateStartButtonText(bclickstart);
    if(bclickstart) {
        timer.StartTimer();
    }
    else{
        timer.StopTimer();
    }
    bclickstart = !bclickstart;
    _SetSkipButtonVisibility(true)

}


function ClickPomodorotButton() {
    if(!bclickpomodoro) return;
    timer.ResetTimer();
    bclickpomodoro= false;
}

function _SetButtons(){
    
    const pomodoroButton = document.querySelector("#btnPomodoro");
    pomodoroButton.addEventListener("click", ClickPomodorotButton);
    const btnStart = document.querySelector("#btnStart");
    btnStart.addEventListener("click",ClickStartButton);
    document.getElementById("btnShortbreak").addEventListener("click", e =>
        {
            clickedShortBreak();
        }
    )
    document.getElementById("btnLongbreak").addEventListener("click", e =>
        {
            clickedLongBreak();
        }
    )
    document.getElementById("btnSkip").addEventListener("click", e =>
    {
        clickedSkipButton();
    }
    )
}
function clickedSkipButton(){
    timer.ChangeToNextTimer();
}

function clickedLongBreak(){
            timer.ResetTimerLongBreak();
}
function clickedShortBreak(){
            timer.ResetTimerShortBreak();
}
function _UpdatePomodoroCountText(pomodoro){
    document.getElementById("pSessionnumber").innerText = "#"+pomodoro;
}
//this function find next timer type(pomodoro,short,long) with data of current time and session number

function _UpdateTimeText(detail) {
    let text = _CovertSecondToMinute(detail.second);
    document.getElementById('pRemainTime').innerText = text
}
function _UpdateTimeTextinTitle(detail) {
    let text = _CovertSecondToMinute(detail.second);
    _updateTitleText(text);
}
function _updateTitleText(text) {
    document.getElementsByTagName('title')[0].innerText = text + '- Focus On'
}
function _CovertSecondToMinute(second) {
    let minute = Math.floor(second / 60);
    let remainingSecond = second % 60;

    return `${String(minute).padStart(2, '0')}:${String(remainingSecond).padStart(2, '0')}`;
}

function _UpdateTimeEndedText() {
    console.log("Zamanlayıcı sona erdi.");
    _UpdateStartButtonText(false);
    bclickstart = true;
}



function _UpdateStartButtonText(clickstart){
    if(clickstart) {
        document.getElementById('btnStart').innerText = 'Stop';
    }
    else{
        document.getElementById('btnStart').innerText = 'Start';
    }
}


window.addEventListener("DOMContentLoaded", ProgramOnLoad);
