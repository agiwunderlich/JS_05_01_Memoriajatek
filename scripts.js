const gridSize = 4;

let tableGrid = document.getElementById('grid');
let cards = [];
let activeCards = [];
let blocked = false;

// feliratkozás

window.addEventListener('cardClick', OnCardClick);


// init

RenderTable();

/////////////////////////////////////////////////

function RenderTable() {


    cardValues = [];
    for (let valueIndex = 1; valueIndex <= gridSize * gridSize / 2; valueIndex++) {
        cardValues.push(valueIndex);
        cardValues.push(valueIndex);

    }

    Shuffle(cardValues);

    let cardValueIndex = 0;
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        let newRow = document.createElement('tr');
        cards.push([]);

        for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            let newCell = document.createElement('td');

            newCell.innerText = cardValues[cardValueIndex];

            newRow.appendChild(newCell);

            cards[rowIndex].push(new Card(cardValues[cardValueIndex], newCell));
            cardValueIndex++;

        }

        tableGrid.appendChild(newRow);

    }
}

function Shuffle(itemCollection) {

    for (let index = itemCollection.length - 1; index >= 0; index--) {
        let randomIndex = Math.round(Math.random() * index);

        // csere
        let temp = itemCollection[index];
        itemCollection[index] = itemCollection[randomIndex];
        itemCollection[randomIndex] = temp;

    }

    return itemCollection;

}

function OnCardClick(event) {

    if (blocked) {
        return;
    }

    let clickedCard = event.detail;
    activeCards.push(clickedCard);

    // ha legalább 2 activeCards van
    if (activeCards.length >= 2) {
        TriggerBlocked();



        // ha egyenlő a két kártya
        if (activeCards[0].value == activeCards[1].value) {
            while (activeCard = activeCards.pop()) {
                activeCard.SetResolved();
            }
            TriggerUnBlocked();

            // ha nem egyenlő    
        } else {
            setTimeout(function () {
                while (activeCard = activeCards.pop()) {
                    activeCard.ToggleColor();
                }
                TriggerUnBlocked();
            }, 1000);
        }
    }

}


function TriggerBlocked() {
    window.dispatchEvent(
        new Event('gameBlocked')
    );
}

function TriggerUnBlocked() {
    window.dispatchEvent(
        new Event('gameUnBlocked')
    );
}