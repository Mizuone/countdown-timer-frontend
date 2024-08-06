import { CountdownStatesContext, CountdownTimeContext } from "../CountdownContext";
import { useContext, useEffect, useState } from "react";

interface CountdownEditingProps {
    countDownRef: React.RefObject<HTMLDivElement>;
}

export const CountdownEditing = (props: CountdownEditingProps) => {
    const { countDownRef } = props;
    const { countdown, setCountdown } = useContext(CountdownTimeContext);
    const { states, setStates } = useContext(CountdownStatesContext);

    const [newCountdownMinutes, setNewCountdownMinutes] = useState<number>(Math.floor(countdown / 60));

    const updateToNewCountdown = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCountdown = Number(event.currentTarget.value);
        
        setNewCountdownMinutes(newCountdown);
        setCountdown(newCountdown * 60);
    };

    const handleEnterKeyPressed = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            event.stopPropagation();

            setStates({...states, editing: false});
        }
    };

    const handleClickOutsideCountdown = (event: MouseEvent) => {
        if (countDownRef.current && !countDownRef.current.contains(event.target as HTMLDivElement)) {
            event.stopPropagation();

            setStates({...states, editing: false});
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
        <input id='edit-countdown' type='number' autoFocus={true} className='text-9xl max-w-[300px] px-2 bg-transparent focus-visible: outline-0'
            onChange={(e) => updateToNewCountdown(e)}
            value={newCountdownMinutes.toString()}
        />
    )
}