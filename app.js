const musicFiles = [
    'https://f.top4top.io/m_333585iug0.mp3',
    'https://f.top4top.io/m_3335yz9lm1.mp3',
    'https://k.top4top.io/m_3335gr43x1.mp3',
    'https://i.top4top.io/m_3328477of9.mp3',
    'https://k.top4top.io/m_3335z9lsi1.mp3'
];

const audioPlayer = document.getElementById('bgMusic');
let currentTrack = 0;

function playRandomMusic() {
    currentTrack = Math.floor(Math.random() * musicFiles.length);
    audioPlayer.src = musicFiles[currentTrack];
    audioPlayer.play().catch(() => {
        console.log('Autoplay blocked. Click anywhere to start music.');
    });
}

audioPlayer.addEventListener('ended', playRandomMusic);
playRandomMusic();

document.body.addEventListener('click', () => {
    audioPlayer.play();
});

async function findUID() {
    const url = document.getElementById('fbUrl').value;
    if (!url) return alert('Please enter a Facebook URL');
    
    try {
        const response = await fetch(`https://api.zetsu.xyz/api/findid?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.result) {
            document.getElementById('uidResult').textContent = `UID: ${data.result}`;
            document.getElementById('resultBox').style.display = 'block';
        } else {
            alert('UID not found');
        }
    } catch (error) {
        alert('Error fetching UID');
        console.error(error);
    }
}

function copyUID() {
    const uid = document.getElementById('uidResult').textContent.replace('UID: ', '');
    navigator.clipboard.writeText(uid);
    alert('UID copied to clipboard!');
}
