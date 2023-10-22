const multer = require('multer');
const cloudinary = require('./cloudinary.config')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cấu hình Multer
// Cấu hình Multer để lưu trữ ảnh lên Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'learn-multer-cloudinary', // Thay 'your_folder_name' bằng tên thư mục bạn muốn sử dụng
      format: (req, file) => {
        console.log(file.mimetype);
        // Hàm kiểm tra định dạng của file ảnh
        if (file.mimetype === 'image/jpeg') {
          return 'jpg';
        }
        if (file.mimetype === 'image/png') {
          return 'png';
        }
        if (file.mimetype === 'image/gif') {
          return 'gif';
        }
        // Thêm các định dạng ảnh khác nếu cần
        return 'jpg'; // Định dạng mặc định nếu không khớp với bất kỳ định dạng nào
      },
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước tệp ảnh (ở đây là 5MB)
    fileFilter: (req, file, cb) => {
      // Hàm kiểm tra tệp ảnh có hợp lệ hay không
      if (file.mimetype.startsWith('image/')) {
        // Kiểm tra định dạng ảnh
        cb(null, true);
      } else {
        // Không cho phép các tệp không phải là ảnh
        cb(new Error('File is not an image'), false);
      }
    },
  });
  

const upload = multer({ storage });

module.exports = upload
