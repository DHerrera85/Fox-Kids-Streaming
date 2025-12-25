import cv2
import os
from pathlib import Path

# Directorio base
base_dir = Path(__file__).parent / "videos" / "shorts"

# Carpetas a procesar
folders = {
    "openings": base_dir / "openings",
    "promos_us": base_dir / "promos" / "US",
    "promos_latam": base_dir / "promos" / "latam"
}

# Función para generar thumbnail
def generate_thumbnail(video_path, output_path, timestamp=2):
    """
    Extrae un frame del video en el segundo especificado y lo guarda como thumbnail.
    timestamp: segundo del video del cual extraer el frame (default: 2 segundos)
    """
    try:
        cap = cv2.VideoCapture(str(video_path))
        
        # Obtener FPS y calcular frame a extraer
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_num = int(fps * timestamp)
        
        # Ir al frame específico
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        ret, frame = cap.read()
        
        if ret:
            # Redimensionar a 320x180 (16:9)
            resized_frame = cv2.resize(frame, (320, 180))
            # Guardar como JPEG
            cv2.imwrite(str(output_path), resized_frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
            print(f"✓ Thumbnail generado: {output_path.name}")
            return True
        else:
            print(f"✗ No se pudo leer el frame: {video_path.name}")
            return False
    except Exception as e:
        print(f"✗ Error procesando {video_path.name}: {e}")
        return False
    finally:
        cap.release()

# Procesar cada carpeta
total = 0
generated = 0

for folder_name, folder_path in folders.items():
    if folder_path.exists():
        print(f"\n📁 Procesando: {folder_name}")
        video_files = list(folder_path.glob("*.mp4"))
        
        for video_file in video_files:
            thumbnail_path = video_file.parent / f"{video_file.stem}.jpg"
            total += 1
            if generate_thumbnail(video_file, thumbnail_path):
                generated += 1
    else:
        print(f"⚠ Carpeta no encontrada: {folder_path}")

print(f"\n{'='*50}")
print(f"Resumen: {generated}/{total} thumbnails generados exitosamente")
print(f"{'='*50}")
