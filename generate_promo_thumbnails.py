#!/usr/bin/env python3
"""Generate placeholder thumbnails for promo videos"""

from PIL import Image, ImageDraw, ImageFont
import os

# Define paths
promo_path = r"C:\Users\herre\OneDrive\Documentos\Fox Kids Streaming\videos\shorts\promos\US"

# Videos to generate thumbnails for with titles
thumbnails = [
    ("the-magician-promo-US-1999.jpg", "The Magician", "#1a1a1a", "#FFD200"),
    ("angela-anaconda-promo-US-2000.jpg", "Angela Anaconda", "#2a2a4a", "#FF6B35")
]

# Create thumbnails
for thumb_name, title, bg_color, text_color in thumbnails:
    thumb_full_path = os.path.join(promo_path, thumb_name)
    
    # Create image (280x420 pixels)
    img = Image.new('RGB', (280, 420), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Add centered title text
    # Using default font
    try:
        # Try to use a larger font if available
        font = ImageFont.truetype("arial.ttf", 28)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Calculate text position for centering
    text = title
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (280 - text_width) // 2
    y = (420 - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Save
    img.save(thumb_full_path)
    print(f"✓ Generated: {thumb_name}")

print("Done!")


