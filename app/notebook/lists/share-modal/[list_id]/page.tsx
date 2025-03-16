import ShareModal from "@/app/ui/modals/ShareModal";
import { auth } from "@/auth";

export default async function Page({ params, searchParams }: { params: Promise<{ list_id: string }>, searchParams?: Promise<{ query?: string }> }) {
  const session = await auth();
 
  if (!session?.user) return null;
  const a = await params;
  const sParams = await searchParams;
  console.log("a", a);
  console.log("sParams", sParams);
  return (
    <ShareModal listId={a.list_id} ownerId={session.user?.id || ""} searchParams={sParams?.query || ''} />
  )
}
