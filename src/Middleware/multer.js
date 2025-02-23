import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Accept all common image MIME types
    const allowedMimes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/bmp',
        'image/tiff'
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${file.mimetype} is not allowed. Allowed types: ${allowedMimes.join(', ')}`), false);
    }
};

export const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});