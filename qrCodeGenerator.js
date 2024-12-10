import QRCode from 'qrcode';

const githubProfile = 'https://github.com/DanielWilliamParsons'

QRCode.toFile('daniel-github-qrcode.png', githubProfile, {
    color: {
        dark: '#000000',
        light: '#f0f4f9'
    }
}, (err) => {
    if (err) {
        console.error("Error generating QR code", err);
    } else {
        console.log('QR code generated!');
    }
})