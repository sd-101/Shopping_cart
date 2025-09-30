import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'light' });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { 
            main: mode === 'light' ? '#667eea' : '#5b8def',
            light: mode === 'light' ? '#8fa4f3' : '#7ba7f7',
            dark: mode === 'light' ? '#4c63d2' : '#3d5af1',
            contrastText: '#ffffff'
          },
          secondary: { 
            main: mode === 'light' ? '#f093fb' : '#ff8fa3',
            light: mode === 'light' ? '#f3a6fc' : '#ffb3c1',
            dark: mode === 'light' ? '#ed7efa' : '#ff6b85',
            contrastText: '#ffffff'
          },
          success: { 
            main: '#4facfe',
            light: '#7cc4fe',
            dark: '#2196f3',
            contrastText: '#ffffff'
          },
          warning: { 
            main: '#fcb69f',
            light: '#fdc7b3',
            dark: '#fba588',
            contrastText: '#ffffff'
          },
          error: { 
            main: '#f5576c',
            light: '#f77a8a',
            dark: '#f33554',
            contrastText: '#ffffff'
          },
          background: {
            default: mode === 'light' ? '#fafbff' : '#0a0e1a',
            paper: mode === 'light' ? '#ffffff' : '#111827',
          },
          text: {
            primary: mode === 'light' ? '#1a202c' : '#f7fafc',
            secondary: mode === 'light' ? '#4a5568' : '#a0aec0',
          },
          divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
        },
        typography: {
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          h1: { 
            fontFamily: '"Clash Display", "Inter", sans-serif', 
            fontWeight: 800,
            fontSize: '3.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            '@media (max-width:600px)': {
              fontSize: '2.5rem',
            },
          },
          h2: { 
            fontFamily: '"Clash Display", "Inter", sans-serif', 
            fontWeight: 700,
            fontSize: '2.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            '@media (max-width:600px)': {
              fontSize: '2rem',
            },
          },
          h3: { 
            fontFamily: '"Clash Display", "Inter", sans-serif', 
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.3,
            '@media (max-width:600px)': {
              fontSize: '1.75rem',
            },
          },
          h4: { 
            fontFamily: '"Clash Display", "Inter", sans-serif', 
            fontWeight: 700,
            fontSize: '1.875rem',
            lineHeight: 1.4,
            '@media (max-width:600px)': {
              fontSize: '1.5rem',
            },
          },
          h5: { 
            fontFamily: '"Inter", sans-serif', 
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: 1.4,
          },
          h6: { 
            fontFamily: '"Inter", sans-serif', 
            fontWeight: 700,
            fontSize: '1.25rem',
            lineHeight: 1.4,
          },
          subtitle1: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
          },
          subtitle2: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 400,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontWeight: 400,
          },
          button: { 
            textTransform: 'none', 
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.02em',
          },
          caption: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
            fontWeight: 500,
          },
          overline: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          },
        },
        shape: { 
          borderRadius: 16 
        },
        shadows: [
          'none',
          '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
          '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
          '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)',
          '0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)',
          '0 25px 50px rgba(0,0,0,0.12), 0 12px 18px rgba(0,0,0,0.08)',
          ...Array(19).fill('0 25px 50px rgba(0,0,0,0.12), 0 12px 18px rgba(0,0,0,0.08)'),
        ],
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: mode === 'light' 
                    ? '0 8px 25px rgba(102, 126, 234, 0.3)' 
                    : '0 8px 25px rgba(91, 141, 239, 0.3)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              },
              contained: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                },
              },
              outlined: {
                borderWidth: '2px',
                borderColor: mode === 'light' ? '#667eea' : '#5b8def',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: mode === 'light' 
                    ? 'rgba(102, 126, 234, 0.08)' 
                    : 'rgba(91, 141, 239, 0.08)',
                },
              },
            },
            variants: [
              {
                props: { variant: 'gradient' },
                style: {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                },
              },
              {
                props: { variant: 'glass' },
                style: {
                  background: mode === 'light' 
                    ? 'rgba(255, 255, 255, 0.25)' 
                    : 'rgba(15, 21, 35, 0.25)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid ${mode === 'light' 
                    ? 'rgba(255, 255, 255, 0.18)' 
                    : 'rgba(255, 255, 255, 0.1)'}`,
                  color: mode === 'light' ? '#1a202c' : '#f7fafc',
                  '&:hover': {
                    background: mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.35)' 
                      : 'rgba(15, 21, 35, 0.35)',
                  },
                },
              },
            ],
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 20,
                border: `1px solid ${mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(255, 255, 255, 0.08)'}`,
                background: mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(17, 24, 39, 0.9)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: mode === 'light'
                    ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                    : '0 20px 40px rgba(0, 0, 0, 0.6)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                borderRadius: 16,
                border: `1px solid ${mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(255, 255, 255, 0.08)'}`,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: 'none',
                borderBottom: `1px solid ${mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(255, 255, 255, 0.08)'}`,
                background: mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.85)' 
                  : 'rgba(15, 21, 35, 0.85)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 12,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  },
                  '&.Mui-focused': {
                    transform: 'translateY(-2px)',
                    boxShadow: mode === 'light'
                      ? '0 8px 25px rgba(102, 126, 234, 0.2)'
                      : '0 8px 25px rgba(91, 141, 239, 0.2)',
                  },
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 600,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              paper: {
                borderRadius: 16,
                border: `1px solid ${mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(255, 255, 255, 0.08)'}`,
                background: mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.95)' 
                  : 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: mode === 'light'
                  ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                  : '0 20px 40px rgba(0, 0, 0, 0.6)',
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                margin: '4px 8px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateX(4px)',
                  backgroundColor: mode === 'light'
                    ? 'rgba(102, 126, 234, 0.08)'
                    : 'rgba(91, 141, 239, 0.08)',
                },
              },
            },
          },
          MuiContainer: {
            defaultProps: { 
              maxWidth: 'lg' 
            },
          },
          MuiLink: {
            styleOverrides: {
              root: { 
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                },
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                borderRadius: '16px !important',
                border: `1px solid ${mode === 'light' 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(255, 255, 255, 0.08)'}`,
                background: mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(17, 24, 39, 0.9)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '16px 0',
                },
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                border: 'none',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}