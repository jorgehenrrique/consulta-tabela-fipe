const loadLed = document.querySelectorAll('#led');

function enableElements(index) {
    if (index < loadLed.length) {
        loadLed[index].classList.add('load-led');
        setTimeout(() => enableElements(index + 1), 200);
    }
}
enableElements(0);
