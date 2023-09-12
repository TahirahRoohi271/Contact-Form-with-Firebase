import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// import Swal from 'sweetalert2'; // Import SweetAlert

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDCtFX7b-cjlB3x-ZY2v3mD853j0xDgROQ",
    authDomain: "contact-f24da.firebaseapp.com",
    databaseURL: "https://contact-f24da-default-rtdb.firebaseio.com",
    projectId: "contact-f24da",
    storageBucket: "contact-f24da.appspot.com",
    messagingSenderId: "544012313161",
    appId: "1:544012313161:web:4bc31c0bb17c218a939598"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;


    if (!name || !email || !message) {
      Swal.fire({
          icon: 'error',
          title: 'Missing Information',
          text: 'Please fill in all fields.',
      });
      return; // Exit the function
    }
    // Check email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return; // Exit the function
    }

    // Check if the message has at least 30 words
    const wordCount = message.split(/\s+/).length;
    if (wordCount < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Message Too Short',
            text: 'Please write a message with at least 10 words.',
        });
        return; // Exit the function
    }

    try {
        const docRef = await addDoc(collection(db, 'contacts'), {
            name: name,
            email: email,
            message: message,
        });
        console.log('Document written with ID: ', docRef.id);

        // Show success message with SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Message sent successfully!',
        });

        contactForm.reset();
    } catch (error) {
        console.error('Error sending message: ', error);

        // Show error message with SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again later.',
        });
    }
});
