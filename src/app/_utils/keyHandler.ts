import { Player } from "../_object/player";

export const handleKeyDown = (player: Player, event: KeyboardEvent) => {
    switch (event.key) {
        case 'a': player.moving.left = true; break;
        case 'd': player.moving.right = true; break;
        case 'w': player.moving.up = true; break;
        case 's': player.moving.down = true; break;
        case ' ': player.shotBullet(); break;
    }
};

export const handleKeyUp = (player: Player, event: KeyboardEvent) => {
    switch (event.key) {
        case 'a': player.moving.left = false; break;
        case 'd': player.moving.right = false; break;
        case 'w': player.moving.up = false; break;
        case 's': player.moving.down = false; break;
    }
};