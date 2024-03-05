"use client"
import { useEffect, useState } from "react";

export default function Edit({ id }: { id: string }) {
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

    useEffect(() => {
        const loadFlashCardSet = () => {
            const flashCardStr = localStorage.getItem(id);
            const set = flashCardStr ? JSON.parse(flashCardStr) : null;
            setFlashcardSet(set);
        };

        loadFlashCardSet();
    }, [id]);

    const handleChange = (index: number, field: 'Question' | 'Answer', value: string) => {
        if (!flashcardSet) return;
        const newQuestions = [...flashcardSet.questions];
        newQuestions[index][field] = value;
        setFlashcardSet({ ...flashcardSet, questions: newQuestions });
    };

    const addQuestion = () => {
        if (!flashcardSet) return;
        const newQuestions = [...flashcardSet.questions, { Question: "", Answer: "" }];
        setFlashcardSet({ ...flashcardSet, questions: newQuestions });
    };

    const removeLastQuestion = () => {
        if (!flashcardSet || flashcardSet.questions.length <= 1) {
            alert("You must have at least one question.");
            return;
        }
        const newQuestions = flashcardSet.questions.slice(0, -1);
        setFlashcardSet({ ...flashcardSet, questions: newQuestions });
    };

    const canSave = () => {
        return flashcardSet?.title.trim() !== "" && !flashcardSet?.questions.some(q => q.Question.trim() === "" || q.Answer.trim() === "");
    };

    const saveFlashCards = () => {
        if (!flashcardSet || !canSave()) {
            alert("Please fill in all fields before saving.");
            return;
        }

        localStorage.setItem(id, JSON.stringify(flashcardSet));
        alert("Flashcards updated successfully!");
    };

    const deleteFlashCards = () => {
        localStorage.removeItem(id);

        const keys = JSON.parse(localStorage.getItem('flashcardKeys') || '[]');
        const updatedKeys = keys.filter((key: string) => key !== id);
        localStorage.setItem('flashcardKeys', JSON.stringify(updatedKeys));

        alert("Flashcard set deleted successfully!");

    };

    return (
        <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] min-h-screen text-text mt-8">
            {flashcardSet ? (
                <div className="text-text bg-primary rounded p-2 space-y-2">
                    <h1 className="text-center text-white text-3xl font-semibold">Update FlashCard</h1>
                    <div className="space-y-2">
                        <h1>Topic</h1>
                        <input
                            className="p-2 w-full bg-accent"
                            value={flashcardSet.title}
                            onChange={(e) => setFlashcardSet({ ...flashcardSet, title: e.target.value })}
                        />
                    </div>
                    {flashcardSet.questions.map((question, index) => (
                        <div key={index} className="grid grid-cols-1 space-y-2">
                            <div className="space-y-2">
                                <h1>Question {index + 1}</h1>
                                <input
                                    className="p-2 w-full bg-accent"
                                    value={question.Question}
                                    onChange={(e) => handleChange(index, 'Question', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <h1>Answer</h1>
                                <input
                                    className="p-2 w-full bg-accent"
                                    value={question.Answer}
                                    onChange={(e) => handleChange(index, 'Answer', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                        <button
                            onClick={addQuestion}
                            className="border border-white bg-accent p-2 rounded hover:bg-primary transition duration-300"
                        >
                            Add Question
                        </button>
                        <button
                            onClick={removeLastQuestion}
                            className="border border-white bg-red-500 p-2 rounded hover:bg-red-700 transition duration-300"
                        >
                            Remove Last Question
                        </button>
                        <button
                            onClick={saveFlashCards}
                            className={`border border-white  p-2 rounded ${!canSave() ? "bg-green-950" : "hover:bg-primary bg-green-700 transition duration-300"}`}
                            disabled={!canSave()}
                        >
                            Save FlashCards
                        </button>
                    </div>
                    <div className="grid grid-cols-1">

                        <button
                            onClick={deleteFlashCards}
                            className={`border border-white  p-2 rounded hover:bg-primary bg-red-700 transition duration-300`}

                        >
                            Delete FlashCard
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading flashcard set...</p>
            )}
        </main>
    );
}
