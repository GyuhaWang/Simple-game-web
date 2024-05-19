'use client'
import { ReactNode, useState } from "react";
import { Player } from "../_object/player";
import { PlayerContext } from "../_context/playerContext";

 function PlayerProvider  ({ children }: { children: ReactNode }) {
    const [player, setCurrentPlayer] = useState<Player | null>(null);
    
    const setPlayer = (player: Player) => {
    setCurrentPlayer(player);
  };
  const destroyBullet =(index: number)=>{
    player?.bullets.splice(index,1)
  }
    return (
      <PlayerContext.Provider value={{ player, setPlayer, destroyBullet }} >
        {children}
      </PlayerContext.Provider>
    );
};

export default PlayerProvider;
