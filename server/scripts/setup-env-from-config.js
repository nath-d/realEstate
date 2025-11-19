#!/usr/bin/env node

/**
 * Setup Environment Variables from Config
 * 
 * This script reads the config.js file and sets environment variables
 * so that Prisma and other tools can use the centralized configuration.
 */

const config = require('../config.js');

// Set DATABASE_URL from config
process.env.DATABASE_URL = config.database.url;

// Set other commonly needed environment variables
process.env.JWT_SECRET = config.jwt.secret;
process.env.GOOGLE_CLIENT_ID = config.google.clientId;
process.env.GOOGLE_CLIENT_SECRET = config.google.clientSecret;
process.env.CLOUDINARY_API_KEY = config.cloudinary.apiKey;
process.env.CLOUDINARY_API_SECRET = config.cloudinary.apiSecret;
process.env.CLOUDINARY_CLOUD_NAME = config.cloudinary.cloudName;

// If a command was passed, execute it
const command = process.argv.slice(2).join(' ');
if (command) {
    console.log('🔧 Setting up environment from config.js...');
    console.log('📊 DATABASE_URL set from config.database.url');
    console.log(`🚀 Executing: ${command}`);

    const { exec } = require('child_process');
    const child = exec(command, { stdio: 'inherit' });

    child.stdout?.on('data', (data) => {
        process.stdout.write(data);
    });

    child.stderr?.on('data', (data) => {
        process.stderr.write(data);
    });

    child.on('close', (code) => {
        process.exit(code);
    });
} else {
    console.log('✅ Environment variables set from config.js');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '***set***' : 'not set');
}
