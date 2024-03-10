"use client";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartConfiguration } from "chart.js";

export default function FlashCard({ id }: { id: string }) {
  interface Question {
    Question: string;
    Answer: string;
    studied?: number; // Optional field to track study count
  }

  interface FlashcardSet {
    id: string;
    title: string;
    questions: Question[];
  }

  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [toggleStats, setToggleStats] = useState(false);
  const [averageStudied, setAverageStudied] = useState(0);
  const [leastStudiedCards, setLeastStudiedCards] = useState<string[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (toggleStats && flashcardSet && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return; // Guard clause if getContext returns null

      // Assuming questions are listed in the desired order in flashcardSet.questions
      let studiedCounts = flashcardSet.questions
        .map((q) => q.studied || 0)
        .reverse();

      let labels = flashcardSet.questions
        .map((_, index) => `Question ${index + 1}`)
        .reverse();

      // If the order is incorrect, reverse the arrays (remove these lines if not needed)
      // studiedCounts = studiedCounts.reverse();
      // labels = labels.reverse();

      const data = {
        labels,
        datasets: [
          {
            data: studiedCounts,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
        ],
      };

      const chartConfig: ChartConfiguration = {
        type: "polarArea",
        data: data,
        options: {
          plugins: {
            legend: {
              display: false, // This will hide the legend (labels next to the chart)
            },
            tooltip: {
              enabled: true, // This will disable the tooltips
            },
          },
          scales: {
            r: {
              pointLabels: {
                display: false,
              },
            },
          },
        },
      };

      const chartInstance = new Chart(ctx, chartConfig);
      chartInstanceRef.current = chartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [toggleStats, flashcardSet]);

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
      if (e.code === "Space") {
        e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFlipped, flashcardSet, currentQuestionIndex]);

  const saveFlashCardSet = () => {
    if (flashcardSet) {
      localStorage.setItem(id, JSON.stringify(flashcardSet));
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    if (isFlipped && flashcardSet) {
      // Increase studied count only when flipping back to question side
      const updatedSet = { ...flashcardSet };
      const currentQuestion = updatedSet.questions[currentQuestionIndex];
      currentQuestion.studied = (currentQuestion.studied || 0) + 1;
      setFlashcardSet(updatedSet);
      saveFlashCardSet();
    }
  };

  const nextCard = () => {
    if (
      flashcardSet &&
      currentQuestionIndex < flashcardSet.questions.length - 1
    ) {
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

  const viewStats = () => {
    if (flashcardSet) {
      // Calculate average studied count
      const avgStudied =
        flashcardSet.questions.reduce(
          (total, question) => total + (question.studied || 0),
          0
        ) / flashcardSet.questions.length;
      setAverageStudied(avgStudied);

      // Sort questions by their 'studied' count in ascending order to find the least studied
      const sortedQuestionsIndices = flashcardSet.questions
        .map((question, index) => ({ index, studied: question.studied || 0 }))
        .sort((a, b) => a.studied - b.studied)
        .map((q) => q.index + 1); // Convert to 1-based indexing for display purposes

      // Select the indices of the first least studied questions
      // Assuming you want to display the 5 least studied questions
      const leastStudiedQuestionIndices = sortedQuestionsIndices.slice(0, 5);

      // Format as Q1, Q2, etc., based on sorted indices
      const leastStudiedCardsFormatted = leastStudiedQuestionIndices.map(
        (index) => `Q${index}`
      );

      setLeastStudiedCards(leastStudiedCardsFormatted);

      // Toggle stats view
      setToggleStats(!toggleStats);
    }
  };

  if (!flashcardSet) {
    return <div>Loading...</div>;
  }

  const content = isFlipped
    ? flashcardSet.questions[currentQuestionIndex].Answer
    : flashcardSet.questions[currentQuestionIndex].Question;
  const cardBackgroundClass = isFlipped ? "bg-green-500" : "bg-accent";

  return (
    <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] text-text my-8 space-y-4">
      <div>
        <h2 className="font-semibold text-3xl text-center">
          {flashcardSet.title}
        </h2>
      </div>
      <div
        onClick={toggleFlip}
        className={`${cardBackgroundClass} min-h-[30vh] text-center flex justify-center items-center cursor-pointer transition-colors duration-300`}
      >
        <h1 className="text-2xl">{content}</h1>
      </div>
      <div className="text-center">
        <p>
          Card {currentQuestionIndex + 1} of {flashcardSet.questions.length}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={previousCard}
          className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white"
        >
          Previous Card
        </button>
        <button
          onClick={toggleFlip}
          className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white"
        >
          Flip Card
        </button>
        <button
          onClick={nextCard}
          className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white"
        >
          Next Card
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 text-center">
        <a
          href={`/edit/${id}`}
          className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white"
        >
          Update FlashCard
        </a>
        {flashcardSet.questions[0]?.studied && (
          <a
            onClick={viewStats}
            className="bg-accent p-2 duration-300 rounded hover:bg-black border border-white"
          >
            View Stats
          </a>
        )}
      </div>
      {toggleStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="grid-cols-2 grid text-center gap-4">
              <div className="bg-accent/75 border border-white p-4 rounded">
                <h1 className="text-2xl font-semibold">Average Revisions</h1>
                <h2 className="text-xl font-medium">
                  {averageStudied.toFixed(2)}
                </h2>
              </div>

              <div className="bg-accent/75 border border-white p-4 rounded">
                <h1 className="text-2xl font-semibold">Least Studied Cards</h1>
                <h2 className="text-xl font-medium">
                  {leastStudiedCards.join(", ")}
                </h2>
              </div>
            </div>
          </div>
          <div className="rounded bg-accent/75 border border-white p-4 text-center">
            <h1 className="text-2xl font-semibold">Polar Graph</h1>
            <canvas ref={chartRef} />
          </div>
        </div>
      )}
    </main>
  );
}
