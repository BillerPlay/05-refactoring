import history from './history.js';
const historyList = document.querySelector('#history-list');
export function cleanText(text){
    return text.trim();
}

export function splitIntoWords(text){
    return text.split(" ");
}

export function removeEmptyWords(words) {
    return words.filter(
        function(word) {
            return word !== "";
        }
    );
}

export function estimateTokens(words) {
    return Math.ceil(words.length * 0.75);
}

export function countTokens(text) {
    const cleaned = cleanText(text);
    const words = splitIntoWords(cleaned);
    const filtered = removeEmptyWords(words);
    return estimateTokens(filtered);
}

export function analyzeText(text) {
    const cleaned = cleanText(text);
    const words = splitIntoWords(cleaned);
    const filtered = removeEmptyWords(words);
  
    return {
      characters: cleaned.length,
      words: filtered.length,
      tokens: estimateTokens(filtered)
    };
}

export function renderHistory() {
    historyList.innerHTML = '';
    if (history.length === 0) return;
    const maxTokens = Math.max(...history.map(function(e) { return e.tokens; }));

    history.forEach(function(entry) {
        const li = document.createElement('li');
        const text = document.createElement('span');
        text.textContent = entry.label + ' ' + entry.tokens + ' tokens, ' + entry.words + ' words, ' + entry.characters + ' characters'  + ' — ' + entry.timestamp;
        li.appendChild(text);
    
        if (entry.tokens === maxTokens) {
            const badge = document.createElement('span');
            badge.className = 'peak-badge';
            badge.textContent = 'Peak';
            li.appendChild(badge);
        }
    
        historyList.appendChild(li);
    });
    

}