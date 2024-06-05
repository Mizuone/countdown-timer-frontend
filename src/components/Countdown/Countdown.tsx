import { useEffect, useState } from "react"

export const Countdown = () => {
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(2707);
    const [formatedTime, setFormatedTime] = useState<String>("");
    const [intervalId, setIntervalId] = useState<number>(0);

    const toggleVideoPlaying = () => setVideoPlaying((prevState) => !prevState);

    const handleCountdownOnTimeout = () => {
        setCountdown((prevState: number) => Math.max(prevState - 1, 0));
    }
    
    const handleSpacebarPressed = (event: KeyboardEvent) => {
        if (event.code === 'Space') toggleVideoPlaying();
    }

    const formatTime = (time: number) => {
        if (time <= 0) {
            setFormatedTime('00:00');
            setVideoPlaying(false);
            return;
        }

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formatedMinutes: String = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formatedSeconds: String = seconds < 10 ? `0${seconds}` : seconds.toString(); 

        setFormatedTime(`${formatedMinutes}:${formatedSeconds}`);
    }

    useEffect(() => {
        document.addEventListener('keypress', handleSpacebarPressed);
        formatTime(countdown);

        return () => {
            document.removeEventListener('keypress', handleSpacebarPressed);
        }
    }, []);

    useEffect(() => {        
        if (videoPlaying) {
            setIntervalId(setInterval(handleCountdownOnTimeout, 1000));
        } else {
            clearInterval(intervalId);
        }
    }, [videoPlaying]);

    useEffect(() => {
        formatTime(countdown);
    }, [countdown]);

    return (
        <div className="mt-12 p-2">
            <div className="flex w-full justify-center flex-col items-center">
                <p className="text-9xl text-gray-300">{formatedTime}</p>
                <div className="mt-12">
                    {!videoPlaying && countdown > 0 ? (
                        <svg onClick={toggleVideoPlaying} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                    ) : (
                        <svg onClick={toggleVideoPlaying} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
                        </svg>
                    )}
                    {countdown <= 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    )
}
