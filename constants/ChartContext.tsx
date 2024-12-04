import React, { createContext, useContext, useState } from 'react';

type ChartContextType = {
    idCChart: string | null;
    setIdCChart: (id: string | null) => void;
};

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [idCChart, setIdCChart] = useState<string | null>(null);
    return (
        <ChartContext.Provider value={{ idCChart, setIdCChart }}>
            {children}
        </ChartContext.Provider>
    );
};

export const useChart = () => {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChart must be used within a ChartProvider');
    }
    return context;
};
