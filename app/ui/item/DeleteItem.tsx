import { deleteItem } from "@/app/lib/actions";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function DeleteItem({ id, list_id }: { id: string; list_id: string }) {
    const deleteItemWithId = deleteItem.bind(null, id, list_id);
    
    return (
        <form action={deleteItemWithId}>
            <IconButton type="submit">
                <DeleteIcon sx={{ color: '#ED9121' }} />
            </IconButton>
        </form>
    );
}