const text = document.querySelector('#qr-text');
const qrContainer = document.querySelector('#qr-body');
const generate = document.querySelector('#generateBtn');
const reset = document.querySelector('#resetBtn');
const download = document.querySelector('#downloadBtn');

// Check if the input is empty
const isEmpty = () => {
    if (text.value.trim().length > 0) {
        generateQR();
    } else {
        text.classList.add('empty-error');
        setTimeout(()=>{
            text.classList.remove('empty-error');
        },500);
    }
};

// Handle the Download Button Click
download.addEventListener('click', () => {
    const img = document.querySelector('#qr-body img');
    if (img !== null) {
        const imageSrc = img.getAttribute('src');
        download.setAttribute('href', imageSrc);
    } else {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            download.setAttribute('href', canvas.toDataURL());
        }
    }
});

// Generate the QR Code
const generateQR = () => {
    qrContainer.innerHTML = ''; // Clear previous QR code
    new QRCode(qrContainer, {
        text: text.value,
        width: 150,
        height: 150,
        colorLight: '#ffffff',
        colorDark: '#000000',
    });

    // Make the container visible with animation
    qrContainer.style.display = 'flex';
    setTimeout(()=>{
        qrContainer.style.height = '150px';
        qrContainer.style.border = '2px solid #fff';
        qrContainer.style.margin = '20px auto';
        qrContainer.style.marginBottom = '30px';
    },10);
};

// Handle Generate Button Click
generate.addEventListener('click', (e) => {
    e.preventDefault();
    qrContainer.style.height = '0';
    qrContainer.style.border = 'none';
    qrContainer.style.margin = '0 auto';
    qrContainer.style.marginBottom = 'unset';
    isEmpty();
});

// Reset functionality
reset.addEventListener('click', () => {
    qrContainer.style.height = '0';
    setTimeout(()=>{
        qrContainer.style.display = 'none';
        qrContainer.style.border = 'none';
        qrContainer.innerHTML = '';
        qrContainer.style.margin = '0 auto';
        qrContainer.style.marginBottom = 'unset';
    },500);
    text.value = '';
});