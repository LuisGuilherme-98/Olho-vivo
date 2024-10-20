// Ação ao clicar no botão de câmera
document.getElementById("cameraButton").addEventListener("click", function() {
    document.getElementById("photoInput").click(); // Abre o seletor de arquivo para a câmera
});

// Pré-visualizar a foto tirada
document.getElementById("photoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById("preview");
            preview.src = e.target.result; // Exibe a foto
            preview.style.display = "block"; // Mostra a pré-visualização
        };
        reader.readAsDataURL(file);
    }
});

