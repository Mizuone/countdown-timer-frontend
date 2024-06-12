import { CountdownRunningContext, CountdownTimeContext } from "../Countdown";
import { useContext, useEffect, useRef, useState } from "react";

import { CountdownEditing } from "./CountdownEditing";

export const CountdownTimer = () => {
    const [formattedTime, setFormattedTime] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { countdown, setCountdown } = useContext(CountdownTimeContext);
    const { setRunning } = useContext(CountdownRunningContext); 

    const countDownRef = useRef<HTMLDivElement>(null);

    const handleCountdownOnTimeout = () => {
        setCountdown((prevState: number) => Math.max(prevState - 1, 0));
    }

    const formatTime = (time: number) => {
        if (time <= 0) {
            setFormattedTime('00:00');
            setRunning(false);
            return;
        }

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formatedMinutes: String = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formatedSeconds: String = seconds < 10 ? `0${seconds}` : seconds.toString();

        setFormattedTime(`${formatedMinutes}:${formatedSeconds}`);
    }

    const enterEditingMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => {
        setIsEditing(true);
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
            {isEditing ? (
                <CountdownEditing />
            ) : (
                <p className="text-9xl">
                    {formattedTime}
                </p>
            )}
        </div>
    )
}