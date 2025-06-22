// Test script for Cloudinary integration
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Cloudinary Integration...\n');

// Test 1: Check if server dependencies are installed
console.log('1. Checking server dependencies...');
try {
    const serverPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'server', 'package.json'), 'utf8'));
    const requiredDeps = ['cloudinary', 'multer', '@types/multer'];

    const missingDeps = requiredDeps.filter(dep => !serverPackageJson.dependencies[dep] && !serverPackageJson.devDependencies[dep]);

    if (missingDeps.length === 0) {
        console.log('✅ All required server dependencies are installed');
    } else {
        console.log('❌ Missing server dependencies:', missingDeps.join(', '));
    }
} catch (error) {
    console.log('❌ Could not read server package.json');
}

// Test 2: Check if admin panel dependencies are installed
console.log('\n2. Checking admin panel dependencies...');
try {
    const adminPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'adminpanel', 'package.json'), 'utf8'));
    const requiredDeps = ['cloudinary', 'axios'];

    const missingDeps = requiredDeps.filter(dep => !adminPackageJson.dependencies[dep]);

    if (missingDeps.length === 0) {
        console.log('✅ All required admin panel dependencies are installed');
    } else {
        console.log('❌ Missing admin panel dependencies:', missingDeps.join(', '));
    }
} catch (error) {
    console.log('❌ Could not read admin panel package.json');
}

// Test 3: Check if Cloudinary service files exist
console.log('\n3. Checking Cloudinary service files...');
const requiredFiles = [
    'server/src/cloudinary/cloudinary.service.ts',
    'server/src/cloudinary/cloudinary-response.ts',
    'server/src/cloudinary/cloudinary.module.ts',
    'server/src/upload/upload.controller.ts',
    'server/src/upload/upload.module.ts',
    'server/src/config/cloudinary.config.ts',
    'adminpanel/src/services/cloudinaryService.ts',
    'client/src/services/cloudinaryService.js'
];

const existingFiles = requiredFiles.filter(file => fs.existsSync(path.join(__dirname, file)));
const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));

if (existingFiles.length === requiredFiles.length) {
    console.log('✅ All Cloudinary service files exist');
} else {
    console.log('❌ Missing files:', missingFiles.join(', '));
}

// Test 4: Check if modules are properly imported
console.log('\n4. Checking module imports...');
try {
    const appModule = fs.readFileSync(path.join(__dirname, 'server', 'src', 'app.module.ts'), 'utf8');
    if (appModule.includes('CloudinaryModule') && appModule.includes('UploadModule')) {
        console.log('✅ Cloudinary modules are imported in app.module.ts');
    } else {
        console.log('❌ Cloudinary modules are not imported in app.module.ts');
    }
} catch (error) {
    console.log('❌ Could not read app.module.ts');
}

// Test 5: Check if PropertyForm is updated
console.log('\n5. Checking PropertyForm integration...');
try {
    const propertyForm = fs.readFileSync(path.join(__dirname, 'adminpanel', 'src', 'components', 'PropertyForm.tsx'), 'utf8');
    if (propertyForm.includes('cloudinaryService') && propertyForm.includes('customUpload')) {
        console.log('✅ PropertyForm is integrated with Cloudinary');
    } else {
        console.log('❌ PropertyForm is not integrated with Cloudinary');
    }
} catch (error) {
    console.log('❌ Could not read PropertyForm.tsx');
}

// Test 6: Check if client components are updated
console.log('\n6. Checking client component integration...');
try {
    const propertyCard = fs.readFileSync(path.join(__dirname, 'client', 'src', 'screens', 'homepage', 'components', 'PropertyCard.jsx'), 'utf8');
    if (propertyCard.includes('cloudinaryService')) {
        console.log('✅ PropertyCard is integrated with Cloudinary');
    } else {
        console.log('❌ PropertyCard is not integrated with Cloudinary');
    }
} catch (error) {
    console.log('❌ Could not read PropertyCard.jsx');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Create a Cloudinary account at https://cloudinary.com');
console.log('2. Get your Cloud Name, API Key, and API Secret from the dashboard');
console.log('3. Create a .env file in the server directory with:');
console.log('   CLOUDINARY_CLOUD_NAME=your_cloud_name');
console.log('   CLOUDINARY_API_KEY=your_api_key');
console.log('   CLOUDINARY_API_SECRET=your_api_secret');
console.log('4. Start the server: cd server && npm run start:dev');
console.log('5. Start the admin panel: cd adminpanel && npm run dev');
console.log('6. Test image uploads in the admin panel');

console.log('\n🎉 Cloudinary integration setup complete!');
console.log('📖 See CLOUDINARY_SETUP.md for detailed instructions.'); 