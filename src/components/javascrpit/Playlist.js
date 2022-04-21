import styles from './Playlist.module.scss'
import clsx from 'clsx'
import { useEffect,useContext } from 'react'
import {SongContent,SongActive} from '../Provider'


function Playlist() {


    const songs =  useContext(SongContent)
    const handelSong =  useContext(SongActive)
    
    const handelClick = (index) => {
        handelSong.updateSongActive(index)
    }
    const scrollToActiveSong = () => {
        setTimeout(function(){
            const songActive = document.querySelector('.'+styles.active)
            songActive.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        },500)
    }
    useEffect(() => {
        scrollToActiveSong()
    })
    
    return( 
        <div className={styles.playlist}>
            {songs.map((song,index) => {
                return (                
                <div  key={index} onClick={() => {handelClick(index)}}  
                className={clsx(styles.song,index === handelSong.index ? styles.active : undefined)}>
                    <div className={styles.thumb} style={{backgroundImage: `url( ${   song.image  } )`}} >
                    </div>
                    <div className={styles.body}>
                        <h3 className={styles.title}>{song.name}</h3>
                        <p className={styles.author}>{song.author}</p>
                    </div>
                    <div className={styles.option}>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>)
                })
            }
        </div>
    )
}

export default Playlist 