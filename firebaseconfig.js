
    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// import { useQuizStore } from "./src/stores/QuizStore";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyBRB03YPY2txw5hNK1gkrqV9f3r2qc7wV0",
    authDomain: "memoryapp-160c6.firebaseapp.com",
    projectId: "memoryapp-160c6",
    storageBucket: "memoryapp-160c6.appspot.com",
    messagingSenderId: "672540149120",
    appId: "1:672540149120:web:bb72de7775d6ff926d2d65",
    measurementId: "G-JM26FGFCKP"
    };


// Initialize Firebase
initializeApp(firebaseConfig);




// Obtenez l'instance de la messagerie de Firebase
const messaging = getMessaging();




console.log(daysSinceLastAnswered + '       ICI')
// Vérifiez si l'utilisateur n'a pas répondu au quiz depuis plus de 24 heures
if (daysSinceLastAnswered == 1) {
  // Définissez le contenu de la notification push
  const notification = {
    title: "Quiz time !",
    body: "Votre quiz vous attend ! :) ",
    icon: "chemin/vers/icone.png"
  };

  // Envoyez la notification push à l'utilisateur
  messaging
    .sendNotification(console.log('bibi'), notification)
    .then(() => {
      console.log("Notification envoyée avec succès !");
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la notification :", error);
    });
}
