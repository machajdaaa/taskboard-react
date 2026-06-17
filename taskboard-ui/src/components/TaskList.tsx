import { Box, Typography } from '@mui/material';
import { TaskCard } from './TaskCard';
import type { Task } from '../services/taskApi';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onEdit, onDelete }: Props) => {
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography color="text.secondary">
          Žádné úkoly k zobrazení.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};