const signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  // console.log(provider)
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      window.location = "writeNote.html";
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      const err = {
        errorCode,
        errorMessage,
        email,
        credential
      };
      console.log(err);
    });
};


firebase.auth().languageCode = "it";
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("phone", {
  size: "invisible",
  callback: response => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

function onSignInSubmit() {
  console.log("im here");
  phoneIn();
}

function phoneIn() {}
document.querySelector("#submit").addEventListener("click", e => {
  const phoneNumber = "+16476490936";
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then(confirmationResult => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log("here");
      // ...
    })
    .catch(error => {
      // Error; SMS not sent
      // ...
      grecaptcha.reset(window.recaptchaWidgetId);
    });
});
// const phoneNumber = getPhoneNumberFromUserInput();
