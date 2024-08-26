import finished_countdown_bell from './finished/finished_countdown_bell.wav';
import start_countdown from './start/start_countdown.wav';
import stop_countdown from './stop/stop_countdown.wav';

const finishedCountdownAudio = new Audio(finished_countdown_bell);
const startCountdownAudio = new Audio(start_countdown);
const stopCountdownAudio = new Audio(stop_countdown);

finishedCountdownAudio.volume = 0.7;
startCountdownAudio.volume = 0.4;
stopCountdownAudio.volume = 0.7;

export const CountdownSounds = {
    finished: finishedCountdownAudio,
    start: startCountdownAudio,
    stop: stopCountdownAudio
};