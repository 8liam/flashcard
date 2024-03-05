"use client"
import { useEffect, useState } from "react";

export default function FlashCard({ id }: { id: number }) {
    interface FlashcardSet {
        title: string;
        questions: { Question: string, Answer: string }[];
    }

    const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const loadFlashCardSet = () => {
            const keys = JSON.parse(localStorage.getItem('flashcardKeys') || '[]');
            if (id < keys.length) {
                const key = keys[id];
                const flashCardsStr = localStorage.getItem(key);
                const set = flashCardsStr ? JSON.parse(flashCardsStr) : null;
                setFlashcardSet(set);
            }
        };

        loadFlashCardSet();
    }, [id]);

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        if (flashcardSet && currentQuestionIndex < flashcardSet.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsFlipped(false); // Reset flip status when moving to the next card
        }
    };

    const previousCard = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setIsFlipped(false); // Reset flip status when moving to the previous card
        }
    };

    if (!flashcardSet) {
        return <div>Loading...</div>;
    }

    const content = isFlipped ? flashcardSet.questions[currentQuestionIndex].Answer : flashcardSet.questions[currentQuestionIndex].Question;
    const cardBackgroundClass = isFlipped ? "bg-green-500" : "bg-accent";

    return (
        <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] text-text mt-8 space-y-4">
            <div>
                <h2 className='font-semibold text-3xl text-center'>{flashcardSet.title}</h2>
            </div>
            <div onClick={toggleFlip} className={`${cardBackgroundClass} min-h-[30vh] text-center flex justify-center items-center cursor-pointer transition-colors duration-300`}>
                <h1 className="text-2xl">{content}</h1>
            </div>
            <div className="grid grid-cols-1 text-center">
                <p>Card {currentQuestionIndex + 1} of {flashcardSet.questions.length}</p>
                <div className="w-full h-2 mt-4 bg-accent rounded">
                    <div
                        className="h-full bg-red-400 rounded"
                        style={{
                            width: `${(currentQuestionIndex / (flashcardSet.questions.length - 1)) * 100}%`,
                        }}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={previousCard} className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white">
                    Previous Card
                </button>
                <button onClick={nextCard} className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white">
                    Next Card
                </button>
            </div>
        </main>
    );
}
