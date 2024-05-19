export class Enemy {
    static nextId = 0;
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    life :number;
    ctx: CanvasRenderingContext2D;  
    img: HTMLImageElement;
    constructor(screenWidth: number, ctx: CanvasRenderingContext2D, life: number,width: number, height: number, y: number, img: HTMLImageElement) {
        this.id = Enemy.nextId++;
        this.width = width;
        this.height = height;
        this.x = Math.floor(Math.random() * (screenWidth - this.width)); 
        this.y = y;
        this.life = life;
        this.ctx = ctx;
        this.img = img;
    }
    draw() {
        if (this.ctx) {
            
            this.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.y += 2; 
    }
}
