const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petalas = [];

for(let i = 0; i < 40; i++){
    petalas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 1.5 + 1,
        cor: Math.random() > 0.5 ? "#b3001b" : "#21211e00"
    });
}

function desenharGota(ctx, x, y, r){
    ctx.beginPath();
    ctx.moveTo(x, y - r * 3);
    ctx.bezierCurveTo(
        x + r * 1.5, y - r * 1.5,
        x + r * 1.5, y + r,
        x, y + r
    );
    ctx.bezierCurveTo(
        x - r * 1.5, y + r,
        x - r * 1.5, y - r * 1.5,
        x, y - r * 3
    );
    ctx.fill();
}

function desenhar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let p of petalas){
        ctx.fillStyle = p.cor;
        desenharGota(ctx, p.x, p.y, p.r);

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

const titulo = document.querySelector('.titulo h1');
const subtitulo = document.querySelector('.subtitulo');

setTimeout(() => titulo.classList.add('visivel'), 500);
setTimeout(() => subtitulo.classList.add('visivel'), 1200);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        } else {
            entry.target.classList.remove('visivel');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.card, .carta').forEach(el => {
    observer.observe(el);
});

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalNome = document.getElementById('modalNome');
const modalFrase = document.getElementById('modalFrase');
const modalFechar = document.getElementById('modalFechar');
const conteudo = document.querySelector('.modal-conteudo');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        modalImg.src = card.dataset.img;
        modalNome.textContent = card.dataset.nome;
        modalFrase.textContent = card.dataset.frase;
        modalImg.style.objectPosition = card.dataset.position || "center";
        card.classList.add('selecionado');
        modal.classList.add('aberto');
    });
});

modalFechar.addEventListener('click', fechar);
modal.addEventListener('click', (e) => {
    if (e.target === modal) fechar();
});

function fechar() {
    modal.classList.remove('aberto');
    document.querySelectorAll('.card.selecionado').forEach(c => c.classList.remove('selecionado'));
    setTimeout(() => {
        conteudo.style.top = '';
        conteudo.style.left = '';
        conteudo.style.width = '';
        conteudo.style.height = '';
        conteudo.style.transform = '';
    }, 500);
}