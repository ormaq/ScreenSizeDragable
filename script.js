function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        if (element) element.style.cursor = 'grab';
    });
}


// Apply draggable functionality to the initial box
const draggableBox = document.getElementById('draggable-box');
makeDraggable(draggableBox);

const screenSizes = {
    "240p": { width: 426, height: 240, color: "#e74c3c" },
    "480p": { width: 854, height: 480, color: "#e67e22" },
    "720p": { width: 1280, height: 720, color: "#f39c12" },
    "1080p": { width: 1920, height: 1080, color: "#3498db" },
    "1440p": { width: 2560, height: 1440, color: "#9b59b6" },
    "4k": { width: 3840, height: 2160, color: "#2ecc71" },
    "8k": { width: 7680, height: 4320, color: "#95a5a6" }
};

document.querySelectorAll('.screen-sizes button').forEach(button => {
    button.addEventListener('click', (e) => {
        const size = e.target.getAttribute('data-size');
        const specs = screenSizes[size];
        const newBox = document.createElement('div');
        
        newBox.style.width = specs.width + "px";
        newBox.style.height = specs.height + "px";
        newBox.style.backgroundColor = specs.color;
        newBox.style.position = "absolute";
        newBox.style.left = (window.innerWidth / 2 - specs.width / 2) + "px";
        newBox.style.top = (window.innerHeight / 2 - specs.height / 2) + "px";
        newBox.style.border = "5px solid #2c3e50";
        newBox.style.cursor = 'grab';
        document.body.appendChild(newBox);

        // Add text overlay with the size
        const sizeText = document.createElement('div');
        sizeText.className = 'box-text';
        sizeText.innerText = size;
        newBox.appendChild(sizeText);

        // Apply draggable functionality to the new box
        makeDraggable(newBox);
    });
});
