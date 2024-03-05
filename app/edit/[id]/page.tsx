import Navbar from "@/app/components/navbar";
import Edit from "@/app/components/pages/edit";

export default function EditLayout({ params }: { params: { id: any } }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <Edit id={params.id} />
        </>
    )
}