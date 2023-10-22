const express = require('express')
const cors = require('cors');
const upload = require('./config/multer.config');
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



// Định nghĩa route để xử lý upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        // Trả về URL của tệp đã tải lên
        res.json({ imageUrl: req.file.path });
    } else {
        // Xử lý lỗi nếu không có tệp nào được tải lên
        next(new Error('File upload failed'));
    }
});


// Định nghĩa route để xử lý upload
app.post('/upload-multiple', upload.array('files', 3), (req, res) => {
    if (req.files) {
        console.log(req.files);
        // Trả về mảng các URL của các tệp đã tải lên
        const imageUrls = req.files.map(file => file.path);
        res.json({ imageUrls });
    } else {
        // Xử lý lỗi nếu không có tệp nào được tải lên
        next(new Error('File upload failed'));
    }
});



app.get('/', (req, res) => {
    res.json("ok")
})
// Xử lý lỗi tùy chỉnh
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
  });
app.listen(8000, () => {
    console.log("app listen on port 8000 , http://localhost:8000");
})