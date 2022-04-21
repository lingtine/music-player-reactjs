import { createContext, useState } from "react";
import {songs} from "./SongProvider"

const SongActive = createContext()

function SongActiveProvider({children}) {

    const [songActive,setSongActive] = useState(0)
    const updateSongActive = (index) => {
        setSongActive(index)
    } 


    

    const value = {
        currentSong:songs[songActive],
        updateSongActive,   
        index:songActive
    }

    return (
        <SongActive.Provider value={value}>
            {children}
        </SongActive.Provider>
    )
}


export {SongActive,SongActiveProvider}