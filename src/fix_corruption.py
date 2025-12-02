#!/usr/bin/env python3
"""Fix the corrupted App.tsx by removing the duplicate CustomerCheckout"""

try:
    # Read the file
    with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
        all_lines = f.readlines()
    
    print(f"📄 Current App.tsx: {len(all_lines)} lines")
    
    # The corruption: lines 1097-1229 contain a corrupted CustomerCheckout
    # with old API configuration code mixed in
    # The real CustomerCheckout starts at line 1231
    
    # Keep lines 1-1096 and skip 1097-1230, resume at 1231+
    lines_before = all_lines[:1096]  # Lines 1-1096  
    lines_after = all_lines[1230:]   # Lines 1231+ (index 1230)
    
    cleaned_lines = lines_before + lines_after
    
    removed_count = len(all_lines) - len(cleaned_lines)
    print(f"✂️  Removing corrupted lines 1097-1230 ({removed_count} lines)")
    print(f"📊 New App.tsx: {len(cleaned_lines)} lines")
    
    # Verify
    print(f"\n✅ Checking line 1095: {all_lines[1094].strip()[:50]}")
    print(f"✅ Checking line 1096: {all_lines[1095].strip()[:50]}")
    print(f"✅ Checking line 1231 (becomes 1097): {all_lines[1230].strip()[:60]}")
    
    # Write the fixed file
    with open('/App.tsx', 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)
    
    print("\n" + "="*60)
    print("✅ CORRUPTION FIXED!")
    print("="*60)
    print(f"Removed: {removed_count} lines of corrupted/duplicate code")
    print(f"App.tsx now: {len(cleaned_lines)} lines")
    print("\n🎉 File is clean and ready!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
