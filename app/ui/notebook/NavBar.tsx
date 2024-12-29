import { signOut } from "@/auth";
import AllLinks from "./AllLinks";

interface NavbarProps {
  username: string;
}

const Navbar = ({ username }: NavbarProps) => {
  return (
    <nav className="bg-[#6B4423]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <AllLinks/>
        </div>
        
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold">
            Hello there, {username}!
          </h1>
          <form action={async () => {
            'use server';
            await signOut();
          }}>
            <button
              type="submit"
              className="button-primary"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
