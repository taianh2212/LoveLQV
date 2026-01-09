import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Loader2, Users, ArrowLeft } from 'lucide-react';
import { partnerAPI } from '../services/partnerAPI';
import type { Partner } from '../types/Partner';

interface AdminDashboardProps {
  onBackToHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const [pendingPartners, setPendingPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    try {
      setLoading(true);
      const data = await partnerAPI.getPending();
      setPendingPartners(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách chờ duyệt:', error);
      alert('Không thể tải danh sách chờ duyệt');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setProcessing(id);
      await partnerAPI.approve(id);
      setPendingPartners(prev => prev.filter(p => p._id !== id));
      alert('Đã duyệt thành công!');
    } catch (error) {
      console.error('Lỗi khi duyệt:', error);
      alert('Không thể duyệt đơn này');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessing(id);
      await partnerAPI.reject(id);
      setPendingPartners(prev => prev.filter(p => p._id !== id));
      alert('Đã từ chối đơn này');
    } catch (error) {
      console.error('Lỗi khi từ chối:', error);
      alert('Không thể từ chối đơn này');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (pendingPartners.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Không có đơn nào cần duyệt
        </h3>
        <p className="text-gray-500">
          Tất cả đơn đăng ký đã được xử lý
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Trở về trang chính
        </button>
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Danh sách chờ duyệt ({pendingPartners.length})
        </h2>
      </div>
      
      <div className="space-y-4">
        {pendingPartners.map((partner, index) => (
          <motion.div
            key={partner._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={partner.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(partner.name) + '&size=200&background=ec4899&color=fff&bold=true'}
                  alt={partner.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {partner.name}
                </h3>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-semibold">Tuổi:</span> {partner.age}</p>
                  <p><span className="font-semibold">Nghề nghiệp:</span> {partner.occupation}</p>
                  <p><span className="font-semibold">Sở thích:</span> {partner.hobbies.join(', ')}</p>
                  <p><span className="font-semibold">Mô tả:</span> {partner.description}</p>
                </div>

                {partner.specialTraits && partner.specialTraits.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Đặc điểm:</p>
                    <div className="flex flex-wrap gap-2">
                      {partner.specialTraits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleApprove(partner._id!)}
                  disabled={processing === partner._id}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing === partner._id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  Duyệt
                </button>

                <button
                  onClick={() => handleReject(partner._id!)}
                  disabled={processing === partner._id}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing === partner._id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  Từ chối
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
