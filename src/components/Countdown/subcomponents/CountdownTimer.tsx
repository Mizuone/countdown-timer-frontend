import { CountdownStates, CountdownStatesContext, CountdownStatesType, CountdownTimeContext, CountdownTimerType } from "../CountdownContext";
import { useContext, useEffect, useRef, useState } from "react";

import { CountdownEditing } from "./CountdownEditing";

export const CountdownTimer = () => {
    const [formattedTime, setFormattedTime] = useState<string>('');

    const { countdown } = useContext<CountdownTimerType>(CountdownTimeContext);
    const { states, setStates } = useContext<CountdownStatesType>(CountdownStatesContext); 

    const countDownRef = useRef<HTMLDivElement>(null);

    const formatTime = (time: number) => {
        if (time <= 0) {
            setFormattedTime('00:00');
            setStates({ ...states, running: false });
            return;
        }

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formatedMinutes: String = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formatedSeconds: String = seconds < 10 ? `0${seconds}` : seconds.toString();

        setFormattedTime(`${formatedMinutes}:${formatedSeconds}`);
    }

    const enterEditingMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => {
        setStates((prevStates: CountdownStates) => ({...prevStates, editing: true}));
    }

    useEffect(() => {
        formatTime(countdown);
    }, []);

    useEffect(() => {
        formatTime(countdown);
    }, [countdown]);

    return (
        <div ref={countDownRef}
            className='countdown p-6 pt-2 border-2 border-gray-300 rounded text-gray-300 cursor-pointer hover:border-gray-200 hover:text-gray-200'
            onClick={(e) => enterEditingMode(e)}
        >
            {states.editing ? (
                <CountdownEditing />
            ) : (
                <p className="text-9xl">
                    {formattedTime}
                </p>
            )}
        </div>
    )
}