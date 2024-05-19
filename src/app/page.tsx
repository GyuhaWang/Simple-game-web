
import ChromeGame from './_component/chromeGame';
import EnemyProvider from './_provider/enemyProvider';
import PlayerProvider from './_provider/playerProvider';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center ">
			 <PlayerProvider>
                <EnemyProvider>
			<ChromeGame />
			</EnemyProvider>
			</PlayerProvider>
		</main>
	);
}
