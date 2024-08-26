import { EditingInputTestId, FormattedTimeTestId, TimerTestId } from '../data-test-ids';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CountdownEditing } from '../../components/Countdown/subcomponents/CountdownEditing';
import { CountdownStates } from '../../components/Countdown/context/CountdownStates';
import { CountdownTime } from '../../components/Countdown/context/CountdownTime';
import { CountdownTimer } from '../../components/Countdown/subcomponents/CountdownTimer';
import { createRef } from 'react';
import { userEvent } from '@vitest/browser/context';

describe('CountdownTimer Snapshot Tests', () => {

    beforeEach(() => {
        render(
            <CountdownTime>
                <CountdownStates>
                    <CountdownTimer />
                </CountdownStates>
            </CountdownTime>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders countdown timer component in default state', () => {
        expect(screen.getByTestId(TimerTestId)).toBeInTheDocument();
    });

    it('click on countdown timer container to enter editing mode, exit by clicking outside the editing container', async () => {
        expect(screen.getByTestId(TimerTestId)).toBeInTheDocument();
        
        await act(async () => {
            await userEvent.click(screen.getByTestId(TimerTestId));            
        });

        const editInput = screen.getByTestId(EditingInputTestId); 
        expect(editInput).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(document.body);
        });

        expect(editInput).not.toBeInTheDocument();
        expect(screen.getByTestId(TimerTestId)).toBeInTheDocument();
    });

    it('Enters editing mode, changes the value, and expects the formatted value to reflect the change', async () => {
        expect(screen.getByTestId(TimerTestId)).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(screen.getByTestId(TimerTestId));
        });

        const editInput = screen.getByTestId(EditingInputTestId);
        expect(editInput).toBeInTheDocument();

        await act(async () => {
            await userEvent.keyboard('{backspace}{backspace}');
            await userEvent.keyboard('{3}{0}');
        });

        expect(editInput).toHaveValue(30);
        
        await act(async () => {
            await userEvent.keyboard('{Enter}');
        });

        expect(editInput).not.toBeInTheDocument();
        expect(screen.getByTestId(TimerTestId)).toBeInTheDocument();

        const formattedTime = screen.getByTestId(FormattedTimeTestId);
        
        expect(formattedTime).toBeInTheDocument();
        expect(formattedTime).toHaveTextContent('30:00');
    });
});

describe('CountdownEditing Snapshot Tests', () => {
    

    beforeEach(() => {
        const ref = createRef<HTMLDivElement>();
        
        render(
            <CountdownTime>
                <CountdownStates>
                    <div ref={ref}
                        className='countdown p-6 pt-2 border-2 border-gray-300 rounded text-gray-300 cursor-pointer hover:border-gray-200 hover:text-gray-200'
                    >
                        <CountdownEditing countDownRef={ref}/>
                    </div>
                </CountdownStates>
            </CountdownTime>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders countdown editing in the default state', () => {
        expect(screen.getByTestId(EditingInputTestId)).toBeInTheDocument();
    });

    it('countdown start button is clicked and disappears, stop button appears', async () => {
        const editInput = screen.getByTestId(EditingInputTestId);

        await act(async () => {
            await userEvent.keyboard('{backspace}{backspace}');
            await userEvent.keyboard('{3}{0}');
        });

        expect(editInput).toHaveValue(30);        
    });
});