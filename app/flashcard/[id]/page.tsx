import Navbar from "@/app/components/navbar";
import FlashCard from "@/app/components/pages/flashcard";

export default function FlashCardLayout({ params }: { params: { id: any } }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <FlashCard id={params.id} />
        </>
    )
}