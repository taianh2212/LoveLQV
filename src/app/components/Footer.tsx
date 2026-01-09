import { Heart, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-white border-t-2 border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              <span className="text-xl font-bold text-pink-600">Love Lê Quang Vũ</span>
            </div>
            <p className="text-gray-600 text-sm">
              Nơi quản lý tình yêu của bạn một cách chuyên nghiệp và đầy lãng mạn. Hãy để chúng tôi giúp bạn ghi nhớ những khoảnh khắc đẹp nhất!
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
                >
                  <Icon className="w-5 h-5 text-pink-600" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-pink-600 mb-4">Liên kết</h4>
            <ul className="space-y-2">
              {['Về Love LQV', 'Tính năng', 'Hướng dẫn sử dụng', 'Liên hệ'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-600 hover:text-pink-500 text-sm transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-pink-600 mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {['Bảo mật thông tin', 'Hướng dẫn thêm kỷ niệm', 'Quản lý quà tặng', 'Câu hỏi thường gặp'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-600 hover:text-pink-500 text-sm transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-pink-600 mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📍 Khu đô thị FPT, Đà Nẵng</li>
              <li>👥 Team: Thiết Bị Gia FU</li>
              <li>✉️ thietbigia.fu@gmail.com</li>
              <li>🕐 Luôn sẵn sàng phục vụ bạn</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-pink-200 pt-8 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            © 2026 Love Lê Quang Vũ. Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </motion.span>
            by Thiết Bị Gia FU
          </p>
        </div>
      </div>
    </footer>
  );
}
