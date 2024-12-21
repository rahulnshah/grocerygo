import NotebookPage from "./NoteBookPage";
import { auth } from '../../auth';
 
export default async function Page() {
  const session = await auth()
 
  if (!session?.user) return null;
 
  return (
    <NotebookPage user_id={session.user.id!} username={session.user.name!} />
  )
}