import { Heart, Pencil, Trash2, Star, Calendar, Gift as GiftIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Partner } from '../types/Partner';

interface PartnerCardProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
  onClick: (partner: Partner) => void;
  isAdmin?: boolean;
}

export function PartnerCard({ partner, onEdit, onDelete, onClick, isAdmin = false }: PartnerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDaysUntilAnniversary = () => {
    const today = new Date();
    const anniversary = new Date(partner.anniversaryDate);
    const thisYearAnniversary = new Date(
      today.getFullYear(),
      anniversary.getMonth(),
      anniversary.getDate()
    );
    
    if (thisYearAnniversary < today) {
      thisYearAnniversary.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = thisYearAnniversary.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilAnniversary = getDaysUntilAnniversary();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group relative cursor-pointer"
      onClick={() => onClick(partner)}
    >
      {/* Action buttons */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(partner);
            }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
          >
            <Pencil className="w-5 h-5 text-blue-500" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Bạn có chắc muốn xóa ${partner.name}?`)) {
                onDelete(partner._id || partner.id || '');
              }
            }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </motion.button>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-pink-50">
        <ImageWithFallback
          src={partner.avatar}
          alt={partner.name}
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
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{partner.name}</h3>
          {partner.nickname && (
            <p className="text-sm text-pink-500">"{partner.nickname}"</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < partner.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({partner.rating}/5)</span>
        </div>

        {/* Anniversary countdown */}
        <div className="bg-pink-50 rounded-lg p-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-500" />
          <div className="flex-1">
            <p className="text-xs text-gray-600">Kỷ niệm</p>
            <p className="text-sm font-semibold text-pink-600">
              {daysUntilAnniversary === 0
                ? 'Hôm nay! 🎉'
                : `Còn ${daysUntilAnniversary} ngày`}
            </p>
          </div>
        </div>

        {/* Gifts count */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <GiftIcon className="w-4 h-4 text-pink-400" />
          <span>{partner.gifts.length} quà tặng</span>
        </div>

        {/* Hobbies */}
        {partner.hobbies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {partner.hobbies.slice(0, 3).map((hobby, index) => (
              <span
                key={index}
                className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))}
            {partner.hobbies.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{partner.hobbies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
