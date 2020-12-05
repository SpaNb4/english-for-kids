/* eslint-disable object-curly-newline */
import { cardsDiv, menuBtn, menuUl, gameModeBtn, startGameBtn, statsBtn, categoriesName, menuPopup } from './const';
import cardsArr from './cards';
// eslint-disable-next-line import/no-cycle
import { English, msg, synth } from './index';

// cards click
cardsDiv.addEventListener('click', (e) => {
    English.setCategories('.card', e);
});

// not menu click
document.body.addEventListener('click', (e) => {
    if (e.target !== menuUl && e.target !== menuBtn) {
        if (menuPopup.classList.contains('active')) {
            English.menuToggle();
        }
    } else if (e.target === menuUl) {
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
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));

            // eslint-disable-next-line no-param-reassign
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
    English.clearActiveMenu();
    categoriesName.innerHTML = 'Statistics';
    statsBtn.style.display = 'none';
    English.isStatsPage = true;
    English.isStartPage = false;
    const statsDiv = document.createElement('div');
    statsDiv.classList.add('stats');
    statsDiv.innerHTML = `<div class="stats_buttons">
                            <a href="#" class="repeat_btn">Repeat difficult words</a>
                            <a href="#" class="reset_btn">Reset</a>
                          </div>`;
    cardsDiv.append(statsDiv);

    const statsTable = document.createElement('div');
    statsTable.classList.add('stats_table');

    function setTable() {
        statsTable.innerHTML = `<table>
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
                              </table>`;

        statsDiv.append(statsTable);

        let n = 0;
        for (let i = 1; i < cardsArr.length; i += 1) {
            for (let j = 0; j < cardsArr[i].length; j += 1) {
                const lastTr = document.querySelector('.stats_table tbody');
                const tr = document.createElement('tr');
                if (cardsArr[i][j].word in English.statsArr) {
                    // can calculate percent
                    if (English.statsArr[cardsArr[i][j].word].playCorrCount !== 0) {
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
            n += 1;
        }
        // eslint-disable-next-line no-new, no-undef
        new Tablesort(document.querySelector('.stats_table table'));
    }

    setTable();

    const repeatBtn = document.querySelector('.repeat_btn');
    repeatBtn.addEventListener('click', () => {
        English.isStatsPage = false;
        English.isStartPage = false;
        English.checkMode();
        // sort object by corrPerc
        let sortByPercArr = Object.entries(English.statsArr).slice(0);
        sortByPercArr = sortByPercArr.filter((el) => el[1].corrPerc !== 0);

        sortByPercArr.sort((a, b) => a[1].corrPerc - b[1].corrPerc);
        let n = 0;
        if (sortByPercArr.length <= 8) {
            n = sortByPercArr.length;
        } else {
            n = 8;
        }
        // sorted words to repeat
        const sortWordsArr = [];
        for (let i = 0; i < n; i += 1) {
            // eslint-disable-next-line prefer-destructuring
            sortWordsArr[i] = sortByPercArr[i][0];
        }
        English.clearCards();
        English.setCards(null, sortWordsArr);
    });

    const resetBtn = document.querySelector('.reset_btn');
    resetBtn.addEventListener('click', () => {
        English.statsArr = {};
        localStorage.removeItem('stats');
        setTable();
    });
});
