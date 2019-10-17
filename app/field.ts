import {ICoords} from "./models/coords";
import {TravelManager} from "./travelManager";

 export class Field {
    coords: ICoords;
    manager: TravelManager;

    constructor(protected domElem: HTMLDivElement){
        this.getCoords();
        this.manager = new TravelManager(this);
        this.manager.run();
    }

    protected getCoords() {
        this.coords = this.domElem.getBoundingClientRect();
    }

     createBall () {
         const div = document.createElement('div');
         this.addBall(div);
         return div
     }

    addBall(ball: HTMLDivElement) {
        this.domElem.appendChild(ball);
        ball.classList.add('ball');
    }


}
