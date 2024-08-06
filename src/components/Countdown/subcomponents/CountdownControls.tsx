import { CountdownStates, CountdownStatesContext, CountdownStatesType, CountdownTimeContext, CountdownTimerType } from "../CountdownContext";
import { useContext, useEffect, useRef } from "react";

import { CountdownSounds } from "../../../assets/sounds/CountdownSounds";

export const CountdownControls = () => {
    const { countdown, setCountdown } = useContext<CountdownTimerType>(CountdownTimeContext);
    const { states, setStates } = useContext<CountdownStatesType>(CountdownStatesContext);

    const intervalRef = useRef<number>(0);

    const toggleCountdownRunning = () => setStates((prevState: CountdownStates) =>  {
            if (!prevState.running === true) {
                new Audio(CountdownSounds.start).play();
            } else {
                new Audio(CountdownSounds.stop).play();
            }

            return { ...states, running: !prevState.running}
        }
    );

    const handleSpacebarPressed = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            if (states.editing) {
                setStates({...states, editing: false});
            }

            toggleCountdownRunning();
        }
    }

    const handleCountdownOnTimeout = () => {
        setCountdown((prevState: number ) => Math.max(prevState - 1, 0));
    }

    useEffect(() => {
        document.addEventListener('keypress', handleSpacebarPressed);

        return () => {
            document.removeEventListener('keypress', handleSpacebarPressed);
        }
    }, [handleSpacebarPressed]);

    useEffect(() => {
        if (states.running) {
            intervalRef.current = setInterval(handleCountdownOnTimeout, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [states.running]);

    return (
        <div className="mt-16">
            {!states.running && countdown > 0 ? (
                <svg onClick={toggleCountdownRunning} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
            ) : (
                <svg onClick={toggleCountdownRunning} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
                </svg>
            )}
            {countdown <= 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            )}
        </div>
    )
}