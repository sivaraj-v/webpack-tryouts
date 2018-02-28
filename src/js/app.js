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
