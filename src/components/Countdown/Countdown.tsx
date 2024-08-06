import './Countdown.css';

import { CountdownStates, CountdownStatesContext, CountdownTimeContext } from './CountdownContext';

import { CountdownControls } from './subcomponents/CountdownControls';
import { CountdownTimer } from './subcomponents/CountdownTimer';
import { useState } from "react"

export const Countdown = () => {
    const [countdown, setCountdown] = useState<number>(2505); // 7500 // Add a max set countdown to 57,600, which is 16 hours
    const [states, setStates] = useState<CountdownStates>({
        editing: false,
        running: false,
    }); 

    return (
        <CountdownTimeContext.Provider value={{
            countdown,
            setCountdown
        }}>
            <CountdownStatesContext.Provider value={{
                states,
                setStates
            }}>
                <div className="mt-12 p-2">
                    <div className="flex w-full justify-center flex-col flex-wrap items-center">
                        <CountdownTimer />
                        <CountdownControls />
                    </div>
                </div>
            </CountdownStatesContext.Provider>
        </CountdownTimeContext.Provider>
    )
}
