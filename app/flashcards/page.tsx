import Navbar from "../components/navbar";
import FlashCards from "../components/pages/flashcards";

export default function FlashCardsLayout() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <FlashCards />
        </>

    )
}