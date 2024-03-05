"use client"
import { useEffect, useState } from 'react';

export default function FlashCards() {
    interface Question {
        Question: string;
        Answer: string;
    }

    interface FlashcardSet {
        id: any;
        title: string;
        questions: Question[];
    }

    const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadAllFlashCards = async () => {
            setIsLoading(true);
            const keys = JSON.parse(localStorage.getItem('flashcardKeys') || '[]');
            const flashcardSets: FlashcardSet[] = keys.map((key: string) => {
                const flashCardsStr = localStorage.getItem(key);
                return flashCardsStr ? JSON.parse(flashCardsStr) : null;
            }).filter((set: any) => set !== null);

            setFlashcardSets(flashcardSets);
            setIsLoading(false);
        };

        loadAllFlashCards();
    }, []);



    if (isLoading) {
        return <div className="text-3xl font-semibold text-center mt-8">Loading FlashCards...</div>;
    }

    return (
        <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] mt-8 space-y-4 text-text">
            {flashcardSets.length > 0 ? (
                <div>
                    <h1 className='text-center text-3xl font-semibold'>You have {flashcardSets.length} FlashCards</h1>
                </div>

            ) : (
                <div className='text-center space-y-4'>
                    <h1 className='text-3xl font-semibold mb-4'>You have {flashcardSets.length} FlashCards</h1>
                    <a className="mt-4 bg-accent p-2 rounded text-xl font-light border border-white duration-300 hover:bg-black" href='/create'>Click here to Create FlashCards</a>
                </div>
            )}

            <div className='grid grid-cols-3 gap-4'>
                {flashcardSets.map((set) => (
                    <a key={set.id} href={`/flashcard/${set.id}`} className="flashcard-set bg-accent p-2 rounded duration-300 hover:bg-primary border border-white flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                            <h1 className='text-white/75'>Topic</h1>
                            <h1 className='text-white/75'>Cards</h1>
                        </div>
                        <div className="flex justify-between items-center">
                            <h2 className='font-semibold'>{set.title}</h2>
                            <h2 className='font-semibold'>{set.questions.length}</h2>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    );
}
