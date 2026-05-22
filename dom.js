import { analyzeText, renderHistory } from './utils.js';
import history from './history.js';
const textarea = document.querySelector('#inputText');
const resultEl = document.querySelector('#result');
const statChars  = document.querySelector('#stat-chars');
const statWords  = document.querySelector('#stat-words');
const statTokens = document.querySelector('#stat-tokens');
const saveBtn = document.querySelector('#save-btn');
const clearBtn = document.querySelector('#clear-btn');

textarea.addEventListener('input', function() {
    const analysis = analyzeText(textarea.value);

    resultEl.textContent   = 'Estimated tokens: ' + analysis.tokens;
    statChars.textContent  = 'Characters: '        + analysis.characters;
    statWords.textContent  = 'Words: '             + analysis.words;
    statTokens.textContent = 'Estimated tokens: '  + analysis.tokens;

    saveBtn.disabled = textarea.value.trim() === '';
});

saveBtn.addEventListener('click', function() {
    if (textarea.value.trim() === '') return;
    const analysis = analyzeText(textarea.value);
    analysis.label = 'Snapshot ' + (history.length + 1) + ': ';
    analysis.timestamp = new Date().toLocaleTimeString();
    history.push(analysis);
    renderHistory();
});

clearBtn.addEventListener('click', function() {
    history.length=0
    renderHistory();
});