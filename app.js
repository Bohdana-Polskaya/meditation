const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');

    const sounds = document.querySelectorAll('.sound button');

    const timeDisplay = document.querySelector('.time-display');
    const selectTime = document.querySelectorAll('.time button');
    
    //получение длинны контура play
    const outlineLength = outline.getTotalLength();
   
    //длительность воспроизведения
    let simulatedDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //выбор другой музыки
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            stopStartPlay(song);
        });
    });


    //воспроизведение музыки
    play.addEventListener('click', () => {
        stopStartPlay(song);
    });

    // выбор времени воспроизведения

    selectTime.forEach(option => {
        option.addEventListener('click', function() {
            simulatedDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(simulatedDuration / 60)}:${Math.floor(simulatedDuration % 60)}`;

        });
    });






    //функция, останавливающая и воспроизводящая дорожки

    const stopStartPlay = (song) => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //анимирование контура play
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let pass = simulatedDuration - currentTime; //прошедшее время
        let seconds = Math.floor(pass % 60);
        let minutes = Math.floor(pass / 60);

        //анимирование круга
        let progress = outlineLength - (currentTime / simulatedDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //анимирование времени воспроизведения
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= simulatedDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        };
    };

};

app();