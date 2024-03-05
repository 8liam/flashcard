"use client"
import { useState } from "react";

export default function Create() {
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

    const addQuestion = () => {
        setQuestions([...questions, { question: "", answer: "" }]);
    };

    const handleChange = (index: number, field: 'question' | 'answer', value: any) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const removeLastQuestion = () => {
        if (questions.length > 1) {
            setQuestions(questions.slice(0, -1));
        } else {
            alert("You must have at least one question.");
        }
    };

    const canSave = () => {
        return topic.trim() !== "" && !questions.some(q => q.question.trim() === "" || q.answer.trim() === "");
    };

    const saveFlashCards = () => {
        if (!canSave()) {
            alert("Please fill in all fields before saving.");
            return;
        }

        const flashCards = {
            title: topic,
            questions: questions.map((q, index) => ({
                id: index + 1,
                Question: q.question,
                Answer: q.answer
            }))
        };

        // Proceed with saving logic...
        const key = `${topic.replace(/ /g, "_")}_flashcard`;
        const flashCardsStr = JSON.stringify(flashCards);
        localStorage.setItem(key, flashCardsStr);

        // Update the list of flashcard set keys
        const keys = JSON.parse(localStorage.getItem('flashcardKeys') || '[]');
        if (!keys.includes(key)) {
            keys.push(key);
            localStorage.setItem('flashcardKeys', JSON.stringify(keys));
        }

        alert("Flashcards saved successfully!");
    };

    return (
        <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] min-h-screen text-text mt-8">
            <h1 className="text-4xl font-semibold text-center">Create FlashCards</h1>
            <div className="text-text bg-primary rounded p-2 space-y-2">
                <div className="space-y-2">
                    <h1>Topic</h1>
                    <input
                        className="p-2 w-full bg-accent"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                {questions.map((question, index) => (
                    <div key={index} className="grid grid-cols-1 space-y-2">
                        <div className="space-y-2">
                            <h1>Question {index + 1}</h1>
                            <input
                                className="p-2 w-full bg-accent"
                                value={question.question}
                                onChange={(e) => handleChange(index, 'question', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <h1>Answer</h1>
                            <input
                                className="p-2 w-full bg-accent"
                                value={question.answer}
                                onChange={(e) => handleChange(index, 'answer', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-2">
                    <button
                        onClick={addQuestion}
                        className="bg-accent p-2 rounded hover:bg-primary transition duration-300"
                    >
                        Add Question
                    </button>
                    <button
                        onClick={removeLastQuestion}
                        className="bg-red-500 p-2 rounded hover:bg-red-700 transition duration-300"
                    >
                        Remove Last Question
                    </button>
                    <button
                        onClick={saveFlashCards}
                        className={`bg-accent p-2 rounded ${!canSave() ? "bg-gray-400" : "hover:bg-primary transition duration-300"}`}
                        disabled={!canSave()}
                    >
                        Save FlashCards
                    </button>
                </div>
            </div>
        </main>
    );
}

