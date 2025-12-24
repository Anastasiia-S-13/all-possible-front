import { Metadata } from "next";
import NotFoundClient from "./not-found-client";

export const metadata: Metadata = {
    title: "404 - Page is not found",
    description: "This page does not exist.",
    openGraph: {
        title: "404 - Page is not found",
        description: "This page does not exist.",
        url: "https://08-zustand-lyart-mu.vercel.app",
        images: [{
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: "404 - Page is not found",
        }]
    }
}

const NotFound = () => {
    return <NotFoundClient />
}

export default NotFound;