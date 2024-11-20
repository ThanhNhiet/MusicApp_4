import React, { createContext, useContext, useState } from 'react';

type SongContextType = {
    idSong: string | null;
    setIdSong: (id: string | null) => void;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [idSong, setIdSong] = useState<string | null>(null);
    return (
        <SongContext.Provider value={{ idSong, setIdSong }}>
            {children}
        </SongContext.Provider>
    );
};

export const useSong = () => {
    const context = useContext(SongContext);
    if (!context) {
        throw new Error('useSong must be used within a SongProvider');
    }
    return context;
};
