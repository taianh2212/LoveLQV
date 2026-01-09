import { Heart, Search, Sparkles, LogIn, LogOut, User, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
  onDashboardClick: () => void;
  onLogoClick: () => void;
}

export function Header({ onLoginClick, onDashboardClick, onLogoClick }: HeaderProps) {
  const { isAuthenticated, admin, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-pink-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={onLogoClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
              <Sparkles className="w-5 h-5 text-pink-300 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl text-pink-600 font-bold">
              Love Lê Quang Vũ 💕
            </span>
          </motion.div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm người yêu..."
                className="w-full pl-12 pr-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-full focus:outline-none focus:border-pink-400 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDashboardClick}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden md:inline">Dashboard</span>
                </motion.button>
                <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full">
                  <User className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-semibold text-pink-600">{admin?.username}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline">Đăng xuất</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <LogIn className="w-5 h-5" />
                <span className="hidden md:inline">Đăng nhập Admin</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

