/* PETALAS */
const canvas = document.getElementById("petalas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petalas = [];

for(let i = 0; i < 40; i++){
    petalas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 2,
        d: Math.random() * 1.5 + 1
    });
}

function desenhar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#0050c8";

    for(let p of petalas){
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.d;
        p.x += Math.sin(p.y * 0.01);

        if(p.y > canvas.height){
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(desenhar);
}

desenhar();

/* SCROLL OBSERVER */
const elements = document.querySelectorAll(".topo, .disco-card, .citacao-section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
        } else {
            entry.target.classList.add("hide");
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.1
});

elements.forEach(el => observer.observe(el));

/* AUDIO */
const audioPlayer = document.getElementById("audioPlayer");

function abrirModal(id){
    document.getElementById("overlay").classList.add("show");
    const modal = document.getElementById(id);
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 10);

    const card = document.querySelector(`[onclick="abrirModal('${id}')"]`);
    const audioSrc = card.dataset.audio;
    if(audioSrc){
        audioPlayer.src = audioSrc;
        audioPlayer.play();
    }
}

function fecharModal(){
    document.getElementById("overlay").classList.remove("show");
    document.querySelectorAll(".modal").forEach(m => {
        m.classList.remove("show");
        setTimeout(() => m.style.display = "none", 400);
    });
    audioPlayer.pause();
    audioPlayer.src = "";
}