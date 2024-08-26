import { ReactNode, createContext, useState } from "react";

export interface CountdownStates {
    editing: boolean;
    running: boolean;
}

export interface CountdownStatesType {
    states: CountdownStates;
    setStates: React.Dispatch<React.SetStateAction<CountdownStates>>;
};

export const CountdownStatesContext = createContext<CountdownStatesType>({
    states: {
        editing: false,
        running: false,
    },
    setStates: () => { }
});

interface CountdownStatesProps {
    children: ReactNode;
}

export const CountdownStates: React.FC<CountdownStatesProps> = ({ children }) => {
    const [states, setStates] = useState<CountdownStates>({
        editing: false,
        running: false,
    }); 

    return (
        <CountdownStatesContext.Provider value={{ states, setStates }}>
            {children}
        </CountdownStatesContext.Provider>
    )
}