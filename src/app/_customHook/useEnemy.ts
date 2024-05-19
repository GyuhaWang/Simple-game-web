import { useContext } from "react";
import { EnemyContext } from "../_context/enemyContext";

 const useEnemy = () => {
    const context = useContext(EnemyContext);
    if (context === undefined) {
        throw new Error('Enemy가 없습니다.');
    }
    return context;
};

export default useEnemy;

