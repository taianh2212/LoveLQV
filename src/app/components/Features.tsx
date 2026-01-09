import { Heart, Lock, Bell, Gift } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Heart,
    title: 'Quản lý dễ dàng',
    description: 'Giao diện thân thiện, dễ sử dụng để quản lý thông tin người yêu',
  },
  {
    icon: Lock,
    title: 'Bảo mật tuyệt đối',
    description: 'Thông tin của bạn được lưu trữ an toàn và riêng tư 100%',
  },
  {
    icon: Gift,
    title: 'Theo dõi quà tặng',
    description: 'Ghi nhớ mọi món quà và kỷ niệm đặc biệt cùng người thương',
  },
  {
    icon: Bell,
    title: 'Nhắc nhở thông minh',
    description: 'Không bao giờ quên những ngày quan trọng và kỷ niệm',
  },
];

export function Features() {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-300 rounded-full mb-4"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-pink-600 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
