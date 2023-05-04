const loadLed = document.querySelectorAll('.lede');

function enableElements(index) {
    if (index < loadLed.length) {
        loadLed[index].classList.add('load-led');
        setTimeout(() => enableElements(index + 1), 20);
    }
}
enableElements(0);
