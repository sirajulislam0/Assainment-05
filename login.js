console.log('Log in page added to my page ');

document.getElementById('login-btn').addEventListener('click', function () {


    // 1  get the mobile number 

    const numberInput = document.getElementById('input-number');
    const contactNumber = numberInput.value;
    console.log(contactNumber);



    // 2  get the pin

    const pinInput = document.getElementById('input-pin');
    const pin = pinInput.value;
    console.log(pin);

    if (contactNumber === 'admin' && pin === 'admin123') {
        // 3-1  true-->> aleart -- homepage
        alert('LogIn Success');
        window.location.assign('./home.html');
    } else {
        // 3-1 false -->> aleart -- return
        alert('LogIn Failed');
        return;


    }





})
