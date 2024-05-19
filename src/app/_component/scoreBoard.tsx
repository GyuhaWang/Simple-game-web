const ScoreBoard = ({isPaused, setIsPaused, score}: {isPaused: boolean, setIsPaused: (isPaused: boolean) => void, score: number}) => {
  return (<>
    <div className={`absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  text-white text-3xl ${isPaused?'visible': 'hidden'} `}> game over
    <button  className='text-white text-xl' onClick={() => setIsPaused(false)}>restart</button>
    </div>
    <div className='flex justify-start  text-3xl uppercase'>score : {score}</div>
  </>)

};

export default ScoreBoard;

