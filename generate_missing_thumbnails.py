import cv2
import os

# Videos específicos que necesitan thumbnails
videos = [
    'videos/shorts/promos/US/the-magician-promo-US-1999.mp4',
    'videos/shorts/promos/US/angela-anaconda-promo-US-2000.mp4',
    'videos/shorts/openings/x-men-opening-US-1992.mp4',
    'videos/shorts/openings/x-men-opening-japan-1994.mp4',
    'videos/shorts/openings/spider-man-opening-1994.mp4'
]

def generate_thumbnail(video_path, timestamp=2):
    """Genera thumbnail de un video en el segundo especificado"""
    if not os.path.exists(video_path):
        print(f"✗ No existe: {video_path}")
        return False
    
    try:
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_num = int(fps * timestamp)
        
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        ret, frame = cap.read()
        
        if ret:
            # Guardar thumbnail con mismo nombre pero .jpg
            output_path = video_path.replace('.mp4', '.jpg')
            resized_frame = cv2.resize(frame, (320, 180))
            cv2.imwrite(output_path, resized_frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
            print(f"✓ Generado: {output_path}")
            return True
        else:
            print(f"✗ Error leyendo frame: {video_path}")
            return False
    except Exception as e:
        print(f"✗ Error: {video_path} - {e}")
        return False
    finally:
        cap.release()

print("Generando thumbnails para videos faltantes...\n")
for video in videos:
    generate_thumbnail(video)

print("\n¡Proceso completado!")
