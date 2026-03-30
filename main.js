
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers-container');

const getNumberColor = (number) => {
    if (number <= 10) return '#ffde59'; // Yellow
    if (number <= 20) return '#4d91ff'; // Blue
    if (number <= 30) return '#ff5757'; // Red
    if (number <= 40) return '#aaaaaa'; // Grey
    return '#4caf50'; // Green
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
        lottoNumber.style.backgroundColor = getNumberColor(number);
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
