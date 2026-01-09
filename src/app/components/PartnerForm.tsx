import { useState } from 'react';
import { X, Upload, Plus, Trash2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Partner } from '../types/Partner';
import { uploadAPI } from '../services/uploadAPI';

interface PartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: Omit<Partner, 'id' | 'createdAt'>) => void;
  editingPartner?: Partner;
}

export function PartnerForm({ isOpen, onClose, onSave, editingPartner }: PartnerFormProps) {
  const [formData, setFormData] = useState<Omit<Partner, 'id' | 'createdAt'>>({
    name: editingPartner?.name || '',
    nickname: editingPartner?.nickname || '',
    avatar: editingPartner?.avatar || 'https://ui-avatars.com/api/?name=User&size=400&background=ec4899&color=fff&bold=true',
    dateOfBirth: editingPartner?.dateOfBirth || '',
    anniversaryDate: editingPartner?.anniversaryDate || '',
    hobbies: editingPartner?.hobbies || [],
    favoriteThings: editingPartner?.favoriteThings || [],
    notes: editingPartner?.notes || '',
    phoneNumber: editingPartner?.phoneNumber || '',
    address: editingPartner?.address || '',
    rating: editingPartner?.rating || 5,
    isFavorite: editingPartner?.isFavorite || false,
    gifts: editingPartner?.gifts || [],
    memories: editingPartner?.memories || [],
  });

  const [newHobby, setNewHobby] = useState('');
  const [newFavorite, setNewFavorite] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh không được vượt quá 5MB!');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh!');
      return;
    }

    try {
      setUploadingImage(true);
      const imageUrl = await uploadAPI.upload(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload ảnh thất bại! Vui lòng thử lại.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.anniversaryDate) {
      alert('Vui lòng điền tên và ngày kỷ niệm!');
      return;
    }
    onSave(formData);
    onClose();
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const removeHobby = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }));
  };

  const addFavorite = () => {
    if (newFavorite.trim()) {
      setFormData(prev => ({
        ...prev,
        favoriteThings: [...prev.favoriteThings, newFavorite.trim()]
      }));
      setNewFavorite('');
    }
  };

  const removeFavorite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      favoriteThings: prev.favoriteThings.filter((_, i) => i !== index)
    }));
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-pink-400 text-white p-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingPartner ? '✏️ Chỉnh Sửa Thông Tin' : '💕 Thêm Người Yêu Mới'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Avatar */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-200"
                  />
                  <label
                    htmlFor="partner-avatar-upload"
                    className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors cursor-pointer"
                  >
                    {uploadingImage ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </label>
                  <input
                    id="partner-avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Click vào icon để tải ảnh lên (max 5MB)
                </p>
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Tên người yêu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Biệt danh
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Tên thân mật"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày kỷ niệm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.anniversaryDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, anniversaryDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Địa chỉ"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đánh giá
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating }))}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= formData.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-gray-600 ml-2">{formData.rating}/5</span>
                </div>
              </div>

              {/* Hobbies */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sở thích
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Thêm sở thích..."
                  />
                  <button
                    type="button"
                    onClick={addHobby}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={() => removeHobby(index)}
                        className="hover:text-pink-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Favorite Things */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Những thứ yêu thích
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFavorite}
                    onChange={(e) => setNewFavorite(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFavorite())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Thêm thứ yêu thích..."
                  />
                  <button
                    type="button"
                    onClick={addFavorite}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.favoriteThings.map((item, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFavorite(index)}
                        className="hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Những ghi chú đặc biệt..."
                />
              </div>

              {/* Submit buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  {editingPartner ? '💾 Lưu Thay Đổi' : '💕 Thêm Người Yêu'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
