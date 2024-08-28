import { checkItem } from "@/app/lib/actions";
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function CheckItem({ id, list_id}: { id: string; list_id: string}) {
    const checkItemWithId = checkItem.bind(null, id, list_id);

    return (
        <form action={checkItemWithId}>
            <IconButton type="submit">
                <CheckCircleIcon />
            </IconButton>
        </form>
    );
}