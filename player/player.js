
class Player{
    constructor(id){
        this.domVideo = document.getElementById(id);
        if(!this.domVideo){
            console.error(`Cannot find element: [id:${id}]`);
            return;
        }

        //Dom setup
        this.domContainer = document.createElement('div');
        this.domContainer.classList.add('player-container');
        this.domVideo.parentElement.appendChild(this.domContainer);
        this.domContainer.append(this.domVideo);
        this.domControls = document.createElement('div');
        this.domControls.classList.add('player-controls');
        this.domContainer.appendChild(this.domControls);
        //Controls
        this.domBtnPlay = document.createElement('div');
        this.domBtnPlay.classList.add('player-btn-play');
        this.domControls.appendChild(this.domBtnPlay);
        this.domBtnPause = document.createElement('div');
        this.domBtnPause.classList.add('player-btn-pause');
        this.domControls.appendChild(this.domBtnPause);
        this.domBtnExpand = document.createElement('div');
        this.domBtnExpand.classList.add('player-btn-expand');
        this.domControls.appendChild(this.domBtnExpand);
        
        //Volume setup
        this.domVolumeBox = document.createElement('div');
        this.domIconVolume = document.createElement('div');
        this.domIconVolume.classList.add('player-volume-icon');
        this.domVolumeBox.appendChild(this.domIconVolume);
        this.domVolumeBox.classList.add('player-volume-box')
        this.domVolumeStripe = document.createElement('div');
        this.domVolumeStripe.classList.add('player-volume-stripe')
        this.domVolumeRange = document.createElement('input');
        this.domVolumeRange.type = 'range';
        this.domVolumeRange.setAttribute('max',1);
        this.domVolumeRange.setAttribute('step',0.01);
        this.domVolumeBox.appendChild(this.domVolumeStripe);
        this.domVolumeStripe.appendChild(this.domVolumeRange);
        this.domControls.appendChild(this.domVolumeBox);
        
        //Event binding
        this.domBtnPlay.addEventListener('click',this.play.bind(this))
        this.domBtnPause.addEventListener('click',this.pause.bind(this))
        this.domBtnExpand.addEventListener('click',this.expand.bind(this))
        this.domVolumeRange.addEventListener('input',this.setVolume.bind(this))
    }

    play(){
        this.domVideo.play();
        this.domContainer.classList.add('playing');
    }
    pause(){
        this.domVideo.pause();
        this.domContainer.classList.remove('playing');
    }
    expand(){
        if (!document.fullscreenElement) {
            this.domContainer.requestFullscreen();
            this.domContainer.classList.add('full-screen');
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            this.domContainer.classList.remove('full-screen');
        }
    }
    setVolume(event){
        const volume = event.target.value;
        this.domVideo.volume = volume;
        if(volume == 0)
            this.domVolumeBox.setAttribute('data-volume-class','mute');
        else if(volume < 0.3)
            this.domVolumeBox.setAttribute('data-volume-class','off');
        else if(volume < 0.7)
            this.domVolumeBox.setAttribute('data-volume-class','low');
        else
            this.domVolumeBox.setAttribute('data-volume-class','high');
    }
}