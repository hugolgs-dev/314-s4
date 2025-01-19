document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('mousemove', (event) => {
        const shadowBox = document.querySelector('.shadow-box');
        shadowBox.style.left = `${event.pageX}px`;
        shadowBox.style.top = `${event.pageY}px`;
    })

})