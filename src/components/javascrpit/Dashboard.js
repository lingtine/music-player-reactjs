import clsx from "clsx"

import styles from './dashboard.module.scss'
import { useContext, useEffect, useRef, useState } from "react"
import { SongActive,SongContent } from '../Provider'

function Dashboard() {
    const songs = useContext(SongContent)
    const handelSong = useContext(SongActive)
    const [playing, setPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isRandom, setIsRandom] = useState(false);



    const [timeSeekPresent, setTimeSeekPresent] = useState(0);
    const audioRef = useRef()
    const cdThumb = useRef()
    const cd = useRef()
    


    const toggle = () => {
        if(playing) {
        }
        setPlaying(!playing)
    }

    const nextSong = () => {
        if(songs.length > handelSong.index + 1 )
            handelSong.updateSongActive(handelSong.index +1)
        else {
            handelSong.updateSongActive(0)
        } 
        
    }
    const prevSong = () => {
        if(handelSong.index - 1 >= 0   )
            handelSong.updateSongActive(handelSong.index - 1)
        else {
            handelSong.updateSongActive(songs.length - 1)
        } 
    }
    const randomSong = () => {
        const indexRandom = Math.floor((Math.random() * (songs.length - 1)))
        handelSong.updateSongActive(indexRandom)

    }


    const handelEndSong = () => {
        if (isRepeat) {
            audioRef.current.play()
        }
        else {
            if(isRandom) {
                randomSong()
            }
            else {
                nextSong()
            }
        }
    }
    const handelTimeUpdate = ()=> {
        if(audioRef.current.duration) {
            var timeseekPresent = Math.floor(
                (audioRef.current.currentTime / audioRef.current.duration)*100)
            setTimeSeekPresent(timeseekPresent)
        }
    }
    
    const handelScroll = () => {
        
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        
        var newWidth = 200 - scrollTop

        var cdNewWidth = newWidth < 0 ? 0 : newWidth + 'px'

        cd.current.style.width = cdNewWidth

        cd.current.style.opacity = newWidth / 200
    }
    

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
        
    },[playing,handelSong])
    useEffect(() => {
        audioRef.current.addEventListener("ended",handelEndSong)
        return () => {
            audioRef.current.removeEventListener("ended",handelEndSong)
        }
    },[isRepeat,isRandom])


    useEffect(() => {
        audioRef.current.addEventListener("timeupdate", handelTimeUpdate)
        document.addEventListener("scroll", handelScroll)
        
        return () => {
            audioRef.current.removeEventListener("timeupdate", handelTimeUpdate)
            document.removeEventListener("scroll", handelScroll)
        }
    },[])
    
    

    return(
        <div className={clsx(styles.dashboard)}> 
            <header className={styles.content}>
                <h4>{handelSong.currentSong.author}</h4>
                <h2>{handelSong.currentSong.name}</h2>
            </header>
            <div ref={cd} className={styles.cd}>
                <div    ref={cdThumb}
                className={clsx(styles.cdThumb,{
                    [styles.active]: playing
                })}
                style ={{backgroundImage: `url(${handelSong.currentSong.image})`}}
                >
                </div>
            </div>

            <div   className={styles.control}>
                <div onClick={() => {setIsRepeat(!isRepeat)}} className={clsx(styles.btn,{
                    [styles.active]: isRepeat
                })}>
                    <i className="fas fa-repeat"></i>
                </div>
                <div onClick={isRandom ? randomSong : prevSong} className={[styles.btn]}>
                    <i className="fas fa-step-backward"></i>
                </div>
                <div onClick={toggle}  className={clsx(styles.btn)}>
                    <i className={clsx("fas fa-play ",{[styles.btnDisappear]:playing})}></i>
                    <i className={clsx({[styles.btnDisappear]:!playing},"fas fa-pause")}></i>
                </div>
                <div onClick={isRandom ? randomSong : nextSong} className={[styles.btn,"btn-next"]}>
                    <i className="fas fa-step-forward"></i>
                </div>
                <div onClick={() => {
                    setIsRandom(!isRandom)
                }} className={clsx(styles.btn,{
                    [styles.active]: isRandom
                })}>
                    <i className="fas fa-random"></i>
                </div>
            </div>

            <input id={styles.progress} onChange={e => {
                const seekTime = (audioRef.current.duration / 100) * e.target.value;
                audioRef.current.currentTime = seekTime;
            }} className={styles.progress} type="range" value={timeSeekPresent} step="1" min="0" max="100"/>
  
            <audio ref={audioRef} id={styles.audio} src={handelSong.currentSong.path}></audio>
        </div>
    )
}


export default Dashboard