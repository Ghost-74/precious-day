// 💖 Intro Screen Logic
const intro = document.getElementById("introScreen");
const music = document.getElementById("bgMusic");
const mainContent = document.getElementById("mainContent");
intro.addEventListener("click", () => {
    // play music
    music.play().catch(() => {});

    // fade out intro
    intro.style.opacity = "0";
    intro.style.transition = "0.8s";

    setTimeout(() => {
        intro.style.display = "none";
        mainContent.classList.add("show");
    }, 800);
});

// 💖 Floating Hearts
function createHeart() {
    const container = document.querySelector(".hearts");

    if (container.childElementCount > 15) return; // limit

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 15 + 15) + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 1000);

// 🎵 Fix autoplay (browser restriction workaround)
window.addEventListener("click", () => {
    document.getElementById("bgMusic").play();
}, { once: true });

const video = document.querySelector("video");

// 🎵 Smooth fade function
function fadeAudio(audio, targetVolume, duration) {
    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = (targetVolume - audio.volume) / steps;

    const fade = setInterval(() => {
        let newVolume = audio.volume + volumeStep;

        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;

        audio.volume = newVolume;

        if (Math.abs(audio.volume - targetVolume) < 0.01) {
            audio.volume = targetVolume;
            clearInterval(fade);

            if (targetVolume === 0) {
                audio.pause();
            }
        }
    }, stepTime);
}

if (video && music) {

    // set initial volume
    music.volume = 0.6;

    video.addEventListener("play", () => {
        fadeAudio(music, 0, 800);
    });

    video.addEventListener("pause", () => {
        music.play().catch(() => {});
        fadeAudio(music, 0.6, 800);
    });

    video.addEventListener("ended", () => {
        music.play().catch(() => {});
        fadeAudio(music, 0.6, 800);
    });
}