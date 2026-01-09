import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Túi xách mini dễ thương phong cách Hàn Quốc',
    price: 299000,
    originalPrice: 499000,
    image: 'https://images.unsplash.com/photo-1599137936867-394dff2501a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY3V0ZSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2Nzg2NTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: 'Set quà tặng màu hồng cao cấp với hộp đựng xinh xắn',
    price: 450000,
    originalPrice: 650000,
    image: 'https://images.unsplash.com/photo-1601307666167-910027240bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwZ2lmdCUyMGJveHxlbnwxfHx8fDE3Njc4NTg0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    isNew: true
  },
  {
    id: 3,
    name: 'Phụ kiện thời trang màu hồng pastel',
    price: 199000,
    originalPrice: 350000,
    image: 'https://images.unsplash.com/photo-1647859157131-246f0ce05634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXdhaWklMjBwaW5rJTIwcHJvZHVjdHxlbnwxfHx8fDE3Njc4NjUwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Sản phẩm thời trang cao cấp màu hồng',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1600449635601-8de981d0a1e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwZmFzaGlvbiUyMGl0ZW1zfGVufDF8fHx8MTc2Nzg2NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Bộ mỹ phẩm dưỡng da màu hồng cute',
    price: 380000,
    originalPrice: 500000,
    image: 'https://images.unsplash.com/photo-1720609602393-207f35b618c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY29zbWV0aWNzJTIwcGlua3xlbnwxfHx8fDE3Njc4NjUwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    isNew: true
  },
  {
    id: 6,
    name: 'Phụ kiện trang trí phong cách kawaii',
    price: 250000,
    originalPrice: 400000,
    image: 'https://images.unsplash.com/photo-1599137936867-394dff2501a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY3V0ZSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2Nzg2NTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
  },
];

export function ProductGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl text-pink-600 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những sản phẩm được yêu thích nhất với thiết kế dễ thương và chất lượng tuyệt vời
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Xem tất cả sản phẩm
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
