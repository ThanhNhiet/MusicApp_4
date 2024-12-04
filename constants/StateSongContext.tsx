import React, { createContext, useContext, useState } from 'react';

type playingContextType = {
    c_isPlaying: boolean;
    c_setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayingContext = createContext<playingContextType | undefined>(undefined);

export const PlayingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [c_isPlaying, c_setIsPlaying] = useState(false);
    return (
        <PlayingContext.Provider value={{ c_isPlaying, c_setIsPlaying }}>
            {children}
        </PlayingContext.Provider>
    );
};

export const usePlayingState = () => {
    const context = useContext(PlayingContext);
    if (!context) {
        throw new Error('usePlayingState must be used within a PlayingProvider');
    }
    return context;
};
