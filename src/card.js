class Card {

    constructor(value, element) {

        this.value = value;
        this.element = element;
        this.color = 'black';
        this.resolved = false;
        this.UpdateColor();
        this.blocked = false;

        this.element.addEventListener('click', () => {
            this.OnClick();
        });

        window.addEventListener('gameBlocked', () => {
            this.blocked = true;
        });

        window.addEventListener('gameUnBlocked', () => {
            this.blocked = false;
        });

    }

    ToggleColor() {
        this.color = this.color == 'black' ? 'white' : 'black';
        this.UpdateColor();
    }

    UpdateColor() {
        this.element.style.backgroundColor = this.color;
    }

    SetResolved() {
        this.resolved = true;
        this.UpdateVisibility();
    }

    UpdateVisibility() {
        if (this.resolved) {
            this.element.style.visibility = 'hidden';
        }
    }

    OnClick() {

        if (this.blocked) {
            return;
        }


        this.ToggleColor();
        this.TriggerCardClick();
    }

    TriggerCardClick() {
        window.dispatchEvent(
            new CustomEvent('cardClick', {
                detail: this
            })
        );
    }
}