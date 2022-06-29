window.addEventListener('DOMContentLoaded', () => {
    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          overlay =document.querySelector('.overlay'),
          thanks = document.querySelector('#thanks'),
          modal = document.querySelector('#order'),
          closeModalBtn = document.querySelector('[data-close]'),
          submit = document.querySelector('.button_submit'),
          subtitle = document.querySelectorAll('.catalog-item__subtitle'),
          chosenProduct = document.querySelector('[data-choice]');

    modalTrigger.forEach(btn => { 
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productChosen = subtitle;
            let name;

            for(let i = 0; i < productChosen.length; i++){
                if( i === modalTrigger[i]){
                    name = productChosen[i].innerHTML;
                    return name;
                }
            }
            
            chosenProduct.value = name;
            modal.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });




    // function processEvent(event) {
    //     var dataset = event.target.dataset;
      
    //     modal.style.display = 'block';
    //     overlay.style.display = 'block';
    //     document.body.style.overflow = 'hidden';

    //     input.value = subtitle[dataset];
      
    //     event.preventDefault();
    //     console.log(input.value);
    //   }

    // for (let i = 0; i < modalTrigger.length; i++) {
    //     modalTrigger[i].addEventListener('click', processEvent);
    //   }

    function thank() {
        thanks.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        closeModalBtn.addEventListener('click', closeModal);
        setTimeout(closeModal, 2000);
    }

    submit.addEventListener('click', () => {
        validateForms('#modal form');
        closeModal();
        thank();

    });

    function closeModal() {
        modal.style.display = 'none';
        thanks.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
    closeModalBtn.addEventListener('click', closeModal);

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
    
        function validateForms(form){
            $(form).validate({
                rules: {
                    name: "required",
                    phone: "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: "Пожалуйста, введите свое имя",
                    phone: "Пожалуйста, введите свой телефон",
                    email: {
                      required: "Пожалуйста, введите свою почту",
                      email: "Неправильно введен адрес почты"
                    }
                }
            });
        }
    
        
        
        $('input[name=phone]').mask("+7 (999) 999-99-99");
    
        $('form').submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function(){
                $(this).find("input").val("");
                $('#modal').fadeOut();
                $('.overlay, #thanks').fadeIn ();
                $('form').trigger('reset');
            });
            return false;
        });
    
        $(window).scroll(function(){
            if($(this).scrollTop() > 1600) {
                $('.pageup').fadeIn();
            }else {
                $('.pageup').fadeOut();
            }
        });
    
        $("a[href=#up]").click(function(){
            const _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
    
});
