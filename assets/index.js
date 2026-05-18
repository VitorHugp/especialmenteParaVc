function verificar(){
    let senha = document.getElementById("senha").value;
    let senhaLimpa = senha.replace(/\s+/g, "").toLowerCase();

    if(senhaLimpa === "euteamo"){
        sessionStorage.setItem("autenticado", "true");

        document.getElementById("cadeado").classList.add("aberto");
        document.getElementById("cadeado").querySelector("path").setAttribute("d", "M25 55 Q25 5 50 5 Q75 5 75 55");

        setTimeout(() => {
            document.getElementById("livroCapa").classList.add("abrir");
        }, 600);

        setTimeout(() => {
            mostrarLivro();
        }, 1800);

    } else {
        alert("Senha errada");
        document.getElementById("senha").value = "";
    }
}

function mostrarLivro(){
    document.getElementById("login").style.display = "none";
    document.getElementById("livro").style.display = "block";
    document.body.classList.remove("login-state");
    document.body.classList.add("book-state");

    elements.forEach(el => observer.unobserve(el));
    elements.forEach(el => observer.observe(el));
}

document.querySelectorAll(".entry").forEach(entry => {
    entry.querySelector(".text").textContent = entry.dataset.text;

    entry.addEventListener("click", () => {
        if(window.innerWidth <= 768){
            document.getElementById("overlayTimeline").classList.add("show");
            const modal = document.getElementById("modalTimeline");
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show"), 10);
            document.getElementById("modalTimelineData").textContent = entry.querySelector(".date").textContent;
            document.getElementById("modalTimelineTexto").textContent = entry.dataset.text;
        }
    });
});

function fecharTimeline(){
    document.getElementById("overlayTimeline").classList.remove("show");
    const modal = document.getElementById("modalTimeline");
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400);
}

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
    ctx.fillStyle = "#b3001b";

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
const elements = document.querySelectorAll(".entry, .capa, .pagina, .paginas-titulo, .timeline");

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

/* CHECA AUTENTICAÇÃO */
if(sessionStorage.getItem("autenticado") === "true"){
    mostrarLivro();
}