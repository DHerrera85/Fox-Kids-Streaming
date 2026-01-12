#!/usr/bin/env python3
"""
Genera thumbnails y videos de preview para los promos nuevos de Cybersix
"""
import cv2
import subprocess
import os
from pathlib import Path

# Rutas
promo_dir = Path(r"C:\Users\herre\OneDrive\Documentos\Fox Kids Streaming\videos\shorts\promos\US")

videos_config = [
    {
        "name": "cybersix-Promo 02-Fox-Kids-US-1999.mp4",
        "thumbnail_name": "cybersix-Promo-02-Fox-Kids-US-1999.jpg",
        "preview_name": "cybersix-Promo-02-Fox-Kids-US-1999-preview.mp4",
        "title": "Cybersix • Promo 02"
    },
    {
        "name": "cybersix-Promo 03-Fox-Kids-US-1999.mp4",
        "thumbnail_name": "cybersix-Promo-03-Fox-Kids-US-1999.jpg",
        "preview_name": "cybersix-Promo-03-Fox-Kids-US-1999-preview.mp4",
        "title": "Cybersix • Promo 03"
    }
]

def generate_thumbnail(video_path, output_path, timestamp=2):
    """Extrae un frame del video y lo guarda como thumbnail"""
    try:
        cap = cv2.VideoCapture(str(video_path))
        
        if not cap.isOpened():
            print(f"✗ No se pudo abrir: {video_path.name}")
            return False
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_num = int(fps * timestamp) if fps > 0 else 0
        
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        ret, frame = cap.read()
        
        if ret:
            resized_frame = cv2.resize(frame, (320, 180))
            cv2.imwrite(str(output_path), resized_frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
            print(f"✓ Thumbnail generado: {output_path.name}")
            cap.release()
            return True
        else:
            print(f"✗ No se pudo leer el frame: {video_path.name}")
            cap.release()
            return False
    except Exception as e:
        print(f"✗ Error generando thumbnail: {e}")
        return False

def generate_preview(video_path, output_path, duration=10):
    """
    Genera un video de preview de los primeros N segundos.
    Usa ffmpeg para hacer el trimming.
    """
    try:
        cmd = [
            'ffmpeg',
            '-i', str(video_path),
            '-t', str(duration),
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-q:v', '5',
            '-y',
            str(output_path)
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0:
            print(f"✓ Preview generado: {output_path.name}")
            return True
        else:
            print(f"✗ Error ffmpeg: {result.stderr[:200]}")
            return False
    except subprocess.TimeoutExpired:
        print(f"✗ Timeout generando preview: {video_path.name}")
        return False
    except Exception as e:
        print(f"✗ Error generando preview: {e}")
        return False

# Procesar videos
print("=" * 60)
print("Procesando promos nuevos de Cybersix...")
print("=" * 60)

for config in videos_config:
    video_path = promo_dir / config["name"]
    thumbnail_path = promo_dir / config["thumbnail_name"]
    preview_path = promo_dir / config["preview_name"]
    
    if not video_path.exists():
        print(f"✗ Video no encontrado: {video_path}")
        continue
    
    print(f"\n📹 Procesando: {config['name']}")
    
    # Generar thumbnail
    print("  → Generando thumbnail...")
    generate_thumbnail(video_path, thumbnail_path, timestamp=2)
    
    # Generar preview (primeros 10 segundos)
    print("  → Generando preview (10s)...")
    generate_preview(video_path, preview_path, duration=10)

print("\n" + "=" * 60)
print("✓ Proceso completado")
print("=" * 60)
