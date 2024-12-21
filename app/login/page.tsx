import Navbar from '../ui/home/NavBar';
import LoginForm from '../ui/login/LoginForm';
import { signIn } from '@/auth';
function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-white shadow-md p-8 rounded-md w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold text-black mb-6">Log in to GroceryGo</h2>

        <div className="w-full space-y-4">
          <form
            action={async () => {
              'use server';
              await signIn("github");
            }}
          ><button type="submit">Sign in with GitHub</button>
          </form>
        </div>

        <p className="text-sm text-center my-4 text-black">OR</p>

        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
