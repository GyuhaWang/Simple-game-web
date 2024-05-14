'use client'
import { randomInt } from 'crypto';
import { useEffect, useRef, useState } from 'react';

const ChromeGame = () => {
    const screenHeight = 500;
    const screenWidth = 800;
    const lineHeight = screenHeight/2;
    const bulletsAmount =30;
    const loadBulletTime = 1000;
    const shotDelay = 500;
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const [isPaused, setIsPaused] = useState(false); 
    const [bullets,setBullets] = useState(bulletsAmount);
    const [enemyAmount, setEnemyAmount] = useState(0);
    const [score, setScore] = useState(0);
    useEffect(() => {
        
        var img = new Image();
        var bulletImg = new Image();
        var enemyImg = new Image();
        img.src = "/player/spaceShip.svg";
        bulletImg.src = "/player/bullet.svg";
        enemyImg.src = "/enemy/enemy.svg";

        const canvas = canvasRef.current;
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        if (!ctx) return; 

        let frameCount = 0;
        let animationFrameId: number | undefined;

        class Bullet {
            x: number;
            y:number;
            width:number;
            height:number;
            power:number;
            constructor() {
                this.x =  dino.x + dino.width/2;
                this.y = dino.y;
                this.width = 10;
                this.height = 20;
                this.power =1;
            }
            draw() {
                if (ctx) {
                    
                    ctx.drawImage(bulletImg,this.x, this.y, this.width, this.height);
                }
            }
            update (){
                this.y -=2;
            }
        }
    
        const dino = {
            x: 10,
            y: lineHeight,
            width: 50,
            height: 50,
            speed:5,
            velocityY: 0,
            gravity: 0.4,
            jumpPower: -10,
            isJumping: false,
            shottable: true,
            bulletAmount: bulletsAmount,
            isLoadBullet: false,
            bullets: [] as Bullet[],
            moving: { left: false, right: false, up: false, down: false },
            draw() {
               

                if (ctx) {
                    ctx.drawImage(img,this.x,this.y,this.width,this.height);
                }
            },
           
      
            shotBullet(){
                if(this.bulletAmount>0&&this.shottable){
                    this.shottable = false;
                    this.bulletAmount -=1;
                    this.bullets.push(new Bullet());
                    setBullets(this.bulletAmount);
                   
                    setTimeout(()=>{
                        this.shottable = true;
                    },shotDelay)
                }
                else if(this.bulletAmount<=0){
                    this.isLoadBullet = true;
                }
            },
            loadBullet(){
                setTimeout(()=>{
                    this.isLoadBullet = false;
                    this.bulletAmount = bulletsAmount;
                    setBullets(bulletsAmount);

                },loadBulletTime)
            },
            update() {

                if (this.moving.left) {
                    if(this.x >=0){
                        this.x -= this.speed};
                    }
                   
                if (this.moving.right) {
                    if(this.x <= screenWidth - this.width){
                        this.x += this.speed;
                    }
                }
                if (this.moving.up) {
                    if(this.y >=0){
                        this.y -= this.speed;
                    }
                }
                if (this.moving.down) {
                    if(this.y <= screenHeight - this.height){
                        this.y += this.speed;
                    }
                }
                this.bullets.forEach((bullet,index) => {
                    bullet.update();
                    bullet.draw();
                    if(bullet.x > screenWidth){
                        this.bullets.splice(index,1)
                    }
                });

                if(this.isLoadBullet){
                    this.loadBullet();
                }
            },
            
          
        };
        
       

      
        class Enemy {
            x: number;
            y: number;
            width: number;
            height: number;
            life :number;
            constructor() {
              
                this.width = 20;
                this.height = 27;
                this.x = Math.floor(Math.random() * (screenWidth - this.width)); 
                this.y = 0;
                this.life =5;
            }

            draw() {
                if (ctx) {
                    
                    ctx.drawImage(enemyImg,this.x, this.y, this.width, this.height);
                }
            }

            update() {
                this.y += 2; 
            }
        }

        const Enemies: Enemy[] = [];

        const spawnEnemy = () => {
            Enemies.push(new Enemy());
            setTimeout(spawnEnemy, 2000); 
        };
        const checkCollision = (dino:any, enemy : Enemy) => {
            return (
                dino.x < enemy.x + enemy.width &&
                dino.x + dino.width > enemy.x &&
                dino.y < enemy.y + enemy.height &&
                dino.y + dino.height > enemy.y
            );
        };
        const gameLoop = () => {
            if (!isPaused) {
                frameCount++;
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    dino.update();
                    dino.draw();
                    Enemies.forEach((enemy,index) => {
                        enemy.update();
                        enemy.draw();
                        if (enemy.y  >screenHeight) {
                            Enemies.splice(index, 1);
                        }
                        if (checkCollision(dino, enemy)) {
                            setIsPaused(true); 
                        }
                        dino.bullets.forEach((bullet,index) => {
                            if (checkCollision(bullet, enemy)) {
                               enemy.life -= bullet.power
                               dino.bullets.splice(index,1)
                            }
                        });
                        if(enemy.life<=0){
                            Enemies.splice(index,1)
                            setScore(prevScore => prevScore + 1);
                        }
                    });
                

                    setEnemyAmount(Enemies.length);
                }
                animationFrameId = window.requestAnimationFrame(gameLoop);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'a': dino.moving.left = true; break;
                case 'd': dino.moving.right = true; break;
                case 'w': dino.moving.up = true; break;
                case 's': dino.moving.down = true; break;
                case ' ' : dino.shotBullet(); break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'a': dino.moving.left = false; break;
                case 'd': dino.moving.right = false; break;
                case 'w': dino.moving.up = false; break;
                case 's': dino.moving.down = false; break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        setTimeout(spawnEnemy, 2000); 
        animationFrameId = window.requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (animationFrameId !== undefined) {
                window.cancelAnimationFrame(animationFrameId);

            }
        };
    }, [isPaused]); 

    return (
        <div className='flex flex-col items-center justify-center'>
            <div>점수 : {score}</div>
            <canvas style={{backgroundImage: "url('/backgroundImage/space.jpg')",
          backgroundSize: 'cover',  
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }} ref={canvasRef} width={screenWidth} height={screenHeight} />
            <div>  총알 수 : {bullets>0? bullets : '장전중'}</div>
            <button onClick={() => setIsPaused(!isPaused)}>restart</button> {/* Pause 버튼 추가 */}
        </div>
    );
};

export default ChromeGame;

