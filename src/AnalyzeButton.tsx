import {h} from "preact"
import "./analyze-button.css"
import {includes} from "./lib/matchers"

export const AnalyzeButton = ({onClick, isActive}: { onClick?: () => void; isActive?: boolean}) => {
    return (
        <button
            className={`analyze-button ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {isActive ? "🎤 Listening..." : "🎤 Analyze"}
        </button>
    )
}

test("AnalyzeButton", {
    "renders the correct text when isActive is false"() {
        expect(AnalyzeButton({}).props.children, equals, "🎤 Analyze")
    },

    "renders the correct text when isActive is true"() {
        expect(AnalyzeButton({isActive: true}).props.children, equals, "🎤 Listening...")
    },

    "applies the 'active' class when isActive is true"() {
        expect(AnalyzeButton({isActive: true}).props.className, includes, "active")
    },
    "does not apply the 'active' class when isActive is false"() {
        expect(AnalyzeButton({isActive: false}).props.className, not(includes), "active")
    },
})

