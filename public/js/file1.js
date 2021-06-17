
const Form=document.querySelector('form');
const searchElement=document.querySelector('input');
const message1=document.querySelector('#error');
const message2=document.querySelector('#msg');


Form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const loc=searchElement.value;

    message1.textContent='Loading....';
    message2.textContent='';

    fetch('/weather?address='+loc).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           message1.textContent=(data.error);
           message2.textContent='';
        }
        else {
            message1.textContent=(data.location)
            message2.textContent=(data.forecast);
        }
    })
})
})

