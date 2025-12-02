import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerConfig: MulterOptions = {
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 10, // Maximum number of files
        fieldSize: 10 * 1024 * 1024, // 10MB for field values
        fieldNameSize: 100, // Maximum field name size
        fields: 10, // Maximum number of non-file fields
    },
    fileFilter: (req, file, callback) => {
        // Allow only image files
        if (file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
            callback(null, true);
        } else {
            callback(new Error('Only image files are allowed!'), false);
        }
    },
};
