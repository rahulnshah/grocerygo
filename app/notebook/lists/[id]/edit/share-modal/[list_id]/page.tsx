import ShareModal from "@/app/ui/modals/ShareModal";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { list_id: string }}) {
  const session = await auth()
 
  if (!session?.user) return null;
  const list_id = await params.list_id;
  return (
    <ShareModal listId={list_id} ownerId={session.user.id} />
  )
}
