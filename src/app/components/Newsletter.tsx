import { Heart, Sparkles, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-500 via-pink-400 to-pink-300 relative overflow-hidden">
      {/* Decorative floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute"
            style={{
              left: `${5 + i * 8}%`,
              top: `${20 + Math.sin(i * 2) * 30}%`,
            }}
          >
            <Heart className="w-6 h-6 text-white/30 fill-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white space-y-6"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <Sparkles className="w-12 h-12 mx-auto" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl">
            Nhận mẹo quản lý người yêu 💕
          </h2>
          <p className="text-pink-50 text-lg max-w-2xl mx-auto">
            Đăng ký để nhận những lời khuyên hữu ích về cách duy trì mối quan hệ và ghi nhớ những khoảnh khắc đặc biệt!
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-pink-500 px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              Đăng ký
              <Heart className="w-5 h-5 fill-pink-500" />
            </motion.button>
          </motion.div>

          <p className="text-pink-50 text-sm">
            Đừng lo, chúng tôi không spam. Chỉ gửi những mẹo hữu ích nhất! 💖
          </p>
        </motion.div>
      </div>
    </section>
  );
}
