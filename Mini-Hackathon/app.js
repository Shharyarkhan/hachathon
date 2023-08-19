import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyB7aH7xCpPc_6zuL5M0TgrjS3dQ0x-mji8",
    authDomain: "today-79c71.firebaseapp.com",
    projectId: "today-79c71",
    storageBucket: "today-79c71.appspot.com",
    messagingSenderId: "449655177118",
    appId: "1:449655177118:web:25a3055369880270abe08f"
};
import { doc, setDoc, getFirestore, addDoc  ,collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const signupForm = document.getElementById('signup-form');
signupForm && signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');


    // if (password !== repeatPassword) {
    //     console.log("Passwords do not  match.");
    //     return;
    // }
    let obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
    }
    console.log(obj)
    try {
        console.log("Signup successful!");
    } catch (error) {
        console.error(error);
        console.log("Signup failed. Please try again.");
    }
  

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user, "Succesful")
            alert("User Succefull registerd")
            window.location.href = "dashboad.html";
            await setDoc(doc(db, "user", user.uid), {
                email: email.value,
                password: password.value
            });
            const docRef = await addDoc(collection(db, "user"), {
                email:
                password
              });
              console.log("Document written with ID: ", docRef.id);
              
        })
        
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, "Error")

        });
});
let logbtn = document.getElementById("login");
logbtn.addEventListener("click", () => {
    const lgemail = document.getElementById('lgemail');
    const lgpassword = document.getElementById('lgpassword');
    signInWithEmailAndPassword(auth, lgemail.value, lgpassword.value)
        .then((userCredential) => {

            const user = userCredential.user;
            console.log('succecus', user)
            location.pathname = 'profile.html';
        })
        .catch((error) => {
            //   const errorCode = error.code;
            //   const errorMessage = error.message;
            console.log(error)
        });



})





  