

export const CountdownEditing = () => {
    const [newCountdownTime, setNewCountdownTime] = useState<number>(Math.floor(countdown / 60));

    return (
        <input id='edit-countdown' type='number' autoFocus={true} className='text-9xl max-w-[300px] px-2 bg-transparent focus-visible: outline-0'
            onChange={(e) => setNewCountdownTime(Number(e.currentTarget.value))}
            placeholder={newCountdownTime.toString()}
        />
    )
}