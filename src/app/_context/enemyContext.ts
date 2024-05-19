'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Enemy } from '../_object/enemy'; // Enemy 타입을 정의한 파일을 임포트해야 합니다.

export interface EnemyContextType {
    enemy: Enemy[] ;
    spawnEnemy: (enemy: Enemy) => void;
    removeEnemy: (index: number) => void;
    resetEnemy: () => void;
}

export const EnemyContext = createContext<EnemyContextType | undefined>(undefined);
