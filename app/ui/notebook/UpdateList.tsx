import { updateList } from "@/app/lib/actions";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
export function UpdateList({ id }: { id: string }) {
    const updateListWithId = updateList.bind(null, id);

    return (
        <form action={updateListWithId}>
            <IconButton type="submit">
                <EditIcon sx={{ color: '#ED9121' }} />
            </IconButton>
        </form>
    );
}