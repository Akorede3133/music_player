import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { dataProp } from '../data';

interface showListProp {
  showMusicList: boolean;
  musicList: dataProp[];
  setShowMusicList: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.MutableRefObject<HTMLAudioElement>
  currentIndex: number;
  setPlayState: React.Dispatch<React.SetStateAction<boolean>>;

}
const PlayList = ({showMusicList, currentIndex, setPlayState, setShowMusicList, musicList, setIndex, audioRef}: showListProp) => {
  interface styleProp {
    height: string;
    padding: string;
  }
  const style: styleProp = {
    height: '65%',
    padding: '1rem',
  }
  const closeMusicList = () => {
    setShowMusicList(false);
  }
  const handleSelect = (index: number) => {
    setIndex(index + 1);
    setTimeout(() => {
      audioRef.current.play();
      setPlayState(true);
    });
  }
  return (
    <div style={showMusicList ? style : { height: '0', padding: '0'} } className=' transition-all duration-700 shadow-lg rounded-md bg-white absolute w-full bottom-0 left-0 h-0 max-h-[65%] overflow-y-auto'>
    <div className='flex justify-between items-center py-2'>
        <div className='flex items-center gap-2'>
            <QueueMusicOutlinedIcon />
            <p>Music List</p>
        </div>
        <CloseOutlinedIcon onClick={closeMusicList} style={{fontSize: '20px' }} className='text-gray- cursor-pointer' />
    </div>
    <ul className='cursor-pointer'>
      {
        musicList.map((item, index) =>  {
          return (
            <li
              className={` border-t p-1 select-none ${currentIndex === index + 1 ? 'bg-slate-200' : ''}`}
              onClick={()=>handleSelect(index)} key={index} 
            >
              <p>{item.name}</p>
              <p className='text-xs text-gray'>{item.artiste}</p>
          </li>
          )
        })
      }
    </ul>
</div>
  )
}

export default PlayList