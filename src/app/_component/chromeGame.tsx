'use client'
import { useEffect, useRef, useState } from 'react';

const ChromeGame = () => {
    const screenHeight = 400;
    const screenWidth = 800;
    const lineHeight = screenHeight/2;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPaused, setIsPaused] = useState(false); 
    const [catusNum, setCatusNum] = useState(0);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        if (!ctx) return; 

        let frameCount = 0;
        let animationFrameId: number | undefined;

    
        const dino = {
            x: 10,
            y: lineHeight,
            width: 50,
            height: 50,
            velocityY: 0,
            gravity: 0.5,
            jumpPower: -10,
            isJumping: false,
            draw() {
                if (ctx) {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            },
            jump() {
                if (!this.isJumping) {
                    this.velocityY = this.jumpPower;
                    this.isJumping = true;
                }
            },
            update() {
                this.y += this.velocityY;
                this.velocityY += this.gravity;

               
                if (this.y > lineHeight) {
                    this.y = lineHeight;
                    this.isJumping = false;
                }
            }
        };

        class Cactus {
            x: number;
            y: number;
            width: number;
            height: number;

            constructor() {
                this.x = canvas?.width ?? 0;
                this.y = lineHeight;
                this.width = 20;
                this.height = 50;
            }

            draw() {
                if (ctx) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }

            update() {
                this.x -= 2; 
            }
        }

        const cacti: Cactus[] = [];

        const spawnCactus = () => {
            cacti.push(new Cactus());
            setTimeout(spawnCactus, 2000); 
        };
        const checkCollision = (dino:any, cactus : Cactus) => {
            return (
                dino.x < cactus.x + cactus.width &&
                dino.x + dino.width > cactus.x &&
                dino.y < cactus.y + cactus.height &&
                dino.y + dino.height > cactus.y
            );
        };
        const gameLoop = () => {
            if (!isPaused) {
                frameCount++;
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    dino.update();
                    dino.draw();
                    cacti.forEach((cactus,index) => {
                        cactus.update();
                        cactus.draw();
                        if (cactus.x + cactus.width < 0) {
                            cacti.splice(index, 1);
                        }
                        if (checkCollision(dino, cactus)) {
                            setIsPaused(true); 
                        }
                    });
                    setCatusNum(cacti.length);
                }
                animationFrameId = window.requestAnimationFrame(gameLoop);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === ' ') {
                dino.jump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        setTimeout(spawnCactus, 2000); 
        animationFrameId = window.requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (animationFrameId !== undefined) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isPaused]); 

    return (
        <>
            <canvas ref={canvasRef} width={screenWidth} height={screenHeight} />
            <div>enemy 수 : {catusNum}</div>
            <button onClick={() => setIsPaused(!isPaused)}>{!isPaused? 'Pause' : 'Resume'}</button> {/* Pause 버튼 추가 */}
        </>
    );
};

export default ChromeGame;

