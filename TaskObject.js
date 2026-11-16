export class Task{
    constructor(taskName = '', currentPomodoro = 0, maxPomodoro = 1, id = 0){
        this.setID(id)
        this.setMaxPomodoro(maxPomodoro);
        this.setCurrentPomodoro(currentPomodoro)
        this.setTaskName(taskName);
    }
    setMaxPomodoro(maxPomodoro) {
            this.maxPomodoro = maxPomodoro;
    }
    setCurrentPomodoro(currentPomodoro) {
            this.currentPomodoro = currentPomodoro;
    }
    setTaskName(taskName) {
            this.taskName = taskName;
    }
    setID(id) {
            this.id = id;
    }
    IncreasePomodoro(){
        this.currentPomodoro += 1;
    }
    /**
 * return task as a html 
 */
    GetTaskinHTML(){
return `
<ul class="task-list">
    <li class="task-item">
        <p class="task-name">${this.taskName}</p>

        <div class="task-actions">
            <span class="task-progress">${this.currentPomodoro}/${this.maxPomodoro}</span>

            <button
                class="task-menu"
                type="button"
                aria-label="CSS görevi seçenekleri"
            >
                ⋮
            </button>
        </div>
    </li>
</ul>`;
    }
} 