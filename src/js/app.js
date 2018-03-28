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

var SW_Enabled = false;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('').then(registration => {
    //     console.log('SW registered: ', registration);
    //     registration.pushManager.subscribe({ userVisibleOnly: true });
    // }).catch(registrationError => {
    //     console.log('SW registration failed: ', registrationError);
    // });

    navigator.serviceWorker.register('http://localhost:8081/svs-printers-and-bags/dist/sw.js', {
      scope: 'svs-printers-and-bags/dist/'
    }).then(function(serviceReg) {
      if ('pushManager' in serviceReg) {
        console.log(1);
      } else {
        console.log(0);
      }
      if (serviceReg.installing) {
        console.log('Service worker installing');
      } else if (serviceReg.waiting) {
        console.log('Service worker installed');
      } else if (serviceReg.active) {
        SW_Enabled = true;
        console.log('Service worker active');
      }

      // Check for showNotification support.
      if (!(serviceReg.showNotification)) {
        console.log('Notifications aren\'t supported on service workers.');
      } else {
        console.log('Notifications are supported on service workers.');
        serviceWorker.addEventListener("statechange", function(e) {
          console.log("sw statechange : ", e.target.state);
          if (e.target.state == "activated") {
            // use pushManger for subscribing here.
            console.log("Just now activated. now we can subscribe for push notification")
          }
        });
        serviceReg.pushManager.subscribe({
          userVisibleOnly: true
        });
      }

    }).catch(function(error) {
      // registration failed
      if (!SW_Enabled) {
        console.log('Registration failed with ' + error);
      }

    });

    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification('Notification with ServiceWorker');
        });
      }
    });


  });
}