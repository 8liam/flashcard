"use client"
import { useEffect, useState } from 'react';

export default function FlashCards() {
    interface FlashcardSet {
        title: string;
        questions: { Question: string, Answer: string }[];
    }

    const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

    useEffect(() => {
        const loadAllFlashCards = () => {
            const keys = JSON.parse(localStorage.getItem('flashcardKeys') || '[]');
            const flashcardSets = keys.map((key: string) => {
                const flashCardsStr = localStorage.getItem(key);
                return flashCardsStr ? JSON.parse(flashCardsStr) : null;
            }).filter((set: any) => set !== null); // Filter out any null entries just in case

            // Update state with loaded flashcard sets
            setFlashcardSets(flashcardSets);
        };

        loadAllFlashCards();
    }, []);

    return (
        <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] text-text mt-8">
            <div className='grid grid-cols-3 gap-4'>
                {flashcardSets.map((set, index) => (
                    <a key={index} href={`/flashcard/${index}`} className="flashcard-set bg-accent p-2 rounded duration-300 hover:bg-primary border border-white">
                        <h1 className='text-white/75'>Topic</h1>
                        <h2 className='font-semibold'>{set.title}</h2>
                        {/*<ul>
                        {set.questions.map((q, qIndex) => (
                            <li key={qIndex}>
                                <strong>Q:</strong> {q.Question} <strong>A:</strong> {q.Answer}
                            </li>
                        ))}
                    </ul>
                        */}
                    </a>
                ))}
            </div>
        </main>
    );
}
