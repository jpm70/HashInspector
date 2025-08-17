document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const inputText = document.getElementById('inputText');
    const resultsSection = document.getElementById('resultsSection');
    const fileNameSpan = document.getElementById('fileName');

    analyzeBtn.addEventListener('click', () => {
        resultsSection.classList.remove('hidden');

        // Resetear los campos de salida
        document.getElementById('md5Output').textContent = "Calculando...";
        document.getElementById('sha1Output').textContent = "Calculando...";
        document.getElementById('sha256Output').textContent = "Calculando...";
        document.getElementById('sha512Output').textContent = "Calculando...";

        const file = fileInput.files[0];
        const text = inputText.value;

        if (file) {
            // Analizar archivo
            const reader = new FileReader();
            reader.onload = function(e) {
                const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
                calculateHashes(wordArray);
            };
            reader.readAsArrayBuffer(file);
        } else if (text) {
            // Analizar texto
            calculateHashes(text);
        } else {
            alert('Por favor, introduce texto o selecciona un archivo.');
            resultsSection.classList.add('hidden');
        }
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            fileNameSpan.textContent = file.name;
            inputText.value = ""; // Limpia el campo de texto si se selecciona un archivo
        } else {
            fileNameSpan.textContent = "";
        }
    });

    function calculateHashes(input) {
        // MD5
        const md5Hash = CryptoJS.MD5(input).toString();
        document.getElementById('md5Output').textContent = md5Hash;

        // SHA-1
        const sha1Hash = CryptoJS.SHA1(input).toString();
        document.getElementById('sha1Output').textContent = sha1Hash;

        // SHA-256
        const sha256Hash = CryptoJS.SHA256(input).toString();
        document.getElementById('sha256Output').textContent = sha256Hash;

        // SHA-512
        const sha512Hash = CryptoJS.SHA512(input).toString();
        document.getElementById('sha512Output').textContent = sha512Hash;
    }
});