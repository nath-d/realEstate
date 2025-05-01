#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Download hero images
curl -o public/hero1.jpg "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
curl -o public/hero2.jpg "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
curl -o public/hero3.jpg "https://images.unsplash.com/photo-1600607687644-aac13aab3e89?q=80&w=2053&auto=format&fit=crop"

echo "Hero images downloaded successfully!" 