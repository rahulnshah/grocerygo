import Navbar from './ui/home/NavBar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-center h-screen ml-24">
          <h1 className="text-4xl font-bold text-black mb-4">
            GroceryGo
          </h1>
          <p className="text-xl text-black mb-6">
            Say goodbye to forgotten items and disorganized lists. <br />
            Our app ensures you have everything you need,<br />
            right when you need it!
          </p>
          <div className="flex gap-4 mt-6">
            <a href="/signup" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Sign up for free
            </a>
            {/* App Store button */}
            {/* Google Play button */}
          </div>
        </div>
      </div>
    </>
  );
}
