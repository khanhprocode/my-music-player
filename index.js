const songs=[
        {
            title:'Thằng Điên',
            artist:'Justatee,Phương Ly',
            duration:'3:54',
            img: 'https://i1.sndcdn.com/artworks-r69juSNvR6HpKqfD-5DRVTg-t500x500.jpg'
        },
        {
            title:'Lãng Quên Chiều Thu',
            artist:'Hoa Vinh',
            duration:'4:00',
            img: 'hoavinh.jpg'
        },
        {
            title:'Way Back Home',
            artist:'SHAUN feat. Conor Maynard',
            duration:'3:12',
            img:'wbh.jpg'
        },
         {
        title:'Nếu Ví Anh Như',
        artist:'(Đông x Thazh Remix) - 若把你 - Kirsty刘瑾睿',
        duration:'3:14',
        img:'lebao.jpg'
    },
        
    ];
    const playlistDiv =document.getElementById('playlist-container');
    songs.forEach((song, index) => {
        playlistDiv.innerHTML += `
            <div class="song" onclick="playAudio('${song.title}')">
                <p class="song-id">${index + 1}</p>
                <img class="song-img" src="${song.img}" alt="">
                <div class="song-info">
                    <p class="song-title">${song.title}</p>
                    <p class="artist">${song.artist}</p>
                </div>
                <p class="song-duration">${song.duration}</p>
            </div>
        `;
    });
    
    function formatLink(title) {
        return `${title}.mp3`; // Ví dụ: Thằng điên.mp3
    }
    
    let audioContext;
    let analyser;
    let source;
    let audio;

    function playAudio(title) {
        const fileAudio = formatLink(title);

        if (audio) {
            audio.pause();
        }

        audio = new Audio(fileAudio);
        audio.crossOrigin = "anonymous";
        audio.play();

        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        visualize(analyser);
    }

    function visualize(analyser) {
        const canvas = document.getElementById('visualizer');
        const ctx = canvas.getContext('2d');
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i];
                ctx.fillStyle = `rgb(${barHeight + 100},50,200)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
                x += barWidth;
            }
        }

        draw();
    }
