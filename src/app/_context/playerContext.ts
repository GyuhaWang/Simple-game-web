'use client'
import { createContext } from 'react';
import { Player } from '../_object/player'; 


export interface PlayerContextType {
    player: Player | null;
    setPlayer: (player: Player) => void;
    destroyBullet :(index:number) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
