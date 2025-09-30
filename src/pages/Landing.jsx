import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  useTheme,
  alpha,
  keyframes,
  IconButton,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useReveal } from '../hooks/useReveal.jsx';

// Enhanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(-10px) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

function Landing() {
  const theme = useTheme();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useReveal();
  const featuresRef = useReveal();
  const statsRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast Delivery',
      description: 'Free same-day delivery on orders over $50. Track your package in real-time.',
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Bank-Level Security',
      description: 'Your data is protected with 256-bit SSL encryption and fraud protection.',
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Premium Support',
      description: 'Get instant help from our expert team via chat, email, or phone.',
      color: '#ffecd2',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
      title: 'Instant Checkout',
      description: 'One-click purchasing with saved payment methods and addresses.',
      color: '#a8edea',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
  ];

  const stats = [
    { number: '1M+', label: 'Happy Customers', icon: <StarIcon /> },
    { number: '50K+', label: 'Products', icon: <ShoppingBagIcon /> },
    { number: '99.9%', label: 'Uptime', icon: <TrendingUpIcon /> },
    { number: '24/7', label: 'Support', icon: <SupportAgentIcon /> },
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Enhanced Hero Section */}
      <Box 
        ref={heroRef}
        sx={{
          position: 'relative',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          background: theme.palette.mode === 'light'
            ? `
              radial-gradient(circle at 20% 20%, ${alpha('#667eea', 0.15)} 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, ${alpha('#f093fb', 0.15)} 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, ${alpha('#4facfe', 0.1)} 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 20%, ${alpha('#4facfe', 0.2)} 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, ${alpha('#f5576c', 0.2)} 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, ${alpha('#667eea', 0.15)} 0%, transparent 50%)
            `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(240, 147, 251, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(79, 172, 254, 0.05) 0%, rgba(245, 87, 108, 0.05) 100%)',
            zIndex: -1,
          }
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  animation: isVisible ? `${slideInLeft} 0.8s ease-out` : 'none',
                }}
              >
                {user ? (
                  <>
                    <Chip 
                      label={`Welcome back, ${user.name?.split(' ')[0] || 'User'}!`}
                      sx={{
                        mb: 3,
                        px: 2,
                        py: 1,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        animation: `${bounceIn} 0.6s ease-out 0.3s both`,
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        fontWeight: 800,
                        lineHeight: 1.1,
                        mb: 3,
                        background: theme.palette.mode === 'light'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                          : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
                        backgroundSize: '200% 200%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: `${gradientMove} 4s ease infinite`,
                      }}
                    >
                      Continue Your Shopping Journey
                    </Typography>
                    <Typography 
                      variant="h5" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 4,
                        lineHeight: 1.6,
                        fontWeight: 400,
                        maxWidth: 600,
                      }}
                    >
                      Pick up where you left off. Your cart is waiting, and we have new arrivals you'll love.
                    </Typography>
                  </>
                ) : (
                  <>
                    <Chip 
                      label="✨ Premium Shopping Experience"
                      sx={{
                        mb: 3,
                        px: 2,
                        py: 1,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        animation: `${bounceIn} 0.6s ease-out 0.3s both`,
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        fontWeight: 800,
                        lineHeight: 1.1,
                        mb: 3,
                        background: theme.palette.mode === 'light'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                          : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
                        backgroundSize: '200% 200%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: `${gradientMove} 4s ease infinite`,
                      }}
                    >
                      Discover Products That Inspire Your Lifestyle
                    </Typography>
                    <Typography 
                      variant="h5" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 4,
                        lineHeight: 1.6,
                        fontWeight: 400,
                        maxWidth: 600,
                      }}
                    >
                      Curated collections, lightning-fast delivery, and premium customer service. 
                      Experience shopping reimagined.
                    </Typography>
                  </>
                )}

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3}
                  sx={{
                    animation: isVisible ? `${slideInUp} 0.8s ease-out 0.4s both` : 'none',
                  }}
                >
                  <Button 
                    component={RouterLink} 
                    to="/shop"
                    variant="gradient"
                    size="large"
                    startIcon={<ShoppingBagIcon />}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      borderRadius: 4,
                      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 50px rgba(102, 126, 234, 0.6)',
                      }
                    }}
                  >
                    {user ? 'Continue Shopping' : 'Start Shopping'}
                  </Button>
                  
                  {user ? (
                    <Button 
                      component={RouterLink} 
                      to="/cart"
                      variant="glass"
                      size="large"
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 4,
                      }}
                    >
                      View Cart
                    </Button>
                  ) : (
                    <Button 
                      component={RouterLink} 
                      to="/register"
                      variant="outlined"
                      size="large"
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 4,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Create Account
                    </Button>
                  )}
                </Stack>

                {/* Trust Indicators */}
                <Stack 
                  direction="row" 
                  spacing={4} 
                  sx={{ 
                    mt: 6,
                    animation: isVisible ? `${slideInUp} 0.8s ease-out 0.6s both` : 'none',
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={800} color="primary.main">
                      1M+
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Happy Customers
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={800} color="primary.main">
                      4.9★
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Average Rating
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={800} color="primary.main">
                      50K+
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      Products
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  position: 'relative',
                  animation: isVisible ? `${slideInRight} 0.8s ease-out 0.2s both` : 'none',
                }}
              >
                {/* Hero Image/Demo */}
                <Card 
                  sx={{ 
                    p: 4,
                    background: theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderRadius: 6,
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 25px 50px rgba(0, 0, 0, 0.15)'
                      : '0 25px 50px rgba(0, 0, 0, 0.6)',
                    animation: `${float} 6s ease-in-out infinite`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)',
                      backgroundSize: '300% 100%',
                      animation: `${shimmer} 3s ease infinite`,
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      aspectRatio: '16/10',
                      borderRadius: 4,
                      background: theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)'
                        : 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Demo UI Elements */}
                    <Box sx={{ position: 'absolute', top: 20, left: 20, right: 20 }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28ca42' }} />
                      </Box>
                      <Box sx={{ height: 8, bgcolor: alpha(theme.palette.primary.main, 0.2), borderRadius: 1, mb: 1 }} />
                      <Box sx={{ height: 8, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 1, width: '70%' }} />
                    </Box>

                    <IconButton
                      sx={{
                        width: 80,
                        height: 80,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                        animation: `${pulse} 2s ease-in-out infinite`,
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <PlayArrowIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                  </Box>
                  
                  <CardContent sx={{ pt: 3, pb: 0 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Modern Shopping Experience
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Built with cutting-edge technology for the smoothest shopping experience.
                    </Typography>
                  </CardContent>
                </Card>

                {/* Floating Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    opacity: 0.1,
                    animation: `${float} 4s ease-in-out infinite`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    opacity: 0.1,
                    animation: `${float} 5s ease-in-out infinite reverse`,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box ref={featuresRef} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            fontWeight={800} 
            gutterBottom
            sx={{
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose ShopCart?
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Experience the future of online shopping with our premium features
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 4,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  background: theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(17, 24, 39, 0.9)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `${slideInUp} 0.6s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: theme.palette.mode === 'light'
                      ? '0 25px 50px rgba(0, 0, 0, 0.2)'
                      : '0 25px 50px rgba(0, 0, 0, 0.8)',
                    '& .feature-icon': {
                      transform: 'scale(1.2) rotate(5deg)',
                      background: feature.gradient,
                    },
                    '&::before': {
                      opacity: 1,
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: feature.gradient,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                    background: alpha(feature.color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: feature.color,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box 
        ref={statsRef}
        sx={{
          py: { xs: 8, md: 12 },
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    animation: `${bounceIn} 0.8s ease-out ${index * 0.2}s both`,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      animation: `${pulse} 2s ease-in-out infinite`,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" fontWeight={800} gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced CTA Section */}
      <Box 
        ref={ctaRef}
        sx={{ 
          py: { xs: 10, md: 15 },
          background: theme.palette.mode === 'light'
            ? `
              radial-gradient(circle at 30% 30%, ${alpha('#667eea', 0.1)} 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, ${alpha('#f093fb', 0.1)} 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 30% 30%, ${alpha('#4facfe', 0.15)} 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, ${alpha('#f5576c', 0.15)} 0%, transparent 50%)
            `,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: { xs: 6, md: 8 },
              textAlign: 'center',
              background: theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(17, 24, 39, 0.9)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 6,
              boxShadow: theme.palette.mode === 'light'
                ? '0 25px 50px rgba(0, 0, 0, 0.15)'
                : '0 25px 50px rgba(0, 0, 0, 0.6)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)',
                backgroundSize: '300% 100%',
                animation: `${shimmer} 3s ease infinite`,
              }
            }}
          >
            <Typography 
              variant="h2" 
              fontWeight={800} 
              gutterBottom
              sx={{
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
              }}
            >
              Ready to Transform Your Shopping?
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ mb: 5, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Join millions of satisfied customers and discover why ShopCart is the future of online shopping.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
            >
              <Button 
                component={RouterLink} 
                to="/shop"
                variant="gradient"
                size="large"
                startIcon={<ShoppingBagIcon />}
                sx={{
                  py: 2.5,
                  px: 5,
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  borderRadius: 4,
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 25px 60px rgba(102, 126, 234, 0.6)',
                  }
                }}
              >
                Explore Our Catalog
              </Button>
              <Button 
                component={RouterLink} 
                to="/register"
                variant="outlined"
                size="large"
                sx={{
                  py: 2.5,
                  px: 5,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 4,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Create Free Account
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Landing;