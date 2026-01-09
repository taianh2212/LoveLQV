import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
}

export function ProductCard({ name, price, originalPrice, image, rating, isNew }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group relative"
    >
      {/* Badge */}
      {(isNew || discount > 0) && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm"
            >
              Mới
            </motion.span>
          )}
          {discount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
            >
              -{discount}%
            </motion.span>
          )}
        </div>
      )}

      {/* Like button */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
      >
        <Heart
          className={`w-6 h-6 transition-colors ${
            isLiked ? 'text-pink-500 fill-pink-500' : 'text-gray-400'
          }`}
        />
      </motion.button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-pink-50">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Floating hearts on hover */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -60],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
                className="absolute"
                style={{
                  left: `${30 + i * 20}%`,
                  bottom: '20%',
                }}
              >
                <Heart className="w-4 h-4 text-pink-400 fill-pink-300" />
              </motion.div>
            ))}
          </>
        )}

        {/* Add to cart overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-end justify-center pb-6"
        >
          <motion.button
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Thêm vào giỏ
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-gray-800 line-clamp-2 min-h-[3rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-pink-600">{price.toLocaleString('vi-VN')}đ</span>
          {originalPrice && (
            <span className="text-gray-400 line-through">
              {originalPrice.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
