import * as timer from "./timer.js"
import {Task} from "./TaskObject.js"

export const OnPomodoroUpdate = "custom:OnPomodoroUpdate";
export const OnTaskbarUpdate = "custom:OnTaskbarUpdate";
let _taskList = [];
let _currentTaskID = -1;
let _currentPomodoroNumber = 1;


function ProgramOnLoad(){
    //it will update the program according the data saved by pc memory
    AddNewTaskinList("CSS",3)
    AddNewTaskinList("JS",4)
    document.addEventListener(timer.OnTimerEnded, e => {
        if(timer.getCurrentTimerType() != timer.TimerType.POMODORO) return;
        IncreasePomodorobyOne();
        _UpdatePomodoroNumberonUpdate();
    });
    setCurrentPomodoro(_currentPomodoroNumber);
    if(_taskList.length > 0){
        _currentTaskID = 0
    }
}

function _UpdatePomodoroNumberonUpdate(){
    let _task = _taskList[_currentTaskID];
    _task.IncreasePomodorobyOne();
    document.dispatchEvent(OnTaskbarUpdate)
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
function AddNewTaskinList(name,maxPomodoro){
    let _task = new Task(name, 0, maxPomodoro,_taskList.length)
    _taskList.push(_task)

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