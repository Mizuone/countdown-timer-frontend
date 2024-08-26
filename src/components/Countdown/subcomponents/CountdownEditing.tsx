import { useContext, useEffect, useState } from "react";

import { CountdownStatesContext } from "../context/CountdownStates";
import { CountdownTimeContext } from "../context/CountdownTime";

interface CountdownEditingProps {
    countDownRef: React.RefObject<HTMLDivElement>;
}

export const CountdownEditing = (props: CountdownEditingProps) => {
    const { countDownRef } = props;
    const { countdown, setCountdown } = useContext(CountdownTimeContext);
    const { states, setStates } = useContext(CountdownStatesContext);

    const [newCountdownMinutes, setNewCountdownMinutes] = useState<number>(Math.floor(countdown.original / 60));

    const EditableCountdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCountdown = Number(event.currentTarget.value);
        const countDownToSeconds = newCountdown * 60;
                
        if (newCountdown * 60 > countdown.maxCountdown) return;
        setNewCountdownMinutes(newCountdown);

        if (newCountdown <= 0 ) return;
        setCountdown({ ...countdown, current: countDownToSeconds, original: countDownToSeconds });
    };

    const exitEditingMode = () => {
        setStates({ ...states, editing: false });
    };

    const handleEnterKeyPressed = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            event.stopPropagation();

            exitEditingMode();
        }
    };

    const handleClickOutsideCountdown = (event: MouseEvent) => {
        if (countDownRef.current && !countDownRef.current.contains(event.target as HTMLDivElement)) {
            event.stopPropagation();

            exitEditingMode();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleEnterKeyPressed);
        document.addEventListener('click', handleClickOutsideCountdown);

        return () => {
            document.removeEventListener('keypress', handleEnterKeyPressed);
            document.removeEventListener('click', handleClickOutsideCountdown);
        }
    }, []);

    return (
        <input data-testid="countdown-editing-input" id='edit-countdown'
            type='number' min={1} max={countdown.maxCountdown / 60} autoFocus={true}
            className='text-9xl max-w-[300px] px-2 bg-transparent focus-visible: outline-0'
            onChange={(e) => EditableCountdownChange(e)}
            value={newCountdownMinutes.toString()}
        />
    )
}