import { PlayButtonTestId, StopButtonTestId } from '../data-test-ids';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CountdownControls } from '../../components/Countdown/subcomponents/CountdownControls';
import { CountdownSounds } from '../../assets/sounds/CountdownSounds';
import { CountdownStates } from '../../components/Countdown/context/CountdownStates';
import { CountdownTime } from '../../components/Countdown/context/CountdownTime';
import { userEvent } from '@vitest/browser/context';

export const mocks = {
    Audio: {
        play: vi.fn(),
    },
};

vi.doMock('../../assets/sounds/CountdownSounds', () => ({
    CountdownSounds: {
        start: new (vi.fn().mockImplementation(() => ({
            play: mocks.Audio.play,
        })))(),
        stop: new (vi.fn().mockImplementation(() => ({
            play: mocks.Audio.play,
        })))(),
    },
}));

describe('CountdownControls Snapshot Tests', () => {

    beforeEach(() => {

        render(
            <CountdownTime>
                <CountdownStates>
                    <CountdownControls />
                </CountdownStates>
            </CountdownTime>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders countdown controls in the default state', () => {
        expect(screen.getByTestId(PlayButtonTestId)).toBeInTheDocument();
    });

    it('countdown start button is clicked and disappears, stop button appears', async () => {
        vi.spyOn(CountdownSounds.start, "play");
        
        const playButton = screen.getByTestId(PlayButtonTestId);
        expect(playButton).toBeInTheDocument();
        expect(playButton).not.toBeDisabled();

        fireEvent.click(playButton);
        
        expect(CountdownSounds.start.play).toHaveBeenCalled();
        
        expect(playButton).not.toBeInTheDocument();

        const stopButton = screen.getByTestId(StopButtonTestId);
        expect(stopButton).toBeInTheDocument();
    });

    it('toggle the starting and stopping of the countdown using the spacebar', async () => {
        vi.spyOn(CountdownSounds.start, "play");
        vi.spyOn(CountdownSounds.stop, "play");

        let playButton = screen.getByTestId(PlayButtonTestId);

        await act(async () => {
            await userEvent.keyboard('{Space}');
        });

        expect(CountdownSounds.start.play).toHaveBeenCalled();

        expect(playButton).not.toBeInTheDocument();

        let stopButton = screen.getByTestId(StopButtonTestId);
        expect(stopButton).toBeInTheDocument();

        await act(async () => {
            await userEvent.keyboard('{Space}');
        });
        
        expect(CountdownSounds.stop.play).toHaveBeenCalled();

        expect(stopButton).not.toBeInTheDocument();

        playButton = screen.getByTestId(PlayButtonTestId);
        expect(playButton).toBeInTheDocument();
    });
});