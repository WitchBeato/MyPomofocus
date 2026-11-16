
import * as taskmanager from "./taskManager.js"

export class Time {
    constructor(minute = 25, second = 0) {
        this.minute = minute;
        this.second = second;
    }

    clone() {
        return new Time(this.minute, this.second);
    }
}
export const TimerType = {
    POMODORO: 0,
    SHORT: 1,
    LONG: 2
}

let _currentTimerType = TimerType.POMODORO;

const _timeReference = new Time(25, 0); 
const _timeshortbreakreference = new Time(5, 0);
const _timelongbreakreference = new Time(15, 0);

let _currentTime = _timeReference.clone();
let _timer = null;

let time = _currentTime;


export const OnTimeUpdate = "custom:OnTimeUpdate"; //it indicated every second timer updated
export const OnTimerTypeChanged = "custom:OnTimerTypeChanged"; //it indicated when timer type has changed
export const OnTimerEnded = "custom:OnTimerEnded"; //it indicated when timer finally ended 

// Event nesneleri yalnızca bir kez oluşturulur.

/**
 * it start the timer
 * and create a interval
 */
function StartTimer() {
    // Zaten çalışıyorsa ikinci bir interval oluşturma
    if (_timer !== null) return;

    // Süre bittiyse başlangıç süresine dön
    if (_currentTime.minute === 0 && _currentTime.second === 0) {
        _currentTime = _timeReference.clone();
        time = _currentTime;
        _SendCurrentTimeInformation();
    }
    _timer = setInterval(_decreaseCurrentTime, 1000);
}
// it give user what is current pomodoro type right now
function getCurrentTimerType() {
    return _currentTimerType;
}
function _setCurrentTimerType(timertype) {
    if (typeof param !== 'int' &&  timertype >= Object.keys(TimerType).length) {
        throw new Error('it is not int!');
    }
    _currentTimerType = timertype;
}

/**
 * it stop timer and destroy timer interval
 */
function StopTimer() {
    if (_timer !== null) {
        clearInterval(_timer);
        _timer = null;
    }
}
/**
 * it reset timer to Pomodoro mode, dispact OnTimerEnded  and reset time to new timer type
 */
function ResetTimer() {
    StopTimer();
    _currentTime = _timeReference.clone();
    _SendCurrentTimeInformation();
    _setCurrentTimerType(TimerType.POMODORO);
    document.dispatchEvent(new Event(OnTimerTypeChanged));
    document.dispatchEvent(new Event(OnTimerEnded));
    
}
/**
 * it reset timer to Longbreak mode, dispact OnTimerEnded  and reset time to new timer type
 */
function ResetTimerLongBreak() {
    StopTimer();
    _currentTime = _timelongbreakreference.clone();
    _setCurrentTimerType(TimerType.LONG);
    _SendCurrentTimeInformation();
    document.dispatchEvent(new Event(OnTimerTypeChanged));
    document.dispatchEvent(new Event(OnTimerEnded));
}
/**
 * it reset timer to Shortbreak mode, dispact OnTimerEnded  and reset time to new timer type
 */
function ResetTimerShortBreak() {
    StopTimer();
    _currentTime = _timeshortbreakreference.clone();
    _setCurrentTimerType(TimerType.SHORT);
    _SendCurrentTimeInformation();
    document.dispatchEvent(new Event(OnTimerTypeChanged));
    document.dispatchEvent(new Event(OnTimerEnded));
}

/**
 * it decrease timer time in every second
 */
function _decreaseCurrentTime() {
    if (
        _currentTime.minute === 0 &&
        _currentTime.second === 0
    ) {
        ChangeToNextTimer();
        return;
    }

    if (_currentTime.second > 0) {
        _currentTime.second--;
    } else {
        _currentTime.minute--;
        _currentTime.second = 59;
    }
    _SendCurrentTimeInformation();

}
/**
 * it send current time information to document event
 */
function _SendCurrentTimeInformation(){
    document.dispatchEvent(
    new CustomEvent(OnTimeUpdate, {
        detail: {
            second: _currentTime.minute * 60 + _currentTime.second
        }
        })
    );
}
/**
 * Changes the timer type to the next one.
 * it change into long or short in pomodoro, or otherwise happen
 */
function ChangeToNextTimer(){
    //it change timer type to next one 
    const currentTimerType = getCurrentTimerType();
    if(currentTimerType == TimerType.POMODORO){
        if(taskmanager.getCurrentPomodoro() % 4 == 0) {
            ResetTimerLongBreak();
        }
        else {
            ResetTimerShortBreak();
        }
    }
    else if(currentTimerType == TimerType.LONG ||
        currentTimerType == TimerType.SHORT
    ) {
        ResetTimer();
    }
}


export { StartTimer, StopTimer, ResetTimer, ResetTimerLongBreak, 
    ResetTimerShortBreak, getCurrentTimerType, ChangeToNextTimer}
