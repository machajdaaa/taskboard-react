import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem,
} from '@mui/material';
import type { Task, CreateTaskRequest, TaskStatus } from '../services/taskApi';
import { statusOptions } from '../constants/taskStatus';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskRequest) => Promise<void>;
  editTask?: Task | null;
}

export const TaskFormDialog = ({ open, onClose, onSubmit, editTask }: Props) => {
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus]           = useState<TaskStatus>('todo');
  const [loading, setLoading]         = useState(false);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description ?? '');
      setStatus(editTask.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
    }
  }, [editTask, open]);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await onSubmit({ title, description, status });
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editTask ? 'Upravit úkol' : 'Nový úkol'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
        <TextField
          label="Název"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Popis"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label="Stav"
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
          select
          fullWidth
        >
          {statusOptions.map(o => (
            <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Zrušit</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading || !title.trim()}>
          {editTask ? 'Uložit' : 'Vytvořit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};