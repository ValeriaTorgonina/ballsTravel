import {ICoords} from "./models/coords";

export class Ball {
    vectorX: number = 4;
    vectorY: number = 4;
    coords: ICoords;
    decor: HTMLDivElement;

    constructor(
        public domElem: HTMLDivElement,
        private fieldCoords: ICoords
    ) {
        this.getCoords()
        this.createDecor()
    }

    createDecor() {
        const div = document.createElement('div');
        this.addDecor(div);
    }

    addDecor(decor: HTMLDivElement) {
        this.domElem.appendChild(decor);
        decor.classList.add('decor');
        this.decor = decor;
    }

    reverseDecor() {
        this.decor.style.animationDirection === 'normal' ?
            this.decor.style.animationDirection = 'reverse' :
            this.decor.style.animationDirection = 'normal';
    }

    move() {
        this.domElem.style.left = this.coords.left - (this.fieldCoords.left + 2) + this.vectorX + 'px';
        this.domElem.style.top = this.coords.top - (this.fieldCoords.top + 2) + this.vectorY + 'px';
        this.getCoords();
    }

    protected getCoords() {
        this.coords = this.domElem.getBoundingClientRect();
    }
}