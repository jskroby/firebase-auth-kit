const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle passkey login
async function handlePasskeyLogin() {
  try {
    const user = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log("✅ Passkey sign-in successful:", user.user.email);
  } catch (err) {
    console.error("❌ Passkey sign-in error:", err);
  }
}

// Fallback Email Link login
function sendMagicLink() {
  const email = document.getElementById("emailInput").value;
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true
  };

  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
      alert("✅ Magic link sent to your email.");
    })
    .catch(err => {
      console.error("❌ Magic link error:", err);
    });
}

// Auto sign-in via link
window.onload = () => {
  if (auth.isSignInWithEmailLink(window.location.href)) {
    const email = window.localStorage.getItem("emailForSignIn");
    auth.signInWithEmailLink(email, window.location.href)
      .then(result => {
        console.log("✅ Signed in with email:", result.user.email);
      })
      .catch(console.error);
  }
};