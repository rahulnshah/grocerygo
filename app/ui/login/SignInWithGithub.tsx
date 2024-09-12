
import { signIn } from "@/auth"

export default function SignInWithGithub() {
    return (
        <form
            action={
                async () => {
                    "use server"
                    await signIn("github")
                }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
} 