
        const  init =() => {
        const validateEmail = (event) =>{
        const input = event.currentTarget;
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const emailTest = regex.test(input.value);

        inputPassword.addEventListener('input', validatePassword);
        inputEmail.addEventListener('input', validateEmail);


        if (!emailTest) {
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        }else {
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }

    }
        
        const validatePassword = (event) => {
        const input = event.currentTarget;  
        
        if(input.value.length < 8) {
            submitButton.setAttribute('disabled','disabled');
            input.nextElementSibling.classList.add('error');
        } else {
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');

        }
    }

        
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.login_submit');


    const successHandler = () =>{   
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Sent! :)";

    }   

        const errorHandler = () => {
            submitButton.classList.remove('success');
            submitButton.classList.add('error');
            submitButton.textContent = "Erro :(";
        }

    if(submitButton) {
        submitButton.addEventListener('click',(event) => {
        event.preventDefault();

        submitButton.textContent = "....Loading ";
    
        fetch('https://reqres.in/api/users?page=2',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail.value,
          password: inputPassword.value,  
             })
         }).then((response) => {
             if (response.status !== 200) {
                return errorHandler();
             } 
          }).catch(()=> {
              successHandler();
          } )

        })
    
    }

}

window.onload = init;