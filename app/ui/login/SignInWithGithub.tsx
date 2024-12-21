
import { signIn } from '@/auth';

export default async function SignInWithGithub() {
    return (
        <>
            <form
                action={async () => {
                    await signIn("github");
                }}
            >
                <button type="submit">Sign in with GitHub</button>
            </form>
        </>
    )
} 