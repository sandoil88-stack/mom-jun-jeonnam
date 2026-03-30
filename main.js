const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
const themeToggle = document.getElementById('theme-toggle');

// Theme Logic
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
};

const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(theme);
});

const getNumberColorVar = (number) => {
    if (number <= 10) return 'var(--num-1)';
    if (number <= 20) return 'var(--num-2)';
    if (number <= 30) return 'var(--num-3)';
    if (number <= 40) return 'var(--num-4)';
    return 'var(--num-5)';
};

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        const lottoNumber = document.createElement('div');
        lottoNumber.classList.add('lotto-number');
        lottoNumber.textContent = number;
        lottoNumber.style.backgroundColor = getNumberColorVar(number);
        lottoNumber.style.animationDelay = `${index * 0.1}s`;
        lottoNumbersContainer.appendChild(lottoNumber);
    });

    copyBtn.textContent = 'Copy Numbers';
});

copyBtn.addEventListener('click', () => {
    const numbersText = Array.from(lottoNumbersContainer.children)
        .map(child => child.textContent)
        .join(', ');

    if (numbersText) {
        navigator.clipboard.writeText(numbersText)
            .then(() => {
                copyBtn.textContent = 'Copied!';
            })
            .catch(err => {
                console.error('Failed to copy numbers: ', err);
            });
    }
});
