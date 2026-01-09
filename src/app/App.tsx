import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { PartnerGrid } from './components/PartnerGrid';
import { PartnerForm } from './components/PartnerForm';
import { PartnerDetailModal } from './components/PartnerDetailModal';
import { LoginModal } from './components/LoginModal';
import { RegistrationForm } from './components/RegistrationForm';
import { AdminDashboard } from './components/AdminDashboard';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { usePartners } from './hooks/usePartners';
import { useAuth } from './context/AuthContext';
import { Partner } from './types/Partner';
import { partnerAPI } from './services/partnerAPI';

export default function App() {
  const { partners, addPartner, updatePartner, deletePartner, addMemory, addGift, updateRating, reload } = usePartners();
  const { isAuthenticated } = useAuth();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | undefined>();
  const [viewingPartner, setViewingPartner] = useState<Partner | null>(null);

  const handleAddNew = () => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để thêm người yêu!');
      setIsLoginOpen(true);
      return;
    }
    setEditingPartner(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để chỉnh sửa!');
      setIsLoginOpen(true);
      return;
    }
    setEditingPartner(partner);
    setIsFormOpen(true);
  };

  const handleSave = async (partnerData: Omit<Partner, 'id' | 'createdAt'>) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập!');
      return;
    }
    
    if (editingPartner) {
      await updatePartner(editingPartner._id || editingPartner.id || '', partnerData);
    } else {
      await addPartner(partnerData);
    }
    setIsFormOpen(false);
    setEditingPartner(undefined);
  };

  const handleRegister = async (partnerData: Omit<Partner, 'id' | 'createdAt' | '_id' | 'status'>) => {
    try {
      await partnerAPI.register(partnerData);
      // Success handled in RegistrationForm
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập!');
      return;
    }
    await deletePartner(id);
  };

  const handleViewDetails = (partner: Partner) => {
    setViewingPartner(partner);
  };

  return (
    <div className="min-h-screen">
      <Header 
        onLoginClick={() => setIsLoginOpen(true)}
        onDashboardClick={() => setIsDashboardOpen(true)}
        onLogoClick={() => setIsDashboardOpen(false)}
      />
      <main>
        {isDashboardOpen && isAuthenticated ? (
          <AdminDashboard onBackToHome={() => setIsDashboardOpen(false)} />
        ) : (
          <>
            <Hero onRegisterClick={() => setIsRegisterOpen(true)} />
            <Features />
            <PartnerGrid
              partners={partners}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddNew={handleAddNew}
              onRegister={() => setIsRegisterOpen(true)}
              onViewDetails={handleViewDetails}
            />
            <Newsletter />
          </>
        )}
      </main>
      <Footer />
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {isAuthenticated && (
        <PartnerForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingPartner(undefined);
          }}
          onSave={handleSave}
          editingPartner={editingPartner}
        />
      )}

      <RegistrationForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={handleRegister}
      />

      <PartnerDetailModal
        partner={viewingPartner}
        isOpen={viewingPartner !== null}
        onClose={() => setViewingPartner(null)}
        isAdmin={isAuthenticated}
        onAddMemory={async (memory) => {
          if (viewingPartner) {
            const updated = await addMemory(viewingPartner._id || viewingPartner.id || '', memory);
            setViewingPartner(updated);
          }
        }}
        onAddGift={async (gift) => {
          if (viewingPartner) {
            const updated = await addGift(viewingPartner._id || viewingPartner.id || '', gift);
            setViewingPartner(updated);
          }
        }}
        onUpdateRating={async (rating) => {
          if (viewingPartner) {
            const updated = await updateRating(viewingPartner._id || viewingPartner.id || '', rating);
            setViewingPartner(updated);
          }
        }}
      />
    </div>
  );
}
