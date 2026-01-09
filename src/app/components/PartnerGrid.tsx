import { motion } from 'motion/react';
import { PartnerCard } from './PartnerCard';
import { Partner } from '../types/Partner';
import { Plus, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PartnerGridProps {
  partners: Partner[];
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onRegister: () => void;
  onViewDetails: (partner: Partner) => void;
}

export function PartnerGrid({ 
  partners, 
  onEdit, 
  onDelete, 
  onAddNew,
  onRegister,
  onViewDetails 
}: PartnerGridProps) {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 bg-white partner-grid-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
            💕 Danh Sách Người Yêu 💕
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isAuthenticated 
              ? 'Quản lý và ghi nhớ những người đặc biệt trong cuộc đời bạn'
              : 'Đăng ký làm người yêu và chờ Lê Quang Vũ duyệt nhé! 💖'
            }
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 text-center flex gap-4 justify-center flex-wrap"
        >
          {isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddNew}
              className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm Người Yêu Mới
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegister}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Đăng Ký Làm Người Yêu
            </motion.button>
          )}
        </motion.div>

        {partners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl text-gray-400 mb-2">Chưa có người yêu nào</h3>
            <p className="text-gray-500">Hãy thêm người yêu đầu tiên của bạn!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner._id || partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PartnerCard
                  partner={partner}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onClick={onViewDetails}
                  isAdmin={isAuthenticated}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
