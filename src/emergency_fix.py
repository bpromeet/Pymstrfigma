#!/usr/bin/env python3
"""Emergency fix for corrupted App.tsx"""

print("🚨 Emergency Fix Starting...")

try:
    # Read all lines
    with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    total = len(lines)
    print(f"📄 Original file: {total} lines")
    
    # Remove lines 1097-1230 (indices 1096-1229)
    # Keep: lines 1-1096 (indices 0-1095) + lines 1231+ (indices 1230+)
    clean_lines = lines[:1096] + lines[1230:]
    
    removed = total - len(clean_lines)
    print(f"✂️  Removing corrupted lines 1097-1230 ({removed} lines)")
    
    # Verify what we're joining
    print(f"\n📍 Line 1096: {lines[1095].strip()[:60]}")
    print(f"📍 Line 1231 (becomes 1097): {lines[1230].strip()[:60]}")
    
    # Write cleaned file
    with open('/App.tsx', 'w', encoding='utf-8') as f:
        f.writelines(clean_lines)
    
    print(f"\n✅ Fixed! App.tsx now has {len(clean_lines)} lines")
    print("🎉 Build errors should be resolved!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
