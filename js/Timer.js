export default class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer-part-minute"),
            seconds: root.querySelector(".timer-part-second"),
            control: root.querySelector(".timer-button-control"),
            reset: root.querySelector(".timer-button-reset")
        };

        this.interval = 0;
        this.remainingSeconds = 0;

        this.el.control.addEventListener("click", () => {
            if(this.interval === null){
                this.start();
            }
            else{
                this.stop();
            }
        })

        this.el.reset.addEventListener("click", () => {
            var inputSeconds = prompt("Enter the number of seconds: ");
            
            if(inputSeconds <= 6000){
                this.stop();
                this.remainingSeconds = inputSeconds;
                this.updateInterface();
            }
        })
    }

    updateInterface(){
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls(){
        if(this.interval == null){
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer-button-start");
            this.el.control.classList.remove("timer-button-stop");
        }

        else{
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer-button-stop");
            this.el.control.classList.remove("timer-button-start");
        }
    }

    start(){
        if(this.remainingSeconds == 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterface();

            if(this.remainingSeconds === 0){
                this.stop();
                this.playSound();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop(){
        clearInterval(this.interval);
        this.interval = null;

        this.updateInterfaceControls();
    }

    playSound(){
        var audio = new Audio('alarm.wav');
        audio.play();
    }

    static getHTML(){
        return `
            <span class="timer-part timer-part-minute">00</span>
            <span class="timer-part">:</span>
            <span class="timer-part timer-part-second">00</span>
            
            <button type="button" class="timer-button timer-button-control timer-button-start">
                <span class="material-icons">play_arrow</span>
            </button>
        
            <button type="button" class="timer-button timer-button-reset">
                <span class="material-icons">timer</span>
            </button>
        `;
    }
}
