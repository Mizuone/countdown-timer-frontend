import './Countdown.css';

import { createContext, useState } from "react"

import { CountdownControls } from './subcomponents/CountdownControls';
import { CountdownTimer } from './subcomponents/CountdownTimer';

export interface CountdownTimerType {
    countdown: number;
    setCountdown: (value: number) => void;
};

export interface CountdownRunningType {
    running: boolean;
    setRunning: (value: boolean) => void;
};


export const CountdownTimeContext = createContext<CountdownTimerType>({
    countdown: 0,
    setCountdown: (value: number) => {}
});


export const CountdownRunningContext = createContext<CountdownRunningType>({
    running: false,
    setRunning: (value: boolean) => {}
});

export const Countdown = () => {
    const [countdown, setCountdown] = useState<number>(2707);
    const [running, setRunning] = useState<boolean>(false); 

    return (
        <CountdownTimeContext.Provider value={{
            countdown,
            setCountdown
        }}>
            <CountdownRunningContext.Provider value={{
                running,
                setRunning
            }}>
                <div className="mt-12 p-2">
                    <div className="flex w-full justify-center flex-col flex-wrap items-center">
                        <CountdownTimer />
                        <CountdownControls />
                    </div>
                </div>
            </CountdownRunningContext.Provider>
        </CountdownTimeContext.Provider>
    )
}
