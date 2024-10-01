
import { githubSignIn } from "@/app/lib/actions"

export default function SignInWithGithub() {
    return (
        <form
            action={githubSignIn}
        >
            <button type="submit">Sign in with GitHub</button>
        </form>
    )
} 