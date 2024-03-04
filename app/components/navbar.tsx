export default function Navbar() {
    return (
        <nav className="xl:px-[20vw] lg:px-[15vw] md:px-[5vw] px-[2vw] bg-primary text-white p-2">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <a href="/" className="text-lg font-semibold">
                    FlashCards
                </a>
                <div className="flex space-x-4">
                    <a
                        href="/create"
                        className="hover:bg-white hover:text-black bg-accent duration-300 px-3 py-2 rounded"
                    >
                        Create
                    </a>
                </div>
            </div>
        </nav>
    );
}