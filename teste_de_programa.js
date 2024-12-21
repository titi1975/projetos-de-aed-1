const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let tracking = false;
let positions = [];

// Iniciar o rastreamento
canvas.addEventListener('mousedown', (e) => {
    tracking = true;
    savePosition(e);
});

// Parar o rastreamento
canvas.addEventListener('mouseup', () => {
    tracking = false;
    console.log('Positions:', positions); // Log das posições
    downloadCoordinates(); // Gera o arquivo para download
});

// Registrar posições enquanto arrasta
canvas.addEventListener('mousemove', (e) => {
    if (tracking) {
        savePosition(e);
    }
});

// Função para salvar a posição do mouse
function savePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    positions.push({ x, y });
    drawPoint(x, y);
}

// Função para desenhar ponto no canvas
function drawPoint(x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
}

// Função para gerar e baixar o arquivo de coordenadas
function downloadCoordinates() {
    const data = positions.map(pos => `(${pos.x}, ${pos.y})`).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'coordenadas.txt';
    a.click();

    window.URL.revokeObjectURL(url); // Limpa a URL gerada
}
