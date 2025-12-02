#!/usr/bin/env python3
"""Clean dead code from App.tsx"""

# Read the file
with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

print(f"Original file: {len(lines)} lines")

# Remove lines 1097-1248 (OldAPIConfiguration component)
# Python uses 0-based indexing, so line 1097 is index 1096
# We want to keep lines 1-1096 and lines 1249+
new_lines = lines[:1096] + lines[1248:]

print(f"Removed: {len(lines) - len(new_lines)} lines")
print(f"New file: {len(new_lines)} lines")

# Write cleaned file
with open('/App.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ Dead code cleanup complete!")
print("   - Removed OldAPIConfiguration component")
print("   - File is now cleaner and more maintainable")
