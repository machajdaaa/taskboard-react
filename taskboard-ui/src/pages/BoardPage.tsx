import { useState } from 'react';
import {
  Box, Typography, Button, MenuItem, TextField,
  CircularProgress, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTasks } from '../hooks/useTasks';
import { TaskList } from '../components/TaskList';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { statusOptions } from '../constants/taskStatus';
import type { Task, CreateTaskRequest } from '../services/taskApi';

export const BoardPage = () => {
  const {
    tasks, loading, error,
    filterStatus, setFilterStatus,
    createTask, updateTask, removeTask,
  } = useTasks();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const openCreateDialog = () => {
    setEditTask(null);
    setDialogOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setEditTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: CreateTaskRequest) => {
    if (editTask) {
      await updateTask(editTask.id, data);
    } else {
      await createTask(data);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Opravdu chcete tento úkol smazat?')) {
      await removeTask(id);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Úkoly</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateDialog}>
          Nový úkol
        </Button>
      </Box>

      <TextField
        select
        label="Filtrovat dle stavu"
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
        size="small"
        sx={{ minWidth: 200, mb: 3 }}
      >
        <MenuItem value="">Všechny</MenuItem>
        {statusOptions.map(o => (
          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
        ))}
      </TextField>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList tasks={tasks} onEdit={openEditDialog} onDelete={handleDelete} />
      )}

      <TaskFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        editTask={editTask}
      />
    </Box>
  );
};