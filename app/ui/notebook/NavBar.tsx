import { signOut } from "@/auth";
import AllLinks from "./AllLinks";
const Navbar = () => {
  return (
    <nav className="bg-[#5B3A29]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <AllLinks/>
        </div>
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
    </nav>
  );
};

export default Navbar;
