import { signOut } from "@/auth";

const LogOutButton = async () => {
    return (
        <div className="flex items-center space-x-4">
            <form action={async () => {
                await signOut();
            }}>
                <button
                    type="submit"
                    className="text-white hover:text-gray-200"
                >
                    Log out
                </button>
            </form>
        </div>
    );
}

export default LogOutButton;