import Link from 'next/link';
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
          <p className="text-xl text-black -mb-1">
            Say goodbye to forgotten items and disorganized lists. <br />
            Our app ensures you have everything you need,<br />
            right when you need it!
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/signup" className="button-primary">Sign up for free</Link>
            {/* App Store button */}
            {/* Google Play button */}
          </div>
        </div>
      </div>
    </>
  );
}
