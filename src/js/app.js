import '../css/index.scss';
import homeIcon from '../img/images.png';
import img2 from '../img/JPG-logo-highres.jpg';
import { secretButton, secretParagraph } from './dom-loader';

var homeImg = document.getElementById('home');
homeImg.src = homeIcon;

var showSecret = false;
[1, 2, 3].map(n => console.log(n ** 2));
secretButton.addEventListener('click', toggleSecretState);
updateSecretParagraph();

function toggleSecretState() {
    showSecret = !showSecret;
    updateSecretParagraph();
    updateSecretButton();
}

function updateSecretButton() {
    if (showSecret) {
        secretButton.textContent = 'Hide the Secret';
    } else {
        secretButton.textContent = 'Show the Secret';
    }
}

function updateSecretParagraph() {
    if (showSecret) {
        secretParagraph.style.display = 'block';
    } else {
        secretParagraph.style.display = 'none';
    }
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('http://localhost:8081/webpack-4.0.0/dist/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}