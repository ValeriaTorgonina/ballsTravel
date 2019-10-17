import {Ball} from "./ball";
import {Field} from "./field";
import {ICoords} from "./models/coords";

export class TravelManager {

    balls: Ball[] = [];
    button: HTMLButtonElement = document.querySelector('button')

    constructor(private field: Field) {
        this.addBall();
        this.clickButton()
        // this.run()

    }

    clickButton () {
        this.button.onclick = () => {
            this.addBall()
            //this.checkingBallCrossing()
        }
    }

    removeBall () {
        this.balls.pop()
    }

    addBall () {
        const div = this.field.createBall()
        this.balls.push(new Ball(div, this.field.coords))
    }

    checkingConditionsForVectorChange () {
        const desiredBalls = this.balls.filter(ball =>
            ball.coords.top <= this.field.coords.top
            || ball.coords.left <= this.field.coords.left
            || ball.coords.right >= this.field.coords.right
            || ball.coords.bottom >= this.field.coords.bottom
            || this.checkingBallCrossing(ball)
        );
        this.changeVector(desiredBalls)
    }

    checkingBallCrossing (source: Ball): boolean {
             return !!this.balls
                 .filter(b => b !== source)
                 .find(b => this.isCrossingWithBall(
                 source.coords,
                 b.coords
             ))
    }

    private isCrossingWithBall(el: ICoords, el2: ICoords) {
        return el.right >= el2.left && el.right < el2.right && el2.top - el.top < 40 && el.top - el2.top < 40
            || el.left <= el2.right && el.left > el2.left && el2.top - el.top < 40 && el.top - el2.top < 40
            || el.bottom >= el2.top && el.bottom < el2.bottom && el2.left - el.left < 40 && el.left - el2.left < 40
            || el.top <= el2.bottom && el.top > el2.top && el2.left - el.left < 40 && el.left - el2.left < 40
    }

    changeVector (desiredBalls: Ball[]) {
        desiredBalls.forEach(ball => {
            const { vectorX, vectorY } = this.computeBallVector(ball);
            ball.vectorX = vectorX;
            ball.vectorY = vectorY;
            ball.reverseDecor();
        })
    }

    computeBallVector(ball: Ball): {vectorX: number, vectorY: number} {
        if (ball.coords.top <= this.field.coords.top && ball.vectorX > 0
        || ball.coords.left <= this.field.coords.left && ball.vectorY > 0) {
            const vectorX = 4;
            const vectorY = 4;
            return {vectorX, vectorY}
        }
        if (ball.coords.top <= this.field.coords.top && ball.vectorX < 0
        || ball.coords.right >= this.field.coords.right && ball.vectorY > 0) {
            const vectorX = -4;
            const vectorY = 4;
            return {vectorX, vectorY}
        }
        if (ball.coords.left <= this.field.coords.left && ball.vectorY < 0
        || ball.coords.bottom >= this.field.coords.bottom && ball.vectorX > 0) {
            const vectorX = 4;
            const vectorY = -4;
            return {vectorX, vectorY}
        }
        if (ball.coords.right >= this.field.coords.right && ball.vectorY < 0
        || ball.coords.bottom >= this.field.coords.bottom && ball.vectorX < 0) {
            const vectorX = -4;
            const vectorY = -4;
            return {vectorX, vectorY}
        }

        return {
            vectorY: ball.vectorY * -1,
            vectorX: ball.vectorX * -1
        }
    }

    run ()  {
        animate({
            timing: linear,
            draw: () => {
                this.balls.forEach(ball => ball.move())
                this.checkingConditionsForVectorChange();
            }
        })
    }
}

function animate({timing, draw, duration}: {timing, draw, duration?}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / (duration || 1);
        if (timeFraction > 1){
            timeFraction = duration ? 1 : 0;
        }
        let progress = timing(timeFraction);

        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

function linear(timeFraction) {
    return timeFraction;
}