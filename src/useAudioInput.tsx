import {useRef, useState, useCallback, useEffect, useContext} from "preact/hooks"
import {h, render, createContext} from "preact"
import {test, expect, is} from "@benchristel/taste"

export default function useAudioInput(): { audioData: Uint8Array; toggleListening: () => void } {
    const audioContext = useRef<AudioContext | null>(null)
    const analyzerNode = useRef<AnalyserNode | null>(null)
    const [audioData, setAudioData] = useState(new Uint8Array(0))
    const [isListening, setIsListening] = useState(false)

    const getUserMedia = useCallback(async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error("getUserMedia is not supported")
        }
        return await navigator.mediaDevices.getUserMedia({audio: true})
    }, [])

    const startRecording = useCallback(async () => {
        const stream = await getUserMedia()
        audioContext.current = new AudioContext()
        const source = audioContext.current.createMediaStreamSource(stream)
        analyzerNode.current = audioContext.current.createAnalyser()
        analyzerNode.current.fftSize = 2048
        source.connect(analyzerNode.current)

        const bufferLength = analyzerNode.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        console.log("bufferLength", bufferLength, dataArray)
        const draw = () => {
            if (! analyzerNode.current) return
            analyzerNode.current.getByteFrequencyData(dataArray)
            console.log(dataArray)
            setAudioData(dataArray)
            requestAnimationFrame(draw)
        }
        draw()
    }, [getUserMedia])

    const stopRecording = useCallback(() => {
        if (audioContext.current) {
            audioContext.current.close()
            audioContext.current = null
            analyzerNode.current = null
            setAudioData(new Uint8Array(0))
        }
    }, [])

    const toggleListening = useCallback(() => {
        console.log("toggleListening")
        setIsListening((prevState) => {
            if (prevState) {
                stopRecording()
            } else {
                startRecording()
            }
            return ! prevState
        })
    }, [startRecording, stopRecording])

    useEffect(
        () => {
            isListening ? startRecording() : stopRecording()
        },
        [isListening, startRecording, stopRecording],
    )
    return {audioData, toggleListening}
}

test("useAudioInput", {
    async "populates audioData when listening"() {
        let audioData: Uint8Array
        let toggleListening

        const TestComponent = () => {
            const result = useAudioInput()
            audioData = result.audioData
            toggleListening = result.toggleListening
            return null
        }

        const mockContext = createContext(null)
        // const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
        // navigator.mediaDevices.getUserMedia = mockGetUserMedia;

        render(<mockContext.Provider value={null}>
            <TestComponent />
        </mockContext.Provider>, document.body)

        // @ts-expect-error
        toggleListening()

        await new Promise((resolve) => setTimeout(resolve, 500))
        // @ts-expect-error
        expect(audioData.length, not(is), 0)

        // @ts-expect-error
        toggleListening()

        // navigator.mediaDevices.getUserMedia = originalGetUserMedia;
    },
})
