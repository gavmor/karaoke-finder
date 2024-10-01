// @ts-nocheck

const mockGetUserMedia = () => {
    const fakeMediaStream = createFakeMediaStream()
    const fakeAudioTrack = createFakeAudioTrack()

    const intervalId = setInterval(() => simulateAudioData(fakeMediaStream, fakeAudioTrack), 100)

    fakeMediaStream.addEventListener("inactive", () => {
        clearInterval(intervalId)
    })
    return Promise.resolve(fakeMediaStream)
};export const createFakeMediaStream = () => {
    const fakeMediaStream = new MediaStream()
    return fakeMediaStream
}

export const createFakeAudioTrack = () => {
    const fakeAudioTrack = {
        kind: "audio",
        enabled: true,
        stop: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
    }
    return fakeAudioTrack
}

export const simulateAudioData = () => {
    const fakeAudioData = new Float32Array(1024) // Simulated audio data

    // Create a new MediaStream
    const fakeMediaStream = new MediaStream()

    // Create a new AudioContext
    const audioContext = new AudioContext()

    // Create a new MediaStreamTrack
    const fakeAudioTrack = new MediaStreamTrack("audio", {})

    // Add the fakeAudioTrack to the fakeMediaStream
    fakeMediaStream.addTrack(fakeAudioTrack)

    // Create a new MediaStreamAudioSourceNode from the fakeMediaStream
    const mediaStreamSource = audioContext.createMediaStreamSource(fakeMediaStream)

    const mediaStreamTrackEvent = new MediaStreamTrackEvent("addtrack", {
        track: fakeAudioTrack,
    })

    fakeMediaStream.dispatchEvent(mediaStreamTrackEvent)

    const mediaStreamTrackDataEvent = new MediaStreamTrackEvent("data", {
        data: fakeAudioData,
        track: fakeAudioTrack,
    })

    fakeAudioTrack.dispatchEvent(mediaStreamTrackDataEvent)
}

