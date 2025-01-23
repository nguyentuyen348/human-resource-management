const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_KEY; // Khóa bí mật (hoặc lấy từ biến môi trường)

// Middleware xác thực

module.exports = {
    auth : (req, res, next) => {
        // Lấy header Authorization
        const authHeader = req.headers.authorization;

        // Kiểm tra xem header Authorization có tồn tại và đúng định dạng không
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Token not provided or invalid format" });
        }

        // Lấy token từ header
        const token = authHeader.split(" ")[1]; // Tách "Bearer token_value"

        try {
            // Xác minh token
            const decoded = jwt.verify(token, SECRET_KEY); // Giải mã token
            req.user = decoded; // Lưu thông tin người dùng vào req để sử dụng sau
            next(); // Tiếp tục xử lý các middleware hoặc route handler
        } catch (err) {
            // Xử lý nếu token không hợp lệ hoặc hết hạn
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
        }
    }
}
