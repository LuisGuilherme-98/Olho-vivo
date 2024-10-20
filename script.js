// Ação ao clicar no botão de câmera
document.getElementById("cameraButton").addEventListener("click", function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const preview = document.getElementById('preview');

    // Acessa a câmera do dispositivo (câmera traseira)
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: "environment" } // Solicita a câmera traseira
        }
    })
    .then(function(stream) {
        video.style.display = "block"; // Mostra o vídeo ao vivo
        video.srcObject = stream;
        video.play();

        // Captura a imagem ao clicar no vídeo
        video.addEventListener('click', function() {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Converte o canvas em imagem
            const dataURL = canvas.toDataURL('image/png');
            preview.src = dataURL; // Exibe a foto
            preview.style.display = "block"; // Mostra a pré-visualização
            video.style.display = "none"; // Esconde o vídeo ao vivo

            // Para o stream da câmera
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        });
    })
    .catch(function(error) {
        console.log("Erro ao acessar a câmera: ", error);
    });
});

// Envio do formulário
document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL('image/png');

    // Cria um objeto FormData
    const formData = new FormData();
    formData.append('image', dataURL); // Adiciona a imagem
    formData.append('comment', document.getElementById('comment').value); // Adiciona o comentário

    // Envio da imagem (aqui você deve colocar a URL do seu servidor)
    fetch('URL_DO_SEU_SERVIDOR', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        
        // Limpa os campos após o envio
        document.getElementById('comment').value = ''; // Limpa o campo de comentários
        document.getElementById('preview').src = ''; // Limpa a imagem
        document.getElementById('preview').style.display = 'none'; // Esconde a imagem
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
