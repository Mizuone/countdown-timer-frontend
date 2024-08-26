import { CountdownDetails, CountdownTimeContext, CountdownTimerType } from "../context/CountdownTime";
import { CountdownStates, CountdownStatesContext, CountdownStatesType } from "../context/CountdownStates";
import { useCallback, useContext, useEffect, useRef } from "react";

import { CountdownSounds } from "../../../assets/sounds/CountdownSounds";
import { Play } from "../../Reuseable/Icons/Play";
import { Stop } from "../../Reuseable/Icons/Stop";

export const CountdownControls = () => {
    const { setCountdown } = useContext<CountdownTimerType>(CountdownTimeContext);
    const { states, setStates } = useContext<CountdownStatesType>(CountdownStatesContext);

    const intervalRef = useRef<number>(0);
    
    const toggleCountdownRunning = () => setStates((prevState: CountdownStates) => ({ ...prevState, running: !prevState.running }));
    const handleCountdownOnTimeout = () => setCountdown((prevState: CountdownDetails) => ({ ...prevState, current: Math.max(prevState.current - 1, 0) }));

    const CountdownStatesChanged = useCallback(() => {
        if (states.running) {
            CountdownSounds.stop.play();
        } else {
            CountdownSounds.start.play();
        }
    }, [states.running]);

    const TriggerNewCountdownState = () => {
        toggleCountdownRunning();
        CountdownStatesChanged();
    }

    const handleSpacebarPressed = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            if (states.editing) return;

            TriggerNewCountdownState();
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', handleSpacebarPressed);

        return () => {
            document.removeEventListener('keypress', handleSpacebarPressed);
        }
    }, [handleSpacebarPressed]);

    useEffect(() => {
        if (states.running) {
            intervalRef.current = window.setInterval(handleCountdownOnTimeout, 1000);
        } else {
            window.clearInterval(intervalRef.current);
        }
    }, [states.running]);

    return (
        <div className="mt-16">
            {!states.running ? (
                <Play disabled={states.editing} onClick={TriggerNewCountdownState} />
            ) : (
                <Stop onClick={TriggerNewCountdownState} />
            )}
        </div>
    )
}