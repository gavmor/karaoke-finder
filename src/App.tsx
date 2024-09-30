import {h} from "preact"
import {useState, useCallback, useRef, useEffect} from "preact/hooks"

import "./app.css"

const AnalyzeButton = ({onClick, isActive}) => {
    return (
        <button
            className={`analyze-button ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {isActive ? "🎤 Listening..." : "🎤 Analyze"}
        </button>

    )
}

export function App() {
    const [isListening, setIsListening] = useState(false)
    const toggleRecording = () => {setIsListening(prev => !prev)}

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
                    <AnalyzeButton isActive={isListening} onClick={toggleRecording} />
                </section>

            </main>

        </div>
    )
}

test("App", {
    "renders a greeting"() {
        // expect(App().props.children, equals, "Hello from Preact!")
    },
})
