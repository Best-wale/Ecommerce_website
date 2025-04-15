function login(params) {

    loginModal.classList.remove("hidden");
    closeloginButton.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });

}
function Signup(params) {
    alert("onsole.logsignup clicked")
    SignupModal.classList.remove("hidden");
    closeSignupButton.addEventListener('click', () => {
        SignupModal.classList.add('hidden');
    });


}