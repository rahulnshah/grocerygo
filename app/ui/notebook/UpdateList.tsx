import Link from 'next/link';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
export function UpdateList({ id }: { id: string }) {
    return (
        <Link
            href={`/notebook/lists/${id}/edit`}>
            <IconButton>
                <EditIcon sx={{ color: '#ED9121' }} />
            </IconButton>
        </Link>
    );
}