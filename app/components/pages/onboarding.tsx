export default function Onboarding() {
    return (

        <main className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] text-text mt-8 space-y-4">

            <div className="space-y-2 text-center h-[15vh]">
                <h1 className="text-4xl font-semibold text-center">Learn with FlashCards</h1>
                <p className="text-gray-300">Reinforce your learning with digital flashcards. Study more effectively, remember more, and ace your exams.</p>
            </div>
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">Features</h2>
                <p className="text-gray-300">Some information to get you started with FlashCards.</p>
            </div>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-text hover:border-white border border-black p-2 rounded duration-300">
                    <h1 className="text-2xl font-semibold">Create FlashCards</h1>
                    <p className="text-gray-300">No sign up. Just that easy. Easily create your own flashcards with our intuitive interface.</p>
                </div>
                <div className="text-text hover:border-white border border-black p-2 rounded duration-300">
                    <h1 className="text-2xl font-semibold">View FlashCards</h1>
                    <p className="text-gray-300">View your flashcards with the click of a button. Go back, Go forward. Do what you need to study.</p>
                </div>
                <div className="text-text hover:border-white border border-black p-2 rounded duration-300">
                    <h1 className="text-2xl font-semibold">Update FlashCards</h1>
                    <p className="text-gray-300">Missed some content? Don&apos;t Worry. You can update your flashcard stack through the view page.</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:mx-24 text-center gap-8">
                <a
                    href="/flashcards"
                    className="hover:bg-white hover:text-black bg-black border border-white duration-300 px-3 py-2 rounded"
                >
                    View My FlashCards
                </a>
                <a
                    href="/create"
                    className="hover:bg-white hover:text-black bg-black border border-white duration-300 px-3 py-2 rounded"
                >
                    Create FlashCards
                </a>
            </div>


        </main>
    )
}