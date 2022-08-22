'use strict';

const menu = () => {
    const btnHeader = document.querySelector('.header__button'),
    menuHeader = document.querySelector('.header__menu');

    menuHeader.addEventListener('click', (event) => {
        let target = event.target,
            btn = target.closest('.header__button'),
            items = target.closest('.menu-header__item'),
            menu = target.closest('.header__menu');

        if (btn) {
            menuHeader.classList.toggle('active');
        }
        if (items) {
            menuHeader.classList.remove('active');
        }
    })
};
menu();

const menuPosition = () => {
    const intro = document.querySelector('.intro'),
        header = document.querySelector('.header');
    

    const checkingHeight = () => {
        if (window.pageYOffset >= intro.offsetHeight) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    }
    checkingHeight();

    document.addEventListener('scroll', () => {
        checkingHeight();
    });
};
menuPosition();

const scrollTo = () => {
    const element = document.querySelectorAll('section.section'),
        menuItem = document.querySelectorAll('.menu-header__item'),
        menu = document.querySelector('.menu-header'),
        worksBtn = document.querySelector('.intro__btn'),
        portfolioSection = document.getElementById('portfolio');

    const scroll = (target) => {
        menuItem.forEach((item, index) => {
            if (item === target) {
                element[index].scrollIntoView({behavior: "smooth", block: "start"});
            }
        });
    };
    worksBtn.addEventListener('click', (event) => {
        event.preventDefault();
        portfolioSection.scrollIntoView({behavior: "smooth", block: "start"});
    });
    menu.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;
        if (!target.matches('a')) {
            return
        }
        else {
            scroll(target);
            target.classList.add('menu-item_active');
            menuItem.forEach((item) => {
                if (target === item) {
                    item.classList.add('menu-item_active');
                } else {
                    item.classList.remove('menu-item_active');
                }
            })
        }
    });
};
scrollTo();

const playVideo = () => {
    const btnStart = document.querySelector('.media__btn'),
        video = document.querySelector('video');
    let btn = false;

    btnStart.addEventListener('click', (event) => {
        if (!btn) {
            video.play()
        }
        if (btn) {
            video.pause();
        }
        btn = !btn;
        btnStart.classList.toggle('active');
    });
};
playVideo();

const doubleSlider = (selector1, selector2, selector3) => {
    const elements1 = document.querySelectorAll(selector1),
        elements2 = document.querySelectorAll(selector2),
        parentElem = document.querySelector(selector3);

    parentElem.addEventListener('click', (event) => {
        let target = event.target,
            temp;

        target = target.closest(selector1);
        if (!target) {
            return;
        }
        elements1.forEach((item, index) => {
            if (item === target) {
                temp = index;
                item.classList.add('active');
                elements2[index].classList.add('active');
            } else {
                item.classList.remove('active');
                elements2[index].classList.remove('active');
            }
        })

    });
};
doubleSlider('.team__column', '.mind__row', '.team__row');
doubleSlider('.dots__item', '.testimonials__element', '.testimonials__dots');
doubleSlider('.item-cart','.blog__element','.blog__item');

const checkingInput = () => {
    const inputEmail = document.querySelector('.input__email'),
        inputName = document.querySelector('.input__name'),
        inputSubscribe = document.querySelector('.subscribe__form input'),
        popupInputs = document.querySelectorAll('.popup input'),
        popupBtn = document.querySelector('.popup__send'),
        btnSubscribe = document.querySelector('.subscribe__form button'),
        btnContact = document.querySelector('.getintouch__btn');

    const check = (inputs, btn) => {
        inputs.forEach((item) => {
            if (!item.value.trim()) {
                btn.disabled = true;
            } else {
                btn.disabled = false;
            }
        })
    };

   [inputName, inputEmail, inputSubscribe, ...popupInputs].forEach((item) => {
        item.addEventListener('input', () => {
            check([inputEmail, inputName], btnContact);
            check([inputSubscribe], btnSubscribe);
            check([...popupInputs], popupBtn);
        });
   });
};
checkingInput();

const sendData = () => {
    const contactForm = document.querySelector('.getintouch__form'),
        subscribeForm = document.querySelector('.subscribe__form'),
        popupForm = document.querySelector('.popup__form'),
        element = document.createElement('div'),
        messages = {
            success: 'Thanks, we will soon contact you!',
            error: 'Error! Something went wrong',
            loading: 'Loading...'
        };

    element.classList.add('status');

    const postData = (body, url) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
    const sendForm = (form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputs = form.querySelectorAll('input'),
                textArea = form.querySelector('textarea');
            let body = {};
    
            form.append(element);
            element.textContent = messages.loading;
    
            const formData = new FormData(form);
            for (let val of formData.entries()) {
                body[val[0]] = val[1];
            };
            inputs.forEach((item) => {
                item.value = '';
            });
            if (textArea) {
                textArea.value = '';
            }
            postData(body)
                .then(() => {
                    element.textContent = messages.success;
                    setTimeout(() => {
                        element.textContent = ''
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                    element.textContent = messages.error;
                    setTimeout(() => {
                        element.textContent = '';
                        element.remove();
                    }, 3000);
                })
                .finally(() => {
                    console.log('All is working');
                });
        });
    };
    sendForm(contactForm);
    sendForm(subscribeForm);
    sendForm(popupForm);

};
sendData();

const disableBtn = () => {
    const btnSubscribe = document.querySelector('.subscribe__form button'),
        btnContact = document.querySelector('.getintouch__btn'),
        btnPopup = document.querySelector('.popup__send');
    
    btnSubscribe.disabled = true;
    btnContact.disabled = true;
    btnPopup.disabled = true;
}
disableBtn();

const changeActiveItem = () => {
    const sections = document.querySelectorAll('.section'),
        menuHeaderItem = document.querySelectorAll('.menu-header__item');

    window.addEventListener('scroll', () => {
        let scrollDistance = window.scrollY;

        sections.forEach((item, index) => {
            if (item.offsetTop <= scrollDistance) {
                menuHeaderItem.forEach((item) => {
                    item.classList.remove('menu-item_active');
                })
                menuHeaderItem[index].classList.add('menu-item_active');
            }
        });
    });
   
};
changeActiveItem();

const togglePopup = () => {
    const buttons = document.querySelectorAll('.getStarted'),
        popup = document.querySelector('.popup'),
        popupBody = document.querySelector('.popup__body'),
        btnClose = document.querySelector('.popup__button');

    buttons.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            popup.classList.add('active');
        });
    })
    popup.addEventListener('click', (event) => {
        let target = event.target,
            body = target.closest('.popup__body'),
            btnClose = target.closest('.popup__button');
        if (!body) {
            popup.classList.remove('active');
            return;
        }
        if (btnClose) {
            popup.classList.remove('active');
        }
    })

};
togglePopup();