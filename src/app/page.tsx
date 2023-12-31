"use client"
import List from "./components/List";

export default function Home() {
    return(
        <div className="bg-black min-h-screen">
            <div className="max-w-4xl mx-auto py-20 px-4">
                <List />
            </div>
        </div>
    )
}