'use client'
import { ReactNode, useState } from "react";
import { EnemyContext } from "../_context/enemyContext";
import { Enemy } from "../_object/enemy";

 function EnemyProvider  ({ children }: { children: ReactNode }) {
    const [enemy, setEnemy] = useState<Enemy[]>([]);
    const  spawnEnemy = (newEnemy: Enemy) => {
      enemy.push(newEnemy)
    }
    const removeEnemy = (index: number) => {
     enemy.splice(index,1)
    }
    const resetEnemy =() =>{
      setEnemy([])
    }
    return (
      <EnemyContext.Provider value={{ enemy, spawnEnemy, removeEnemy,resetEnemy }} >
        {children}
      </EnemyContext.Provider>
    );
};

export default EnemyProvider;
