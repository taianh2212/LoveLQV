import { X, Calendar, Gift as GiftIcon, Heart, Phone, MapPin, Star, Camera, Plus, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Partner, Memory, Gift } from '../types/Partner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { uploadAPI } from '../services/uploadAPI';

interface PartnerDetailModalProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
  onAddMemory?: (memory: Memory) => Promise<void>;
  onAddGift?: (gift: Gift) => Promise<void>;
  onUpdateRating?: (rating: number) => Promise<void>;
  isAdmin?: boolean;
}

export function PartnerDetailModal({ partner, isOpen, onClose, onAddMemory, onAddGift, onUpdateRating, isAdmin }: PartnerDetailModalProps) {
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showAddGift, setShowAddGift] = useState(false);
  const [memoryForm, setMemoryForm] = useState({ title: '', date: '', description: '', imageUrl: '' });
  const [giftForm, setGiftForm] = useState({ name: '', date: '', price: '', occasion: '' });
  const [uploadingMemory, setUploadingMemory] = useState(false);
  
  if (!partner) return null;

  
  const handleMemoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh không được vượt quá 5MB!');
      return;
    }

    try {
      setUploadingMemory(true);
      const imageUrl = await uploadAPI.upload(file);
      setMemoryForm(prev => ({ ...prev, imageUrl }));
    } catch (error) {
      alert('Upload ảnh thất bại!');
    } finally {
      setUploadingMemory(false);
    }
  };

  const handleAddMemory = async () => {
    console.log('handleAddMemory called', { memoryForm, onAddMemory });
    if (!memoryForm.title || !memoryForm.date) {
      alert('Vui lòng điền tiêu đề và ngày!');
      return;
    }
    if (onAddMemory) {
      try {
        console.log('Calling onAddMemory with:', memoryForm);
        await onAddMemory({
          ...memoryForm,
          imageUrl: memoryForm.imageUrl || 'https://ui-avatars.com/api/?name=Memory&size=400&background=ec4899&color=fff'
        });
        console.log('Memory added successfully!');
        setMemoryForm({ title: '', date: '', description: '', imageUrl: '' });
        setShowAddMemory(false);
      } catch (error) {
        console.error('Error adding memory:', error);
        alert('Lỗi khi thêm kỷ niệm!');
      }
    } else {
      console.error('onAddMemory is not defined!');
    }
  };

  const handleAddGift = async () => {
    console.log('handleAddGift called', { giftForm, onAddGift });
    if (!giftForm.name || !giftForm.date) {
      alert('Vui lòng điền tên quà và ngày tặng!');
      return;
    }
    if (onAddGift) {
      try {
        console.log('Calling onAddGift with:', giftForm);
        await onAddGift(giftForm);
        console.log('Gift added successfully!');
        setGiftForm({ name: '', date: '', price: '', occasion: '' });
        setShowAddGift(false);
      } catch (error) {
        console.error('Error adding gift:', error);
        alert('Lỗi khi thêm quà!');
      }
    } else {
      console.error('onAddGift is not defined!');
    }
  };

  const handleRatingClick = async (rating: number) => {
    if (isAdmin && onUpdateRating) {
      try {
        await onUpdateRating(rating);
      } catch (error) {
        console.error('Error updating rating:', error);
        alert('Lỗi khi cập nhật đánh giá!');
      }
    }
  };

  const getTimeTogether = () => {
    const start = new Date(partner.anniversaryDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    let result = [];
    if (years > 0) result.push(`${years} năm`);
    if (months > 0) result.push(`${months} tháng`);
    if (days > 0) result.push(`${days} ngày`);
    
    return result.join(' ') || '0 ngày';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header with cover image */}
            <div className="relative h-48 bg-gradient-to-br from-pink-400 via-pink-300 to-purple-300">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              
              {/* Floating hearts */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [-20, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: 20,
                  }}
                >
                  <Heart className="w-6 h-6 text-white/60 fill-white/40" />
                </motion.div>
              ))}
            </div>

            {/* Profile section */}
            <div className="relative px-8 pb-8">
              {/* Avatar */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-2xl"
                  />
                  {partner.isFavorite && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded-full">
                      <Star className="w-6 h-6 fill-white" />
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="pt-24 space-y-6">
                {/* Name and rating */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {partner.name}
                  </h2>
                  {partner.nickname && (
                    <p className="text-lg text-pink-500 mb-3">"{partner.nickname}"</p>
                  )}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        onClick={() => handleRatingClick(i + 1)}
                        className={`w-6 h-6 ${
                          i < partner.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        } ${isAdmin ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4 text-center">
                    <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Thời gian bên nhau</p>
                    <p className="text-lg font-bold text-pink-600">{getTimeTogether()}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
                    <GiftIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Quà tặng</p>
                    <p className="text-lg font-bold text-purple-600">{partner.gifts.length}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center">
                    <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Kỷ niệm</p>
                    <p className="text-lg font-bold text-blue-600">{partner.memories.length}</p>
                  </div>
                </div>

                {/* Contact info */}
                {(partner.phoneNumber || partner.address) && (
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Thông tin liên hệ</h3>
                    {partner.phoneNumber && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-pink-500" />
                        <span className="text-gray-700">{partner.phoneNumber}</span>
                      </div>
                    )}
                    {partner.address && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-pink-500" />
                        <span className="text-gray-700">{partner.address}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Dates */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Ngày quan trọng</h3>
                  <div className="space-y-3">
                    {partner.dateOfBirth && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🎂 Ngày sinh</span>
                        <span className="font-semibold text-gray-800">
                          {new Date(partner.dateOfBirth).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">💕 Ngày kỷ niệm</span>
                      <span className="font-semibold text-pink-600">
                        {new Date(partner.anniversaryDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hobbies */}
                {partner.hobbies.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Sở thích</h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.hobbies.map((hobby, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Favorite things */}
                {partner.favoriteThings.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">❤️ Yêu thích</h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.favoriteThings.map((item, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {partner.notes && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">📝 Ghi chú</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {partner.notes}
                    </p>
                  </div>
                )}

                {/* Memories Section */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">📸 Kỷ niệm</h3>
                    {isAdmin && (
                      <button
                        onClick={() => setShowAddMemory(!showAddMemory)}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Thêm ảnh
                      </button>
                    )}
                  </div>

                  {showAddMemory && (
                    <div className="mb-4 p-4 bg-white rounded-lg space-y-3">
                      <input
                        type="text"
                        placeholder="Tiêu đề kỷ niệm"
                        value={memoryForm.title}
                        onChange={(e) => setMemoryForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <input
                        type="date"
                        value={memoryForm.date}
                        onChange={(e) => setMemoryForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <textarea
                        placeholder="Mô tả..."
                        value={memoryForm.description}
                        onChange={(e) => setMemoryForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={3}
                      />
                      <div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer w-fit">
                          {uploadingMemory ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          Upload ảnh
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMemoryImageUpload}
                            className="hidden"
                            disabled={uploadingMemory}
                          />
                        </label>
                        {memoryForm.imageUrl && (
                          <img src={memoryForm.imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddMemory}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setShowAddMemory(false)}
                          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  {partner.memories.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {partner.memories.map((memory, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow">
                          {memory.imageUrl && (
                            <img
                              src={memory.imageUrl}
                              alt={memory.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-4">
                            <h4 className="font-bold text-gray-800">{memory.title}</h4>
                            <p className="text-sm text-gray-500">{new Date(memory.date).toLocaleDateString('vi-VN')}</p>
                            {memory.description && (
                              <p className="text-sm text-gray-600 mt-2">{memory.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Chưa có kỷ niệm nào</p>
                  )}
                </div>

                {/* Gifts Section */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">🎁 Quà tặng</h3>
                    {isAdmin && (
                      <button
                        onClick={() => setShowAddGift(!showAddGift)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Thêm quà
                      </button>
                    )}
                  </div>

                  {showAddGift && (
                    <div className="mb-4 p-4 bg-white rounded-lg space-y-3">
                      <input
                        type="text"
                        placeholder="Tên quà tặng"
                        value={giftForm.name}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="date"
                        value={giftForm.date}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Giá trị (không bắt buộc)"
                        value={giftForm.price}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        placeholder="Dịp tặng (sinh nhật, kỷ niệm...)"
                        value={giftForm.occasion}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, occasion: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddGift}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setShowAddGift(false)}
                          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  {partner.gifts.length > 0 ? (
                    <div className="space-y-3">
                      {partner.gifts.map((gift, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 flex items-start gap-4">
                          <GiftIcon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{gift.name}</h4>
                            <p className="text-sm text-gray-500">{new Date(gift.date).toLocaleDateString('vi-VN')}</p>
                            {gift.occasion && <p className="text-sm text-purple-600 mt-1">{gift.occasion}</p>}
                            {gift.price && <p className="text-sm text-gray-600 mt-1">Giá trị: {gift.price}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Chưa có quà tặng nào</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
