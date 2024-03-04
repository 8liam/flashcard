import Navbar from "../components/navbar";
import Create from "../components/pages/create";
export default function CreateLayout() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <Create />
        </>
    )
}