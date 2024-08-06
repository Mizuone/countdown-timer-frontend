import { CountdownStates, CountdownStatesContext, CountdownStatesType, CountdownTimeContext, CountdownTimerType } from "../CountdownContext";
import { useContext, useEffect, useRef, useState } from "react";

import { CountdownEditing } from "./CountdownEditing";
import { CountdownSounds } from "../../../assets/sounds/CountdownSounds";

export const CountdownTimer = () => {
    const [formattedTime, setFormattedTime] = useState<string>('');

    const { countdown } = useContext<CountdownTimerType>(CountdownTimeContext);
    const { states, setStates } = useContext<CountdownStatesType>(CountdownStatesContext); 

    const countDownRef = useRef<HTMLDivElement>(null);

    const formatTime = (time: number) => {
        if (time <= 0) {
            setFormattedTime('00:00');
            setStates({ ...states, running: false });

            new Audio(CountdownSounds.finished).play();
            return;
        }

        const totalMinutes = Math.floor(time / 60);

        const hours: number = Math.floor(totalMinutes / 60);
        const minutes: number = Math.floor(totalMinutes % 60);
        const seconds: number = time % 60;

        const formattedHours: String = hours > 0 ? `${hours.toString()}:` : '';
        const formatedMinutes: String = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formatedSeconds: String = seconds < 10 ? `0${seconds}` : seconds.toString();

        setFormattedTime(`${formattedHours}${formatedMinutes}:${formatedSeconds}`);
    }

    const enterEditingMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => {
        event.stopPropagation();

        setStates((prevStates: CountdownStates) => ({...prevStates, editing: true, running: false}));
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
                <CountdownEditing countDownRef={countDownRef} />
            ) : (
                <p className="text-9xl">
                    {formattedTime}
                </p>
            )}
        </div>
    )
}