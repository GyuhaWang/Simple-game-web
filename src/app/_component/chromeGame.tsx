'use client'
import { use, useEffect, useRef, useState } from 'react';
import { Enemy } from '../_object/enemy';
import ScoreBoard from './scoreBoard';
import { Player } from '../_object/player';
import checkCollision from '../_utils/collisionChecker';
import { handleKeyDown, handleKeyUp } from '../_utils/keyHandler';

import usePlayer from '../_customHook/usePlayer';
import useEnemy from '../_customHook/useEnemy';

const ChromeGame = () => {
    const screenHeight = 500;
    const screenWidth = 800;
    const lineHeight = screenHeight/2;
    const bulletsAmount =30;
    const loadBulletTime = 1000;
    const shotDelay = 500;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentPlayer = usePlayer();
    const currentEnemies = useEnemy();
    const [currentBullet, setCurrentBullet] = useState(bulletsAmount);
    const [isPaused, setIsPaused] = useState(false); 
    const [score, setScore] = useState(0);
    let intervalId:NodeJS.Timeout | null = null;
 

   
    useEffect(() => {
     
        setScore(0);  
        var img = new Image();
        var bulletImg = new Image();
        var enemyImg = new Image();
        enemyImg.src = "/enemy/enemy.svg";
        img.src = "/player/spaceShip.svg";
        bulletImg.src = "/player/bullet.svg";
       

        const canvas = canvasRef.current;
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        if (!ctx) return; 
        let animationFrameId: number | undefined;
     
        if(!isPaused&& !currentPlayer.player){
            //처음 들어왔을 때 currentPlayer가 null 이기 때문에 설정을 해준다.
            currentPlayer.setPlayer(new Player(ctx,10,lineHeight,50,50,5,bulletsAmount,screenWidth,screenHeight,img,bulletImg,loadBulletTime,shotDelay));
           
            return
        }
        
        const gameLoop = () => {
         
            if (!isPaused ) {
               
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    currentPlayer.player?.update();
                    currentPlayer.player?.draw();
                    currentEnemies.enemy.forEach((enemy,index) => {
                        enemy.update();
                        enemy.draw();
                        if (enemy.y  >screenHeight) {
                            currentEnemies.removeEnemy(index);
                        }
                        if (checkCollision(currentPlayer.player, enemy)) {
                           // 모든 세팅을 처음으로 되돌린다.    
                            window.removeEventListener('keydown', (event) => handleKeyDown(currentPlayer.player!, event));
                            window.removeEventListener('keyup', (event) => handleKeyUp(currentPlayer.player!, event));
                            if (animationFrameId !== undefined) {
                            window.cancelAnimationFrame(animationFrameId);
                            }
                            clearInterval(intervalId!)
                            currentPlayer.setPlayer(new Player(ctx,10,lineHeight,50,50,5,bulletsAmount,screenWidth,screenHeight,img,bulletImg,loadBulletTime,shotDelay));
                            currentEnemies.resetEnemy();
                            setIsPaused(true); 
                            
                        }
                    
                        currentPlayer.player!.bullets.forEach((bullet,index) => {
                            if (checkCollision(bullet, enemy)) {
                               enemy.life -= bullet.power
                               currentPlayer.destroyBullet(index)
                            }
                        });
                        if(enemy.life<=0){
                            currentEnemies.removeEnemy(index);
                            setScore(prevScore => prevScore + 1);
                        }
                    });
                    setCurrentBullet(currentPlayer?.player?.getBullets()??0)
                }
                animationFrameId = window.requestAnimationFrame(gameLoop);
            }
         
        };


        window.addEventListener('keydown', (event) => handleKeyDown(currentPlayer.player!, event));
        window.addEventListener('keyup', (event) => handleKeyUp(currentPlayer.player!, event));
            if(!isPaused){
                setTimeout(()=>{
                },2000)
              // 화면이 background 라면 적을 생성하지 않는다.
            intervalId = setInterval(()=>  document.visibilityState === 'visible'&& currentEnemies.spawnEnemy(new Enemy(screenWidth, ctx, 5, 20, 27, 0, enemyImg)),2000)
            }
      
            animationFrameId = window.requestAnimationFrame(gameLoop);
       
        return () => {
            window.removeEventListener('keydown', (event) => handleKeyDown(currentPlayer.player!, event));
            window.removeEventListener('keyup', (event) => handleKeyUp(currentPlayer.player!, event));
            if (animationFrameId !== undefined) {
                window.cancelAnimationFrame(animationFrameId);

            }
        };
        
            
            
    }, [isPaused,currentPlayer.player]); 

    return (
        <div className='flex flex-col items-start justify-start'>
            <ScoreBoard isPaused={isPaused} setIsPaused={setIsPaused} score={score} />
            <canvas style={{backgroundImage: "url('/backgroundImage/space.jpg')",
          backgroundSize: 'cover',  
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat' 
        }} ref={canvasRef} width={screenWidth} height={screenHeight} />
            <div>  총알 수 : {currentBullet>0? currentBullet : '장전중'}</div>
        </div>
    );
};

export default ChromeGame;

