import './assets/scss/main.scss';
import cardsArr from './cards';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./assets/sounds/', true, /\.mp3$/));

let cardsDiv = document.querySelector('.cards');
let menuUl = document.querySelector('.menu_ul');
let cardDiv;

const English = {
    isStartPage: true,
    isGameMode: false,
    isGame: false,
    wasWrong: 0,

    init() {
        // set categories
        this.setCards(0);

        // set menu
        for (let i = 0; i < cardsArr[0].length; i++) {
            let menuLi = document.createElement('li');
            menuLi.innerHTML = `<a href="#">${cardsArr[0][i].word}</a>`;
            menuUl.append(menuLi);
        }
    },

    clearCards() {
        for (let i = 0; i < cardDiv.length; i++) {
            cardDiv[i].remove();
        }
    },

    setCards(n) {
        for (let i = 0; i < cardsArr[n].length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<div class="card_img">
                                 <img src="./assets/${cardsArr[n][i].image}" alt="">
                             </div>
                             <div class="card_name">${cardsArr[n][i].word}</div>`;
            if (cardsArr[n][i].audioSrc) {
                card.dataset.audio = cardsArr[n][i].audioSrc;
            }
            cardsDiv.append(card);
        }
        cardDiv = document.querySelectorAll('.card');
    },
};

window.addEventListener('DOMContentLoaded', () => {
    English.init();

    cardsDiv.addEventListener('click', (e) => {
        setCategories('.card', '.card_name', e);
    });

    let menuBtn = document.querySelector('.menu_btn');
    let menuPopup = document.querySelector('.menu_popup');

    menuBtn.addEventListener('click', () => {
        menuPopup.classList.toggle('active');
    });

    menuUl.addEventListener('click', (e) => {
        setCategories('.menu_ul', '.menu_ul a', e);
        menuPopup.classList.toggle('active');
    });

    function setCategories(trg, trg_cat, e) {
        let clickedCard = e.target.closest(trg);
        console.log(clickedCard);
        let catName = document.querySelector(trg_cat);
        console.log(catName);
        if (clickedCard && English.isStartPage) {
            let categoriesPos = 0;
            for (let i = 0; i < cardsArr[0].length; i++) {
                if (cardsArr[0][i].word == catName.innerHTML) {
                    categoriesPos = i + 1;
                }
            }
            English.clearCards();

            English.setCards(categoriesPos);
            English.isStartPage = !English.isStartPage;
        } else if (clickedCard) {
            const sound = new Audio(clickedCard.dataset.audio);
            sound.play();
        }
    }
});
