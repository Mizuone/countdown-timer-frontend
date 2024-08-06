import { createContext } from "react";

export interface CountdownTimerType {
    countdown: number;
    setCountdown: React.Dispatch<React.SetStateAction<number>>;
};

export interface CountdownStates {
    editing: boolean;
    running: boolean;
}

export interface CountdownStatesType {
    states: CountdownStates;
    setStates: React.Dispatch<React.SetStateAction<CountdownStates>>;
};


export const CountdownTimeContext = createContext<CountdownTimerType>({
    countdown: 0,
    setCountdown: () => {}
});


export const CountdownStatesContext = createContext<CountdownStatesType>({
    states: {
        editing: false,
        running: false,
    },
    setStates: () => {}
});