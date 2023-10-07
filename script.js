document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const moveCounter = document.getElementById('move-counter');
    const pieces = Array.from({ length: 16 }, (_, index) => index + 1);
    let moves = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createPuzzle() {
        container.innerHTML = '';
        shuffle(pieces);
        pieces.forEach(piece => {
            const div = document.createElement('div');
            div.className = 'puzzle-piece';
            div.dataset.value = piece;
            div.textContent = piece === 16 ? '' : piece;
            div.addEventListener('click', movePiece);
            container.appendChild(div);
        });
        moves = 0;
        moveCounter.textContent = moves;
    }

    function movePiece(event) {
        const clickedPiece = event.target;
        const emptyPiece = [...container.children].find(piece => piece.dataset.value == '16');
        const clickedIndex = Array.from(container.children).indexOf(clickedPiece);
        const emptyIndex = Array.from(container.children).indexOf(emptyPiece);

        const [row1, col1] = [Math.floor(clickedIndex / 4), clickedIndex % 4];
        const [row2, col2] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

        if (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1) {
            [clickedPiece.dataset.value, emptyPiece.dataset.value] = [emptyPiece.dataset.value, clickedPiece.dataset.value];
            [clickedPiece.textContent, emptyPiece.textContent] = [emptyPiece.textContent, clickedPiece.textContent];
            moves++;
            moveCounter.textContent = moves;
        }
    }

    shuffleButton.addEventListener('click', createPuzzle);
    createPuzzle();
});
