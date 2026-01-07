"""Genera thumbnails faltantes sin tocar los que ya funcionan."""

from pathlib import Path
import cv2

ROOT = Path(__file__).parent
PROMOS_US_DIR = ROOT / "videos" / "shorts" / "promos" / "US"
PROMOS_LATAM_DIR = ROOT / "videos" / "shorts" / "promos" / "latam"
TARGET_SIZE = (320, 180)  # 16:9
TIMESTAMP = 2  # segundo del video a capturar

# Extras fuera de las carpetas de promos que aún queremos cubrir
EXTRA_VIDEOS = [
    ROOT / "videos/shorts/openings/x-men-opening-US-1992.mp4",
    ROOT / "videos/shorts/openings/x-men-opening-japan-1994.mp4",
    ROOT / "videos/shorts/openings/spider-man-opening-1994.mp4",
]


def generate_thumbnail(video_path: Path, timestamp: int = TIMESTAMP) -> bool:
    """Crea thumbnail si no existe; no sobrescribe los ya generados."""
    output_path = video_path.with_suffix(".jpg")

    if not video_path.exists():
        print(f"✗ No existe: {video_path}")
        return False

    if output_path.exists():
        print(f"• Ya existe, se omite: {output_path.relative_to(ROOT)}")
        return False

    cap = None
    try:
        cap = cv2.VideoCapture(str(video_path))
        fps = cap.get(cv2.CAP_PROP_FPS) or 24
        frame_num = int(fps * timestamp)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        ret, frame = cap.read()

        if not ret:
            print(f"✗ Error leyendo frame: {video_path.name}")
            return False

        resized_frame = cv2.resize(frame, TARGET_SIZE)
        cv2.imwrite(str(output_path), resized_frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
        print(f"✓ Generado: {output_path.relative_to(ROOT)}")
        return True
    except Exception as exc:  # raro, pero capturamos para log
        print(f"✗ Error procesando {video_path.name}: {exc}")
        return False
    finally:
        if cap is not None:
            cap.release()


def collect_targets() -> list[Path]:
    targets = []

    if PROMOS_US_DIR.exists():
        targets.extend(sorted(PROMOS_US_DIR.glob("*.mp4")))
    else:
        print(f"⚠ Carpeta no encontrada: {PROMOS_US_DIR}")

    if PROMOS_LATAM_DIR.exists():
        targets.extend(sorted(PROMOS_LATAM_DIR.glob("*.mp4")))
    else:
        print(f"⚠ Carpeta no encontrada: {PROMOS_LATAM_DIR}")

    for extra in EXTRA_VIDEOS:
        if extra.exists():
            targets.append(extra)
        else:
            print(f"• Extra no encontrado (se omite): {extra}")

    return targets


def main() -> None:
    print("Generando thumbnails solo para archivos que aún no tienen previsualización...\n")
    generated = 0
    total = 0

    for video in collect_targets():
        total += 1
        if generate_thumbnail(video):
            generated += 1

    print("\nResumen:")
    print(f"  Videos revisados : {total}")
    print(f"  Thumbnails nuevos: {generated}")


if __name__ == "__main__":
    main()
