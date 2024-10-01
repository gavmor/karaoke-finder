import {h} from "preact"
import {useState} from "preact/hooks"
import {PitchDetector} from "pitchy"
import "./app.css"
import {AnalyzeButton} from "./AnalyzeButton"
import useAudioInput from "./useAudioInput"

export function App() {
    const [isListening, setIsListening] = useState(false)
    const toggleRecording = () => {
        setIsListening((prev) => ! prev)
    }

    const {audioData, toggleListening} = useAudioInput()
        console.log(audioData)
    return (
        <div className="vocal-range-finder">
            <header>
                <h1>VocalRange Finder</h1>
            </header>

            <main>
                <section className="instructions">
                    <p>Sing from your lowest to highest comfortable note. The app will listen and analyze your vocal range.</p>
                </section>

                <section className="activity">
                    <AnalyzeButton isActive={isListening} onClick={toggleListening} />
                </section>

             <section className="results">{audioData}</section>
            </main>

        </div>
    )
}