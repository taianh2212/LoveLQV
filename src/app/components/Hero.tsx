import { Heart, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onRegisterClick?: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-white py-16 md:py-24">
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: [null, 600],
              x: [null, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: -50
            }}
          >
            <Heart className="w-8 h-8 text-pink-300 fill-pink-200" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-pink-500" />
              </motion.div>
              <span className="text-pink-500 uppercase tracking-wider">Bộ sưu tập mới</span>
            </div>

            <h1 className="text-4xl md:text-6xl text-pink-600">
              Quản lý người yêu
              <br />
              <span className="text-pink-400">của Lê Quang Vũ 💕</span>
            </h1>

            <p className="text-lg text-gray-700">
              Ghi nhớ mọi khoảnh khắc đặc biệt và quản lý thông tin những người bạn yêu thương!
            </p>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={onRegisterClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-4 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                Đăng ký làm người yêu
                <Heart className="w-5 h-5 fill-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.querySelector('.partner-grid-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-pink-400 text-pink-600 px-8 py-4 rounded-full hover:bg-pink-50 transition-colors"
              >
                Quản lý & Tìm kiếm người yêu
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: '100%', label: 'An toàn' },
                { value: '∞', label: 'Người yêu' },
                { value: '5.0', label: 'Đánh giá', icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-2xl text-pink-600">{stat.value}</span>
                    {stat.icon && <stat.icon className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://res.cloudinary.com/dx5szhyyt/image/upload/v1767931492/599727332_1552011092606472_7758796903200500009_n_vf1emi.jpg"
                alt="Love Manager Hero Image"
                className="w-full h-auto object-cover"
                style={{ 
                  imageRendering: 'crisp-edges',
                  filter: 'contrast(1.05) brightness(1.02)',
                }}
              />
              {/* Decorative stickers */}
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
              >
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
