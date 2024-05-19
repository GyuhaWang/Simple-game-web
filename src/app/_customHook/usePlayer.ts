import { useContext } from "react";
import { PlayerContext } from "../_context/playerContext";

 const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('player가 없습니다.');
    }
    return context;
};

export default usePlayer;

