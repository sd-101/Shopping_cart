import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  ListItemIcon,
  ListItemText,
  keyframes,
  Fade,
  Zoom,
  Avatar,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Store,
  Person,
  Receipt,
  Logout,
  Login,
  PersonAdd,
  LocalOffer,
  FavoriteBorder,
  Notifications,
  Search,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useColorMode } from '../../contexts/ThemeContext.jsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useCart } from '../../hooks/useCart.jsx';

// Enhanced animations
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2), 0 0 30px rgba(102, 126, 234, 0.1);
  }
  50% { 
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4), 0 0 40px rgba(102, 126, 234, 0.2);
  }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  // Enhanced scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{
        transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: scrolled
          ? theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(10, 15, 30, 0.95)'
          : theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(15, 21, 35, 0.85)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: scrolled 
          ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          : `1px solid ${alpha(theme.palette.divider, 0.05)}`,
        boxShadow: scrolled
          ? theme.palette.mode === 'light'
            ? '0 8px 32px rgba(0, 0, 0, 0.12)'
            : '0 8px 32px rgba(0, 0, 0, 0.6)'
          : 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: scrolled 
            ? 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)'
            : 'transparent',
          backgroundSize: '300% 100%',
          animation: scrolled ? `${shimmer} 3s ease infinite` : 'none',
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: { xs: 70, sm: 80 },
            py: 1,
          }}
        >
          {/* Enhanced Logo Section */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              textDecoration: 'none',
              color: 'inherit',
              mr: 'auto',
              position: 'relative',
              '&:hover .logo-box': {
                transform: 'rotate(10deg) scale(1.1)',
                animation: `${glow} 2s ease-in-out infinite`,
              },
              '&:hover .logo-text': {
                backgroundSize: '200% auto',
                animation: `${shimmer} 2s linear infinite`,
              },
              '&:hover .logo-subtitle': {
                opacity: 1,
                transform: 'translateY(0)',
              }
            }}
          >
            <Box
              className="logo-box"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 3,
                background: theme.palette.mode === 'light'
                  ? `linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`
                  : `linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)`,
                boxShadow: theme.palette.mode === 'light'
                  ? '0 10px 30px rgba(102, 126, 234, 0.4)'
                  : '0 10px 30px rgba(79, 172, 254, 0.4)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  transition: 'left 0.6s',
                },
                '&:hover::before': {
                  left: '100%',
                }
              }}
            >
              <Store sx={{ 
                color: 'white', 
                fontSize: 28, 
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                animation: `${float} 4s ease-in-out infinite`,
              }} />
            </Box>
            
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography 
                className="logo-text"
                variant="h4" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  letterSpacing: '-0.02em',
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Clash Display", "Inter", sans-serif',
                }}
              >
                ShopCart
              </Typography>
              <Typography
                className="logo-subtitle"
                variant="caption"
                sx={{
                  display: 'block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: theme.palette.text.secondary,
                  mt: -0.5,
                  opacity: 0.7,
                  transform: 'translateY(-5px)',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Premium Store
              </Typography>
            </Box>
          </Box>

          {/* Enhanced Navigation Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {/* Search Button */}
            <Tooltip title="Search Products" arrow TransitionComponent={Zoom}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)'
                    : 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
                  '&:hover': {
                    transform: 'scale(1.1) translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    animation: `${pulse} 1s ease-in-out infinite`,
                  }
                }}
              >
                <Search sx={{ fontSize: 22, color: theme.palette.primary.main }} />
              </IconButton>
            </Tooltip>

            {/* Enhanced Shop Button */}
            <Button 
              component={Link} 
              to="/shop"
              startIcon={<LocalOffer sx={{ fontSize: 20 }} />}
              sx={{
                px: { xs: 2, sm: 4 },
                py: 1.5,
                fontWeight: 800,
                fontSize: '0.9rem',
                borderRadius: 3,
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: '"Inter", sans-serif',
                color: isActive('/shop') ? 'white' : theme.palette.text.primary,
                background: isActive('/shop')
                  ? theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  : 'transparent',
                boxShadow: isActive('/shop')
                  ? '0 6px 20px rgba(102, 126, 234, 0.4)'
                  : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: -1,
                },
                '&:hover': {
                  color: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 12px 30px rgba(102, 126, 234, 0.5)'
                    : '0 12px 30px rgba(79, 172, 254, 0.5)',
                  '&::before': {
                    opacity: 1,
                  }
                }
              }}
            >
              Shop
            </Button>

            {/* Enhanced Theme Toggle */}
            <Tooltip 
              title={theme.palette.mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              arrow
              TransitionComponent={Zoom}
            >
              <IconButton 
                onClick={toggleColorMode}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
                    : 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 6px 20px rgba(252, 182, 159, 0.4)'
                    : '0 6px 20px rgba(52, 152, 219, 0.4)',
                  '&:hover': {
                    transform: 'rotate(180deg) scale(1.15)',
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 8px 25px rgba(252, 182, 159, 0.6)'
                      : '0 8px 25px rgba(52, 152, 219, 0.6)',
                  }
                }}
              >
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon sx={{ fontSize: 24, color: 'white' }} />
                ) : (
                  <Brightness4Icon sx={{ fontSize: 24, color: 'white' }} />
                )}
              </IconButton>
            </Tooltip>

            {/* Enhanced Cart Icon */}
            {user && (
              <Tooltip title="Shopping Cart" arrow TransitionComponent={Zoom}>
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 6px 20px rgba(250, 112, 154, 0.4)',
                    animation: cartItemsCount > 0 ? `${pulse} 2s ease-in-out infinite` : 'none',
                    '&:hover': {
                      transform: 'scale(1.15) translateY(-3px)',
                      boxShadow: '0 12px 30px rgba(250, 112, 154, 0.6)',
                    }
                  }}
                >
                  <Badge 
                    badgeContent={cartItemsCount} 
                    sx={{
                      '& .MuiBadge-badge': {
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.5)',
                        border: '2px solid white',
                        animation: cartItemsCount > 0 ? `${bounceIn} 0.6s ease-out` : 'none',
                        minWidth: 22,
                        height: 22,
                      }
                    }}
                  >
                    <ShoppingCart sx={{ fontSize: 24, color: 'white' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* Notifications (for logged-in users) */}
            {user && (
              <Tooltip title="Notifications" arrow TransitionComponent={Zoom}>
                <IconButton
                  onClick={handleNotificationMenu}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                      : 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 6px 20px rgba(168, 237, 234, 0.4)',
                    '&:hover': {
                      transform: 'scale(1.1) translateY(-2px)',
                      animation: `${float} 2s ease-in-out infinite`,
                    }
                  }}
                >
                  <Badge badgeContent={2} color="error">
                    <Notifications sx={{ fontSize: 24, color: 'white' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* Enhanced User Menu or Auth Buttons */}
            {user ? (
              <>
                <Tooltip title="Account Menu" arrow TransitionComponent={Zoom}>
                  <IconButton
                    onClick={handleMenu}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      background: theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        transform: 'scale(1.1) translateY(-2px)',
                        animation: `${float} 2s ease-in-out infinite`,
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'transparent',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '1rem',
                      }}
                    >
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                {/* Enhanced User Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  TransitionComponent={Fade}
                  transitionDuration={300}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 2,
                      minWidth: 280,
                      borderRadius: 4,
                      overflow: 'visible',
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.98)'
                        : 'rgba(17, 24, 39, 0.98)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                        : '0 20px 40px rgba(0, 0, 0, 0.6)',
                      animation: `${slideDown} 0.3s ease-out`,
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 20,
                        width: 12,
                        height: 12,
                        bgcolor: theme.palette.mode === 'light'
                          ? 'rgba(255, 255, 255, 0.98)'
                          : 'rgba(17, 24, 39, 0.98)',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      },
                      '& .MuiMenuItem-root': {
                        px: 3,
                        py: 2,
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          transform: 'translateX(6px)',
                        }
                      }
                    },
                  }}
                >
                  <Box sx={{ px: 3, py: 2.5, mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight={800}
                      sx={{
                        background: theme.palette.mode === 'light'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {user.name || 'User'}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontWeight: 500,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem component={Link} to="/profile">
                    <ListItemIcon>
                      <Person fontSize="small" sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText>Profile Settings</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/orders">
                    <ListItemIcon>
                      <Receipt fontSize="small" sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText>Order History</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/wishlist">
                    <ListItemIcon>
                      <FavoriteBorder fontSize="small" sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText>Wishlist</ListItemText>
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'error.main' }}>Sign Out</ListItemText>
                  </MenuItem>
                </Menu>

                {/* Notifications Menu */}
                <Menu
                  anchorEl={notificationAnchor}
                  open={Boolean(notificationAnchor)}
                  onClose={handleNotificationClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      mt: 2,
                      minWidth: 320,
                      maxHeight: 400,
                      borderRadius: 4,
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.98)'
                        : 'rgba(17, 24, 39, 0.98)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                        : '0 20px 40px rgba(0, 0, 0, 0.6)',
                    }
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your order #12345 has been shipped!
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      New products added to Electronics category
                    </Typography>
                  </Box>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  component={Link} 
                  to="/login"
                  startIcon={<Login sx={{ fontSize: 20 }} />}
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: 1.5,
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    borderRadius: 3,
                    textTransform: 'none',
                    fontFamily: '"Inter", sans-serif',
                    color: theme.palette.text.primary,
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      transition: 'left 0.4s ease',
                      zIndex: -1,
                    },
                    '&:hover': {
                      color: 'white',
                      borderColor: 'transparent',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
                      '&::before': {
                        left: 0,
                      }
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  component={Link} 
                  to="/register"
                  startIcon={<PersonAdd sx={{ fontSize: 20 }} />}
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: 1.5,
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    borderRadius: 3,
                    textTransform: 'none',
                    fontFamily: '"Inter", sans-serif',
                    color: 'white',
                    background: theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 6px 25px rgba(102, 126, 234, 0.4)'
                      : '0 6px 25px rgba(79, 172, 254, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 15px 40px rgba(102, 126, 234, 0.6)'
                        : '0 15px 40px rgba(79, 172, 254, 0.6)',
                      '&::before': {
                        opacity: 1,
                      }
                    }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;