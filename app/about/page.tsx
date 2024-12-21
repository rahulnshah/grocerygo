import Navbar from '../ui/home/NavBar';

export default function About() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-black mb-6">About GroceryGo</h1>
                    <p className="text-lg text-black mb-6">
                        Welcome to GroceryGo, your new favorite companion for seamless shopping! Our app transforms the mundane task of grocery shopping into an effortless and delightful experience. With smart lists, instant sharing, and personalized recommendations, GroceryGo ensures you never miss an item or a deal. Whether you&apos;re planning a cozy family dinner or stocking up for a big party, GroceryGo has got you covered with style and ease. Happy shopping!
                    </p>

                    {/* What GroceryGo Offers Section */}
                    <h2 className="text-2xl font-semibold text-black mb-6">What GroceryGo Offers</h2>

                    <div className="flex flex-wrap justify-center gap-6">
                        {/* Card 1 */}
                        <div className="max-w-xs bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-black mb-2">Browse and select</h3>
                            <p className="text-sm text-gray-700">Easily find your favorite lists and add them to your cart.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="max-w-xs bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-black mb-2">Collaborate with ease</h3>
                            <p className="text-sm text-gray-700">Shared lists that multiple users can edit in real-time. Assign items to specific users.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="max-w-xs bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-black mb-2">Scheduled delivery</h3>
                            <p className="text-sm text-gray-700">Get notified of commonly forgotten items based on your past shopping history.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
