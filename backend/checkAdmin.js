const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

async function checkAdmin() {
  try {
    const admins = await Admin.find({});
    console.log('\n📋 Danh sách admin trong database:');
    console.log('=====================================');
    
    if (admins.length === 0) {
      console.log('❌ Không có admin nào trong database!');
    } else {
      admins.forEach((admin, index) => {
        console.log(`\nAdmin #${index + 1}:`);
        console.log(`  ID: ${admin._id}`);
        console.log(`  Username: ${admin.username}`);
        console.log(`  Password: ${admin.password}`);
        console.log(`  Role: ${admin.role}`);
      });
    }
    
    console.log('\n=====================================\n');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    mongoose.connection.close();
  }
}

checkAdmin();
