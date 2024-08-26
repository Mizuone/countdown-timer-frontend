import { Countdown } from "./components/Countdown/Countdown"
import { Navigation } from "./components/Navigation/Navigation"

function App() {

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="w-full"></div>
        <div className="w-full">
          <div className="flex flex-col">
            <Navigation />
            <Countdown />
          </div>
        </div>
        <div className="w-full"></div>
      </div>
    </>
  )
}

export default App
