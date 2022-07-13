/* jshint esversion: 8 */ 
window.addEventListener('DOMContentLoaded', () => {

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('#order'),
          modalClose = document.querySelector('[data-close]'),
          overlay =document.querySelector('.overlay'),
          chosenProduct = document.querySelector('[data-choice]'),
          title = document.querySelectorAll('.catalog-item__subtitle'),
          modalInput = document.querySelectorAll('.modal__input');

    modalInput.forEach(input => {
        input.required = true;
    });

    function openModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalTrigger.forEach((btn, i) => { 
        btn.addEventListener('click', () => {
            const findSame = Array.from(title).find((el, index) => index === i); // находит сам заголовок по индексу

            chosenProduct.value = findSame.textContent;
            openModal();
        });
    });

    modalClose.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape") {
            closeModal();
        }
    });
    
    const modalTimerId = setTimeout(openModal, 10000);


    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Form

    const form = document.querySelector('form');
    const message = {
        loading: 'img/spinner.png'
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();

            //Отправка данный в php
            request.open('POST', 'server.php');
            const formData = new FormData(form);

            request.send(formData);

            //Отправка данный в JSON
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            // const formData = new FormData(form);

            // const obj ={};
            // formData(function(value, key){ // это доработать
            //     obj[key] = value;
            // });

            // const json = JSON.stringify(obj);

            // request.send(json);

            request.addEventListener('load', () => {
                if(request.status === 200){
                    if(form.input === ''){
                        
                        const message = 'Заполните поле';
                        form.input.append(message);
                        console.log(message);
                    } else {
                        showThanksModal(); 
                        form.reset();
                        statusMessage.remove();
                    }
                    
                } else {
                    showFailureModal(); 
                }
            });
        });
    }
    postData(form);

    function showThanksModal(){

        modal.style.display = 'none';
        const thanksModal = document.querySelector('#thanks');
        thanksModal.style.display = 'block';
        
        document.querySelector('.overlay').append(thanksModal);
        setTimeout(() => {
            thanksModal.style.display = 'none';
            closeModal();
        }, 4000);
    }

    function showFailureModal(){

        modal.style.display = 'none';
        const failureModal = document.querySelector('#failure');
        failureModal.style.display = 'block';
        
        document.querySelector('.overlay').append(failureModal);
        setTimeout(() => {
            failureModal.style.display = 'none';
            closeModal();
        }, 4000);
    }

});
