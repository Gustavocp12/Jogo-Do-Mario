const cubo = document.getElementById("cubo");
const linha = document.getElementById("linha");
const mario = document.getElementById("mario");

cubo.addEventListener("click", () => {
    mario.style.display = "block";
    mario.classList.add("pulo");
    setTimeout(() => {
        window.location.href = "jogo.html"; // altere para a página que deseja redirecionar
      }, 3500); // tempo em milissegundos para aguardar antes de redirecionar
});
