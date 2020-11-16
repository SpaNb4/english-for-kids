import './assets/scss/main.scss';
import cardsArr from './cards';

let cardsDiv = document.querySelector('.cards');
let cardDiv;

const English = {
    isStartPage: true,
    isGameMode: false,
    isGame: false,
    wasWrong: 0,
};

function init() {
    // set categories 
    setCards(0);
}

function clearCards() {
    for (let i = 0; i < cardDiv.length; i++) {
        cardDiv[i].remove();
    }
}

function setCards(n) {
    for (let i = 0; i < cardsArr[n].length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<div class="card_img">
                             <img src="./assets/${cardsArr[n][i].image}" alt="">
                         </div>
                         <div class="card_name">${cardsArr[n][i].word}</div>`;
        cardsDiv.append(card);
    }
    cardDiv = document.querySelectorAll('.card');
}

window.addEventListener('DOMContentLoaded', () => {
    init();

    cardsDiv.addEventListener('click', (e) => {
        let clickedCard = e.target.closest('.card');
        if (clickedCard) {
            let categoriesPos = 0;
            for (let i = 0; i < cardsArr[0].length; i++) {
                if (cardsArr[0][i].word == clickedCard.childNodes[2].innerHTML) {
                    categoriesPos = i + 1;
                }
            }
            clearCards();
            setCards(categoriesPos);
        }
    });
});
