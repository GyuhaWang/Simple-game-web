import { Enemy } from "../_object/enemy";

const checkCollision = (player:any, enemy : Enemy) => {
    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    );
};
export default checkCollision;

