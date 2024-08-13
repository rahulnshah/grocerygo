import { deleteList } from "@/app/lib/actions";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function DeleteList({ id }: { id: string }) {
    const deleteListWithId = deleteList.bind(null, id);

    return (
        <form action={deleteListWithId}>
            <IconButton type="submit">
                <DeleteIcon sx={{ color: '#ED9121' }} />
            </IconButton>
        </form>
    );
}