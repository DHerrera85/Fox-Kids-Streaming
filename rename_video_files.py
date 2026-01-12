#!/usr/bin/env python3
"""
Rename video files to remove spaces and special characters that cause URL encoding issues
"""
import os
import re
from pathlib import Path

promo_us_dir = Path(r"C:\Users\herre\OneDrive\Documentos\Fox Kids Streaming\videos\shorts\promos\US")
openings_dir = Path(r"C:\Users\herre\OneDrive\Documentos\Fox Kids Streaming\videos\shorts\openings")

def sanitize_filename(filename):
    """
    Replace spaces and problematic characters with hyphens
    Keep .mp4 and .jpg extensions
    """
    name, ext = os.path.splitext(filename)
    
    # Replace spaces with hyphens
    name = name.replace(' ', '-')
    
    # Remove extra spaces and normalize
    name = re.sub(r'-+', '-', name)  # Replace multiple hyphens with single
    name = name.strip('-')  # Remove leading/trailing hyphens
    
    return name + ext

def rename_files_in_directory(directory):
    """Rename all files with spaces in a directory"""
    print(f"\nProcessing directory: {directory}")
    
    for file_path in directory.iterdir():
        if file_path.is_file() and file_path.suffix in ['.mp4', '.jpg']:
            original_name = file_path.name
            new_name = sanitize_filename(original_name)
            
            if original_name != new_name:
                new_path = file_path.parent / new_name
                try:
                    file_path.rename(new_path)
                    print(f"✓ Renamed: '{original_name}' → '{new_name}'")
                except Exception as e:
                    print(f"✗ Error renaming '{original_name}': {e}")
            else:
                print(f"- No changes needed: {original_name}")

# Process both directories
rename_files_in_directory(promo_us_dir)
rename_files_in_directory(openings_dir)

print("\n" + "="*60)
print("✓ File renaming complete")
print("="*60)
