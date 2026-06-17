import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Link, Box } from '@mui/material';
import { theme } from './themes';
import { BoardPage } from './pages/BoardPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TaskBoard
          </Typography>
          <Link
            href="http://localhost:3000/api-docs"
            target="_blank"
            rel="noopener"
            sx={{ color: 'inherit', textDecoration: 'underline' }}
          >
            API dokumentace
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <BoardPage />
      </Box>
    </ThemeProvider>
  );
}

export default App;