import './Countdown.css';

import { CountdownControls } from './subcomponents/CountdownControls';
import { CountdownStates } from './context/CountdownStates';
import { CountdownTime } from './context/CountdownTime';
import { CountdownTimer } from './subcomponents/CountdownTimer';

export const Countdown = () => {

    return (
        <CountdownTime>
            <CountdownStates>
                <div className="mt-12 p-2">
                    <div className="flex w-full justify-center flex-col flex-wrap items-center">
                        <CountdownTimer />
                        <CountdownControls />
                    </div>
                </div>
            </CountdownStates>
        </CountdownTime>
    )
}
