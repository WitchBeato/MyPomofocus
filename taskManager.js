import * as timer from "./timer.js"
import {Task} from "./TaskObject.js"

export const OnPomodoroUpdate = "custom:OnPomodoroUpdate";
export const OnTaskbarUpdate = "custom:OnTaskbarUpdate";
let _taskList = [new Task('css',0,3,0),new Task('js',0,2,1)];
let _currentTask;
let _currentPomodoroNumber = 1;


function ProgramOnLoad(){
    //it will update the program according the data saved by pc memory
    document.addEventListener(timer.OnTimerEnded, e => {
        if(timer.getCurrentTimerType() != timer.TimerType.POMODORO) return;
        IncreasePomodorobyOne()
    });
    setCurrentPomodoro(_currentPomodoroNumber);
}
function GetAllTaskinHTMLForm(){
    console.log('kontrol edılıyor');
    if(!(_taskList[0] instanceof Task)) return;
    let htmlText;
    for(let i = 0; i < _taskList.length; i++){
        let task = _taskList[i]
        htmlText += task.GetTaskinHTML();
    }
    return htmlText;
}

function IncreasePomodorobyOne(){
    setCurrentPomodoro(_currentPomodoroNumber + 1);
}
function DecreasePomodorobyOne(){
    setCurrentPomodoro(_currentPomodoroNumber - 1);
}

function getCurrentPomodoro(){
    return _currentPomodoroNumber;
}
function setCurrentPomodoro(param){
    _currentPomodoroNumber = param;
    document.dispatchEvent(new CustomEvent(OnPomodoroUpdate , {
        detail:{
            pomodoro: _currentPomodoroNumber
        }
    }));
}


window.addEventListener("DOMContentLoaded",ProgramOnLoad)

export {IncreasePomodorobyOne,DecreasePomodorobyOne, getCurrentPomodoro, setCurrentPomodoro, GetAllTaskinHTMLForm};