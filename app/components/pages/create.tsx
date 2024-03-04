"use client"
import { useState } from "react";


export default function Create() {
    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

    const addQuestion = () => {
        const newQuestion = { question: "", answer: "" };
        setQuestions([...questions, newQuestion]);
    };

    const handleChange = (index: number, field: 'question' | 'answer', value: any) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const isAddButtonDisabled = questions[questions.length - 1].question === "" || questions[questions.length - 1].answer === "";

    const saveFlashCards = () => {
        const flashCards = {
            title: topic,
            questions: questions.map((q, index) => ({
                id: index + 1,
                Question: q.question,
                Answer: q.answer
            }))
        };
        const flashCardsStr = JSON.stringify(flashCards);
        const key = `${topic.replace(/ /g, "_")}_flashcard`;

        // Save the flashcard set
        localStorage.setItem(key, flashCardsStr);

        // Update the list of flashcard set keys
        const keys = JSON.parse(localStorage.getItem('flashcardKeys') || '[]');
        if (!keys.includes(key)) {
            keys.push(key);
            localStorage.setItem('flashcardKeys', JSON.stringify(keys));
        }
        const fileName = `${topic.replace(/ /g, "_")}_flashcards.json`;
        const jsonStr = JSON.stringify(flashCards, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
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
                    <div key={index} className={`grid grid-cols-1 space-y-2 ${index < questions.length - 1 ? "pb-4 mb-4 border-b-2 border-gray-200" : ""}`}>
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
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={addQuestion}
                        className={`bg-accent p-2 mx-auto rounded ${isAddButtonDisabled ? "bg-gray-400" : ""}`}
                        disabled={isAddButtonDisabled}
                    >
                        Add Question
                    </button>
                    <button
                        onClick={saveFlashCards}
                        className="bg-accent p-2 mx-auto rounded"
                        disabled={questions.length === 0 || topic.trim() === ""}
                    >
                        Save FlashCards
                    </button>
                </div>
            </div>
        </main>
    );
}
