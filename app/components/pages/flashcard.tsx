"use client"
import { useEffect, useState } from "react";

export default function FlashCard({ id }: { id: string }) {
    interface Question {
        Question: string;
        Answer: string;
    }

    interface FlashcardSet {
        id: string;
        title: string;
        questions: Question[];
    }

    const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const loadFlashCardSet = () => {
            const flashCardStr = localStorage.getItem(id);
            const set = flashCardStr ? JSON.parse(flashCardStr) : null;
            setFlashcardSet(set);
        };

        loadFlashCardSet();
    }, [id]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                toggleFlip();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isFlipped]);

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        if (flashcardSet && currentQuestionIndex < flashcardSet.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsFlipped(false);

        }
    };

    const previousCard = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setIsFlipped(false);
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
            <div className="text-center">
                <p>Card {currentQuestionIndex + 1} of {flashcardSet.questions.length}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <button onClick={previousCard} className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white">
                    Previous Card
                </button>
                <button onClick={toggleFlip} className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white">
                    Flip Card
                </button>
                <button onClick={nextCard} className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white">
                    Next Card
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 text-center">
                <a href={`/edit/${id}`} className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white">
                    Update FlashCard
                </a>
            </div>
        </main>
    );
}
