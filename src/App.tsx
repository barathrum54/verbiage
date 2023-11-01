import React, { useState } from 'react';
import { Container, ThemeProvider, CssBaseline, createTheme, Fab, Box, IconButton } from '@mui/material';
import SearchBar from './components/SearchBar';
import TranslationList from './components/TranslationList';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import data from './constants/data.json'; // Assuming you have your data source

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const handleSearch = (term: string) => {
    console.log(searchTerm);
    setSearchTerm(term); // Set the search term in the state
  };


  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => ({
              '::-webkit-scrollbar': {
                width: '12px',
              },
              '::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === 'dark' ? '#4CAF50' : '#0078d4',
                border: '2px solid #fff',
                borderColor: theme.palette.mode === 'dark' ? '#4CAF50' : '#0078d4',
                borderRadius: '10px',
              },
              '::-webkit-scrollbar-track': {
                background: theme.palette.mode === 'dark' ? '#000' : '#fff',
              },
              scrollbarWidth: 'auto',
              scrollbarColor: theme.palette.mode === 'dark' ? '#4CAF50 #0078d4' : '#0078d4 #4CAF50',
            }),
          },
        },
        palette: {
          mode,
        },
      }),
    [mode],
  );
  const LogoImage = React.useMemo(() => {
    return (
      <div className='logoWrapper'>
        <div className={searchTerm === '' ? 'eye closed' : 'eye'}></div>
        <img
          src="logo-full-light.png"
          alt="Verbiage Logo"
          style={{
            objectFit: 'contain',
            width: '300px',
            marginBottom: '10px',
            display: theme.palette.mode === 'dark' ? 'none' : 'block'
          }}
        />
        <img
          src="logo-full-dark.png"
          alt="Verbiage Logo"
          style={{
            objectFit: 'contain',
            width: '300px',
            marginBottom: '10px',
            display: theme.palette.mode === 'light' ? 'none' : 'block'
          }}
        />
      </div>
    )
  }, [theme.palette.mode, searchTerm]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fab sx={{
        boxShadow: 'none'
      }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
            boxShadow: 'none'
          }}
        >
          <IconButton sx={{
            ml: 1,
            boxShadow: 'none'
          }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Fab>
      <Container sx={{ paddingBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        {LogoImage}

        <SearchBar onSearch={handleSearch} />
        <TranslationList searchTerm={searchTerm} data={data} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
