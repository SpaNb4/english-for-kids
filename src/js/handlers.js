import { cardsDiv, menuBtn, menuUl, gameModeBtn, startGameBtn, statsBtn, scoreDiv, categoriesDiv, categoriesName, menuPopup } from './const';
import cardsArr from './cards';
import { English, msg, synth } from './index';

// cards click
cardsDiv.addEventListener('click', (e) => {
    English.setCategories('.card', e);
});

// not menu click
document.body.addEventListener('click', (e) => {
    if (e.target != menuUl && e.target != menuBtn) {
        if (menuPopup.classList.contains('active')) {
            English.menuToggle();
        }
    } else if (e.target == menuUl) {
        English.menuToggle();
    }
});

// menu btn click
menuBtn.addEventListener('click', () => {
    English.menuToggle();
});

// menu links click
menuUl.addEventListener('click', (e) => {
    English.setCategories('.menu_ul li', e);
    English.menuToggle();
});

// game mode switch
gameModeBtn.addEventListener('click', () => {
    English.checkMode();
});

startGameBtn.addEventListener('click', () => {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    // game not start
    if (!English.isGameStart) {
        shuffle(English.wordsArr);
        // first word sound
        msg.text = `${English.wordsArr[English.currNumberWord]}`;
        synth.speak(msg);
        startGameBtn.innerHTML = '<img src="./assets/img/flip_btn.svg" alt="Repeat">Repeat';
        startGameBtn.style.background = '#115599';
        startGameBtn.style.border = '2px solid #115599';
        English.isGameStart = true;
        // game start
    } else {
        // repeat word sound
        msg.text = `${English.wordsArr[English.currNumberWord]}`;
        synth.speak(msg);
    }
});

statsBtn.addEventListener('click', () => {
    English.clearCards();
    categoriesName.innerHTML = 'Statistics';
    statsBtn.style.display = 'none';
    English.isStatsPage = true;
    function setTable() {
        cardsDiv.innerHTML = '';
        let statsDiv = document.createElement('div');
        statsDiv.classList.add('stats');
        statsDiv.innerHTML = `<div class="stats_buttons">
                                <a href="#" class="repeat_btn">Repeat difficult words</a>
                                <a href="#" class="reset_btn">Reset</a>
                              </div>
                              <div class="stats_table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Word</th>
                                            <th>Translation</th>
                                            <th>Category</th>
                                            <th>Trained</th>
                                            <th>Correct</th>
                                            <th>Wrong</th>
                                            <th>Correct, %</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                              </div>`;
        cardsDiv.append(statsDiv);

        let n = 0;
        for (let i = 1; i < cardsArr.length; i++) {
            for (let j = 0; j < cardsArr[i].length; j++) {
                let lastTr = document.querySelector('.stats_table tbody');
                let tr = document.createElement('tr');
                if (cardsArr[i][j].word in English.statsArr) {
                    // can calculate percent
                    if (English.statsArr[cardsArr[i][j].word].playCorrCount != 0) {
                        tr.innerHTML = `
                            <td>${cardsArr[i][j].word}</td>
                            <td>${cardsArr[i][j].translation}</td>
                            <td>${cardsArr[0][n].word}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].trainCount}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].playCorrCount}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].playWrongCount}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].corrPerc}</td>
                        `;
                        // can't calculate percent
                    } else {
                        tr.innerHTML = `
                        <td>${cardsArr[i][j].word}</td>
                        <td>${cardsArr[i][j].translation}</td>
                        <td>${cardsArr[0][n].word}</td>
                        <td>${English.statsArr[cardsArr[i][j].word].trainCount}</td>
                        <td>${English.statsArr[cardsArr[i][j].word].playCorrCount}</td>
                        <td>${English.statsArr[cardsArr[i][j].word].playWrongCount}</td>
                        <td>0</td>
                    `;
                    }
                    // default state
                } else {
                    tr.innerHTML = `
                                    <td>${cardsArr[i][j].word}</td>
                                    <td>${cardsArr[i][j].translation}</td>
                                    <td>${cardsArr[0][n].word}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                `;
                }
                lastTr.append(tr);
            }
            n++;
        }
        new Tablesort(document.querySelector('.stats_table table'));
    }

    setTable();

    let repeatBtn = document.querySelector('.repeat_btn');
    repeatBtn.addEventListener('click', () => {
        // sort object by corrPerc
        let sortByPercArr = Object.entries(English.statsArr).slice(0);
        sortByPercArr.sort(function (a, b) {
            if (a[1].corrPerc != 0 && b[1].corrPerc != 0) {
                return a[1].corrPerc - b[1].corrPerc;
            }
        });
        // sorted words to repeat
        let sortWordsArr = [];
        for (let i = 0; i < 8; i++) {
            sortWordsArr[i] = sortByPercArr[i][0];
        }
        English.clearCards();
        English.setCards(null, sortWordsArr);
    });

    let resetBtn = document.querySelector('.reset_btn');
    resetBtn.addEventListener('click', () => {
        English.statsArr = [];
        localStorage.removeItem('stats');
        setTable();
    });
});
