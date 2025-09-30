import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  keyframes,
  Badge,
  Stack,
} from '@mui/material';
import { 
  ShoppingCart, 
  Visibility, 
  FavoriteBorder, 
  Favorite,
  LocalOffer,
  TrendingUp,
  FlashOn,
  Star,
  Add,
  CompareArrows,
  Share,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useCart } from '../../hooks/useCart.jsx';

// Enhanced animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0) rotate(180deg); opacity: 0; }
  to { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2);
  }
  50% { 
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6), 0 0 30px rgba(102, 126, 234, 0.4);
  }
`;

const heartBeat = keyframes`
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(1.1); }
  75% { transform: scale(1.15); }
`;

function ProductCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  // Enhanced product analysis
  const isOnSale = product.rating?.rate >= 4.5;
  const isTrending = product.rating?.count > 200;
  const isNewArrival = Math.random() > 0.7; // Simulate new arrivals
  const discount = isOnSale ? Math.floor(Math.random() * 20 + 10) : 0;
  const originalPrice = isOnSale ? product.price * (1 + discount / 100) : product.price;
  const savings = originalPrice - product.price;

  return (
    <Card 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 5,
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: theme.palette.mode === 'light'
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(17, 24, 39, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: theme.palette.mode === 'light'
          ? '0 8px 32px rgba(0, 0, 0, 0.08)'
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          transform: 'translateY(-16px) scale(1.02)',
          boxShadow: theme.palette.mode === 'light'
            ? '0 25px 50px rgba(0, 0, 0, 0.2)'
            : '0 25px 50px rgba(0, 0, 0, 0.6)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          '& .product-image': {
            transform: 'scale(1.1) rotate(2deg)',
          },
          '& .quick-actions': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '& .product-overlay': {
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
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        }
      }}
    >
      {/* Enhanced Badges Container */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Stack spacing={1}>
          {isNewArrival && (
            <Chip
              icon={<FlashOn sx={{ fontSize: 16 }} />}
              label="New"
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: '0.7rem',
                height: 28,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                animation: `${scaleIn} 0.5s ease-out`,
                '& .MuiChip-icon': {
                  color: 'white',
                }
              }}
            />
          )}
          {isOnSale && (
            <Chip
              icon={<LocalOffer sx={{ fontSize: 16 }} />}
              label={`${discount}% OFF`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: '0.75rem',
                height: 28,
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(250, 112, 154, 0.4)',
                animation: `${pulse} 2s ease-in-out infinite`,
                '& .MuiChip-icon': {
                  color: 'white',
                }
              }}
            />
          )}
          {isTrending && (
            <Chip
              icon={<TrendingUp sx={{ fontSize: 16 }} />}
              label="Trending"
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 28,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                '& .MuiChip-icon': {
                  color: 'white',
                }
              }}
            />
          )}
        </Stack>

        {/* Enhanced Action Buttons */}
        <Stack spacing={1} className="quick-actions" sx={{
          opacity: 0,
          transform: 'translateY(-10px)',
          transition: 'all 0.3s ease',
        }}>
          <Tooltip title={isFavorite ? "Remove from wishlist" : "Add to wishlist"} arrow>
            <IconButton
              onClick={handleFavoriteToggle}
              size="small"
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                  animation: isFavorite ? `${heartBeat} 0.6s ease` : 'none',
                }
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ fontSize: 20, color: '#fa709a' }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
              )}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Compare" arrow>
            <IconButton
              size="small"
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CompareArrows sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share" arrow>
            <IconButton
              size="small"
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                }
              }}
            >
              <Share sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Enhanced Product Image */}
      <Box
        sx={{
          position: 'relative',
          height: 280,
          overflow: 'hidden',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'
            : 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        }}
      >
        {!imageLoaded && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, 
                ${alpha(theme.palette.primary.main, 0.1)} 0%, 
                ${alpha(theme.palette.primary.main, 0.2)} 50%, 
                ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
              backgroundSize: '1000px 100%',
              animation: `${shimmer} 2s infinite linear`,
            }}
          />
        )}
        
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          className="product-image"
          onLoad={() => setImageLoaded(true)}
          sx={{ 
            height: '100%',
            objectFit: 'contain',
            p: 3,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: imageLoaded ? 1 : 0,
          }}
        />

        {/* Enhanced Quick View Overlay */}
        <Box
          className="product-overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <Button
            component={Link}
            to={`/product/${product.id}`}
            variant="contained"
            startIcon={<Visibility />}
            sx={{
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.5)',
              animation: isHovered ? `${slideUp} 0.3s ease-out` : 'none',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
              }
            }}
          >
            Quick View
          </Button>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Enhanced Category Chip */}
        <Chip 
          label={product.category}
          size="small"
          sx={{ 
            mb: 2,
            textTransform: 'capitalize',
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 26,
            background: theme.palette.mode === 'light'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.2),
            color: theme.palette.primary.main,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              background: theme.palette.primary.main,
              color: 'white',
              transform: 'scale(1.05)',
            }
          }}
        />

        {/* Enhanced Product Title */}
        <Typography 
          gutterBottom 
          variant="h6" 
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.8em',
            mb: 2,
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: '"Inter", sans-serif',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
        >
          {product.title}
        </Typography>

        {/* Enhanced Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={product.rating.rate}
            precision={0.1}
            readOnly
            size="small"
            sx={{ 
              mr: 1,
              '& .MuiRating-iconFilled': {
                color: '#ffd700',
                filter: 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))',
              }
            }}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          >
            {product.rating.rate} ({product.rating.count})
          </Typography>
        </Box>

        {/* Enhanced Price Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          {isOnSale && (
            <Typography 
              variant="body2" 
              sx={{ 
                textDecoration: 'line-through',
                color: 'text.disabled',
                fontWeight: 600,
              }}
            >
              ${originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>

        {/* Savings Indicator */}
        {isOnSale && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'success.main',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            You save ${savings.toFixed(2)}!
          </Typography>
        )}
      </CardContent>

      {/* Enhanced Actions */}
      <CardActions 
        sx={{ 
          px: 3, 
          pb: 3, 
          pt: 0,
          gap: 1.5,
        }}
      >
        <Button
          fullWidth
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            py: 1.2,
            fontWeight: 700,
            fontSize: '0.875rem',
            borderRadius: 3,
            textTransform: 'none',
            fontFamily: '"Inter", sans-serif',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            color: theme.palette.text.primary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              background: alpha(theme.palette.primary.main, 0.1),
              transform: 'translateY(-2px)',
            }
          }}
        >
          View Details
        </Button>
        
        {user && (
          <Button
            fullWidth
            variant="contained"
            startIcon={isAddingToCart ? <Add className="animate-rotate" /> : <ShoppingCart />}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            sx={{
              py: 1.2,
              fontWeight: 700,
              fontSize: '0.875rem',
              borderRadius: 3,
              textTransform: 'none',
              fontFamily: '"Inter", sans-serif',
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
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transition: 'left 0.5s ease',
              },
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.palette.mode === 'light'
                  ? '0 12px 35px rgba(102, 126, 234, 0.6)'
                  : '0 12px 35px rgba(79, 172, 254, 0.6)',
                '&::before': {
                  left: '100%',
                }
              },
              '&:disabled': {
                background: theme.palette.action.disabled,
                color: theme.palette.action.disabled,
                animation: isAddingToCart ? `${glow} 1s ease-in-out infinite` : 'none',
              }
            }}
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;