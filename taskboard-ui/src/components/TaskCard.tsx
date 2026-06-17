import { Card, CardContent, CardActions, Typography, Chip, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Task } from '../services/taskApi';
import { statusConfig } from '../constants/taskStatus';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: Props) => {
  const { label, color } = statusConfig[task.status];

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{display: 'flex',  justifyContent: 'space-between',  alignItems: 'center', mb: 1}}>
          <Typography variant="h6" sx={{fontSize: 16, fontWeight: 500}}>
            {task.title}
          </Typography>
          <Chip label={label} color={color} size="small" />
        </Box>
        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton size="small" onClick={() => onEdit(task)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => onDelete(task.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};