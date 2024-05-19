import { Bullet } from "./bullet";

export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    shottable: boolean;
    bulletAmount: number;
    currentBullet: number;
    bullets: Bullet[];
    loadBulletTime: number;
    shotDelay: number;
    isLoadBullet: boolean;
    moving: { left: boolean; right: boolean; up: boolean; down: boolean; };
    ctx: CanvasRenderingContext2D;
    screenWidth: number;
    screenHeight:number;
    playerImg: HTMLImageElement;
    bulletImg: HTMLImageElement;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, speed: number, bulletAmount: number, screenWidth: number, screenHeight: number, playerImg: HTMLImageElement, bulletImg: HTMLImageElement,loadBulletTime: number,shotDelay: number) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.shottable = true;
        this.bulletAmount = bulletAmount;
        this.isLoadBullet = false,
        this.loadBulletTime = loadBulletTime;
        this.shotDelay = shotDelay;
        this.bullets = [];
        this.currentBullet = bulletAmount;
        this.moving ={ left: false, right: false, up: false, down: false };
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.playerImg = playerImg;
        this.bulletImg = bulletImg;
    }

    draw() {
        if (this.ctx) {
                        this.ctx.drawImage(this.playerImg,this.x,this.y,this.width,this.height);
                    }
    }

            shotBullet(){
                if(this.currentBullet>0&&this.shottable){
                    this.shottable = false;
                    this.currentBullet -=1;
                    this.bullets.push(new Bullet( this, 10,20, 1, this.ctx, this.bulletImg));
                   
                   
                    setTimeout(()=>{
                        this.shottable = true;
                    },this.shotDelay)
                }
                else if(this.currentBullet<=0){
                    this.isLoadBullet = true;
                }
            };
         loadBullet(){
                setTimeout(()=>{
                    this.isLoadBullet = false;
                    this.currentBullet = this.bulletAmount;
                  

                },this.loadBulletTime)
            };
            update() {

                        if (this.moving.left) {
                            if(this.x >=0){
                                this.x -= this.speed};
                            }
                           
                        if (this.moving.right) {
                            if(this.x <= this.screenWidth - this.width){
                                this.x += this.speed;
                            }
                        }
                        if (this.moving.up) {
                            if(this.y >=0){
                                this.y -= this.speed;
                            }
                        }
                        if (this.moving.down) {
                            if(this.y <= this.screenHeight - this.height){
                                this.y += this.speed;
                            }
                        }
                        this.bullets.forEach((bullet,index) => {
                            bullet.update();
                            bullet.draw();
                            if(bullet.x > this.screenWidth){
                                this.bullets.splice(index,1)
                            }
                        });
        
                        if(this.isLoadBullet){
                            this.loadBullet();
                        }
                    };
            
                    getBullets(){
                        return this.currentBullet;
                    }
                
                
                }
                    


