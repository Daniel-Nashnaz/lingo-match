import { Button } from "@/components/ui/button";
import Link from "next/link";

const Custom404 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold mb-6">Oops! Page Not Found</h1>
            <p className="text-xl mb-8">It seems the page you are looking for does not exist.</p>
            <Link href="/" passHref>
                <Button size="lg" className="w-full max-w-md mb-4">
                    Go to Home
                </Button>
            </Link>
        </div>
    );
};

export default Custom404;
