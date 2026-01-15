const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

async function updateAdmin() {
  try {
    // Delete all existing admins
    await Admin.deleteMany({});
    console.log('Đã xóa tất cả admin cũ');
    
    // Create new admin with new credentials
    const newAdmin = new Admin({
      username: 'taianh2212',
      password: 'tai22122004',
      role: 'admin'
    });
    
    await newAdmin.save();
    console.log('✅ Đã tạo admin mới thành công!');
    console.log('Username:', newAdmin.username);
    console.log('Password: tai22122004');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    mongoose.connection.close();
  }
}

updateAdmin();
