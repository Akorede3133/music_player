import { useRef, useState} from 'react'
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import RepeatOneOutlinedIcon from '@mui/icons-material/RepeatOneOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined';
import Header from './Header';
import { data, dataProp } from '../src/utils/data';
import PlayList from './utils/components/PlayList';
const Player = () => {
    const [showMusicList, setShowMusicList] = useState<boolean>(false);
    const [musicList, setMusicList] = useState<dataProp[]>(data);
    const [playState, setPlayState] = useState<boolean>(false);
    const [duration, setDuration] = useState<string>('0:00');
    const [currentTime, setCurrentTime] = useState<string>('0:00');
    const [rangeWidth, setRangeWidth] = useState<string>('0%');
    const [index, setIndex] = useState<number>(1);
    const [repeat, setRepeat] = useState<string>('repeat-none');
    const audioRef = useRef<HTMLAudioElement>(null!);
    const playMusic = () => {
        if (!playState) {
            setPlayState(true);
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            setPlayState(false);
        }
    }
    const openMusicList = () => {
        setShowMusicList(true);
    }
    const findRandom = () => {
        if (repeat === 'shuffle') {
            let rand = Math.floor((Math.random() * musicList.length) + 1);
            if (rand === index) {
                rand = Math.floor((Math.random() * musicList.length) + 1);
            }
            setIndex(rand);
        }
    }
    const nextMusic = () => {
     findRandom();
        setIndex(prevIndex => {
            if (prevIndex > musicList.length - 1) {
                return 1
            } else {
                return prevIndex + 1;
            }
        });
        setPlayState(true);
        setTimeout(() => audioRef.current.play(), 0)

    }    
    const prevMusic = () => {
        findRandom();
        setIndex(prevIndex => {
            if (prevIndex === 1) {
                return musicList.length;
            } else {
                return prevIndex - 1;
            }
        });
        setPlayState(true);
        setTimeout(() => audioRef.current.play(), 0)
    } 
    const loadedUpdate = (e) => {
        const duration = e.target.duration;
        const durationMinute = Math.floor(duration / 60);        
        let durationSec: string | number = Math.floor(duration % 60);
        if (durationSec < 10) {
            durationSec = `0${durationSec}`;
        }
        const finalDuration = `${durationMinute}:${durationSec}`;
        setDuration(finalDuration);
    }
    const timeupdate = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        const percent = currentTime / duration * 100;
        const width = `${percent}%`;
        setRangeWidth(width);
        
        const currentMinute = Math.floor(currentTime / 60);        
        let currentSec: string | number = Math.floor(currentTime % 60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        const finalMinute = `${currentMinute}:${currentSec}`;
        setCurrentTime(finalMinute);
    }
    const changeMinute = (e) => {
        const num = e.nativeEvent.offsetX;
        const width = e.target.clientWidth;        
        const duration = audioRef.current.duration;
        const min = (num / width) * duration;
        audioRef.current.currentTime = min;
    }
    const handleRepeat = () => {
        switch(repeat) {
            case 'repeat-none':
                setRepeat('repeat-one');
                break;
            case 'repeat-one':
                setRepeat('shuffle');
                break;
            case 'shuffle':
                setRepeat('repeat-none');
                break;
            default:
                break;
        }
    }
    const handleEnded = () => {
        let rand = Math.floor((Math.random() * musicList.length) + 1);
        switch(repeat) {
            case 'repeat-none':
                nextMusic();
                break;
            case 'repeat-one':
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                break;
            case 'shuffle':
                if (rand === index) {
                    rand = Math.floor((Math.random() * musicList.length) + 1);
                }
                setIndex(rand);
                setTimeout(() => audioRef.current.play(), 0)                
                break;
            default:
                break;
        }
    }
  return (
    <div  className='bg-white shadow-lg  h-[450px] w-[60%] md:w-[300px] rounded-md p-4 relative'>
        <Header />
        <div className=' w-full h-[200px] my-4 rounded-md overflow-hidden'>
            <img src={musicList[index - 1].image} alt=""  className='w-full object-cover h-full'/>
        </div>
        <div className='flex justify-center flex-col items-center'>
            <p className=' font-semibold text-lg'>{musicList[index - 1].name}</p>
            <p className='text-gray-500 font-semibold'>{musicList[index - 1].artiste}</p>
        </div>
        <div onClick={(e)=>changeMinute(e)}  className='h-[0.2rem] w-full relative bg-purple-200 mt-6 cursor-pointer'>
            <span  style={{width: rangeWidth}} className={`
            absolute top-0 bg-blue-600
            h-full before:absolute before:top-[50%] 
            before:translate-y-[-50%] before:w-[10px] 
            before:rounded-full before:left-[100%] 
            before:bg-black before:h-[10px]
            before:opacity-0
             before:
            hover:before:opacity-100
            `}>

            </span>
        </div>
        <div className='flex justify-between pt-1'>
            <p className='text-xs text-gray-500'>{currentTime}</p>
            <p className='text-xs text-gray-500'>{duration}</p>
        </div>
        <div className='flex justify-between items-center my-4 '>
            <div onClick={handleRepeat}>
                {
                    repeat === 'repeat-none' ?
                    <RepeatOutlinedIcon className=' text-purple-400 cursor-pointer'/> :
                    repeat === 'repeat-one' ? 
                    <RepeatOneOutlinedIcon className=' text-purple-400 cursor-pointer' /> :
                    <ShuffleOutlinedIcon className=' text-purple-400 cursor-pointer' />
                }
            </div>
            <SkipPreviousOutlinedIcon onClick={prevMusic} className=' text-purple-400  cursor-pointer'  />
            <div 
            onClick={playMusic}
            className=' cursor-pointer w-[40px] h-[40px] bg-black flex items-center justify-center rounded-full'>
                {
                    playState ?
                    <PauseOutlinedIcon className=' text-purple-400' />:
                    <PlayArrowIcon className=' text-purple-400'/>
                }
            </div>
            <SkipNextOutlinedIcon onClick={nextMusic} className=' text-purple-400 cursor-pointer'  />
            <QueueMusicOutlinedIcon onClick={openMusicList} className=' text-purple-400 cursor-pointer'  />
        </div>
        <div>
            <audio onEnded={handleEnded} onLoadedData={(e) => loadedUpdate(e)} onTimeUpdate={(e)=> timeupdate(e)} ref={audioRef} src={musicList[index - 1].src}></audio>
        </div>
        <PlayList 
            setPlayState={setPlayState} 
            currentIndex={index}
            audioRef={audioRef} 
            setIndex={setIndex} 
            musicList={musicList} 
            showMusicList={showMusicList} 
            setShowMusicList={setShowMusicList} 
        />
    </div>
  )
}

export default Player