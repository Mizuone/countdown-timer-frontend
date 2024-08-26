import { ReactNode, useState } from "react";

import { createContext } from "react";

export interface CountdownTimerType {
    countdown: CountdownDetails;
    setCountdown: React.Dispatch<React.SetStateAction<CountdownDetails>>;
};

export interface CountdownDetails {
    current: number;
    original: number;
    maxCountdown: number;
}

export const CountdownTimeContext = createContext<CountdownTimerType>({
    countdown: {
        current: 0,
        original: 0,
        maxCountdown: 0
    },
    setCountdown: () => { }
});

interface CountdownTimeProps {
    children: ReactNode;
}

export const CountdownTime: React.FC<CountdownTimeProps> = ({ children }) => {
    const [countdown, setCountdown] = useState<CountdownDetails>({
        current: 3600,
        original: 3600,
        maxCountdown: 57600
    }); 

    return (
        <CountdownTimeContext.Provider value={{ countdown, setCountdown }}>
            {children}
        </CountdownTimeContext.Provider>
    )
}