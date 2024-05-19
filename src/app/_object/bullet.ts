import { Player } from "./player";

export class Bullet {
    x: number;
    y:number;
    width:number;
    height:number;
    power:number;
    ctx: CanvasRenderingContext2D;
    bulletImg: HTMLImageElement;
    constructor(player: Player,width: number, height: number, power: number, ctx: CanvasRenderingContext2D, bulletImg: HTMLImageElement) {
        this.x =  player.x + player.width/2;
        this.y = player.y;
        this.width = width;
        this.height = height;
        this.power =power;
        this.ctx = ctx;
        this.bulletImg = bulletImg;
    }
    draw() {
        if (this.ctx) {
            
            this.ctx.drawImage(this.bulletImg,this.x, this.y, this.width, this.height);
        }
    }
    update (){
        this.y -=2;
    }
}