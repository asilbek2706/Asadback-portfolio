import { createContext, useContext, useState, type ReactNode } from 'react';

interface BackgroundContextType {
    isAnimating: boolean;
    setIsAnimating: (val: boolean) => void;
    backgroundPattern: 'geometry' | 'network' | 'grid';
    setBackgroundPattern: (pattern: 'geometry' | 'network' | 'grid') => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
    undefined
);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
    const [isAnimating, setIsAnimating] = useState(true);
    const [backgroundPattern, setBackgroundPattern] = useState<
        'geometry' | 'network' | 'grid'
    >('network');

    return (
        <BackgroundContext.Provider
            value={{
                isAnimating,
                setIsAnimating,
                backgroundPattern,
                setBackgroundPattern,
            }}
        >
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context)
        throw new Error('useBackground must be used within BackgroundProvider');
    return context;
};
