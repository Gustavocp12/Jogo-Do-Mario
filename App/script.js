/* const mario = document.getElementById("mario"); // Obtém a imagem do Mario
const puloBtn = document.getElementById("pulo-btn"); // Obtém o botão de espaço
const cano = document.getElementById("cano"); // Obtém a imagem do cano
let gameover = false; // Define a variável de controle de Game Over
let time;

let pulo = () => {
    mario.classList.add("pulo"); // Adiciona a classe "pulo" para simular o salto
    setTimeout(() => {
        mario.classList.remove("pulo"); // Remove a classe "pulo" após 500ms
    }, 500);
}

(function checkCollision() {

    if (gameover) {
        console.log('Game Over');
        cano.style.animation = ''
        pulo = null;
        time = null;
        return; // Retorna se o jogo já terminou  
    } {
        const marioBox = mario.getBoundingClientRect(); // Obtém a caixa delimitadora do Mario
        const canoBox = cano.getBoundingClientRect(); // Obtém a caixa delimitadora do cano
        time = setInterval(checkCollision, 10); // Verifica a colisão a cada 10ms
        
        if (
            marioBox.left < canoBox.right &&
            marioBox.right > canoBox.left &&
            marioBox.top < canoBox.bottom &&
            marioBox.bottom > canoBox.top
        ) {
            gameover = true; // Define o controle de Game Over como verdadeiro
            puloBtn.disabled = true; // Desabilita o botão de salto
            alert("Game Over!"); // Mostra uma mensagem de Game Over
        }
    }
    
})() */

/* const mario = document.getElementById("mario"); // Obtém a imagem do Mario
const cano = document.getElementById("cano"); // Obtém a imagem do cano
let gameover = false; // Define a variável de controle de Game Over

function pulo() {
    if (gameover) return; // Retorna se o jogo já terminou
    mario.classList.add("pulo"); // Adiciona a classe "pulo" para simular o salto
    setTimeout(() => {
        mario.classList.remove("pulo"); // Remove a classe "pulo" após 500ms
    }, 500);
}

function checkCollision() {
    const marioBox = mario.getBoundingClientRect(); // Obtém a caixa delimitadora do Mario
    const canoBox = cano.getBoundingClientRect(); // Obtém a caixa delimitadora do cano

    if (
        marioBox.left < canoBox.right &&
        marioBox.right > canoBox.left &&
        marioBox.top < canoBox.bottom &&
        marioBox.bottom > canoBox.top
    ) {
        gameover = true; // Define o controle de Game Over como verdadeiro
        alert("Game Over!"); // Mostra uma mensagem de Game Over
    }
}


setInterval(checkCollision, 10); // Verifica a colisão a cada 10ms

window.document.addEventListener('keydown', pulo); */

const mario = document.getElementById("mario"); // Obtém a imagem do Mario
const cano = document.getElementById("cano"); // Obtém a imagem do cano
const clouds = document.getElementById("nuvem"); // Obtém a imagem das nuvens
const gover = document.getElementById("gameover"); // Obtém a imagem de Game Over
const nomescore = document.getElementById("nomescore"); // Obtém o score no Game Over
const reiniciar = document.getElementById("reiniciar"); // Obtém o botão de reiniciar
let gameover = false; // Define a variável de controle de Game Over
let gameOverHandlerAdded = false; // Indica se o evento de clique já foi adicionado
let score = 0; // Define a variável de score inicial como zero
const scoreSpan = document.getElementById("score"); // Obtém a tag span para exibir o score
const telascore = document.getElementById("telascore"); // Obtém a tela de score
const telanomescore = document.getElementById("telanomescore"); // Obtém a tela de score


function pulo() {
    if (gameover) return; // Retorna se o jogo já terminou
    mario.classList.add("pulo"); // Adiciona a classe "pulo" para simular o salto
    setTimeout(() => {
        mario.classList.remove("pulo"); // Remove a classe "pulo" após 500ms
    }, 500);
}

function checkCollision() {
    const marioBox = mario.getBoundingClientRect(); // Obtém a caixa delimitadora do Mario
    const canoBox = cano.getBoundingClientRect(); // Obtém a caixa delimitadora do cano
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", ""); // Obtém a posição do Mario em relação a tela
    const cloudsPosition = +window.getComputedStyle(clouds).left.replace("px", ""); // Obtém a posição das nuvens em relação a tela

    if (
        marioBox.left < canoBox.right &&
        marioBox.right > canoBox.left &&
        marioBox.top < canoBox.bottom &&
        marioBox.bottom > canoBox.top
    ) {
        gameover = true; // Define o controle de Game Over como verdadeiro
        mario.src = "../Assets/mario-game-over.webp"; // Altera a imagem do Mario para a de derrota
        cano.style.animation = "none"; // Para a animação do cano
        cano.style.left = "300px"; // Reseta a posição do cano
        mario.style.bottom = `${marioPosition}px`; // Reseta a posição do Mario
        clouds.style.animation = "none"; // Para a animação das nuvens
        clouds.style.left = `${cloudsPosition}px`; // Reseta a posição das nuvens
        gover.style.display = "block"; // Exibe a imagem de Game Over
        nomescore.style.display = "block"; // Exibe o score no Game Over
        scoreSpan.style.display = "block"; // Exibe o score na tela
        reiniciar.style.display = "block"; // Exibe o botão de reiniciar
        telascore.style.display = "none"; // Esconde o score na tela
        telanomescore.style.display = "none"; // Esconde o score no Game Over

        reiniciar.addEventListener("click", function() {
            location.reload(); // Recarrega a página
        });

        window.document.removeEventListener('keydown', pulo); // Remove o event listener de pulo


        window.document.addEventListener('keydown', function(event) {
            if (event.code === "Enter") {
                location.reload(); // Recarrega a página quando a tecla "Enter" for pressionada
            }
        });

    } else if (canoBox.right < marioBox.left) { // Verifica se o cano já passou pelo Mario
        score++; // Incrementa o score em 1
        scoreSpan.innerText = score; // Atualiza o score no Game Over
        telascore.innerText = score; // Atualiza o score na tela
        if (score % 100 === 0) { // Verifica se o score é múltiplo de 100
            aumentaVelocidade();
        }
    }
}

function aumentaVelocidade() {
    const canoAnimation = window.getComputedStyle(cano).getPropertyValue("animation");
    const novoDuracao = +canoAnimation.split(" ")[0].replace("s", "") - 0.5;

    console.log(novoDuracao);
    cano.style.animation = `cano ${novoDuracao}s linear infinite`;
  }

setInterval(() => {
    checkCollision();
    if (!gameover) {
        score++;
        scoreSpan.innerText = score;
        telascore.innerText = score;
    }
}, 10);


window.document.addEventListener('keydown', pulo);
