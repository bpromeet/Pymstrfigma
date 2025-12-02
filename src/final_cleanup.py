#!/usr/bin/env python3
"""Execute dead code cleanup for App.tsx - handles encoding properly"""

import sys

try:
    # Read the entire file with proper encoding handling
    with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
        all_lines = f.readlines()
    
    total_lines = len(all_lines)
    print(f"📄 Original App.tsx: {total_lines} lines")
    
    # Remove lines 1097-1248 (OldAPIConfiguration component)
    # Line numbers are 1-based, array indices are 0-based
    # Line 1097 = index 1096
    # Line 1248 = index 1247
    # We keep: lines 1-1096 (indices 0-1095) and lines 1249+ (indices 1248+)
    
    lines_before_dead_code = all_lines[:1096]  # Lines 1-1096
    lines_after_dead_code = all_lines[1248:]   # Lines 1249+
    
    # Combine the parts
    cleaned_lines = lines_before_dead_code + lines_after_dead_code
    
    removed_count = total_lines - len(cleaned_lines)
    new_total = len(cleaned_lines)
    
    print(f"✂️  Removing lines 1097-1248 ({removed_count} lines)")
    print(f"📊 New App.tsx: {new_total} lines")
    
    # Verify we're removing the right thing
    if all_lines[1096].strip().startswith('const OldAPIConfiguration'):
        print("✅ Confirmed: Removing OldAPIConfiguration component")
    else:
        print(f"⚠️  Warning: Line 1097 doesn't start with 'const OldAPIConfiguration'")
        print(f"   Found: {all_lines[1096][:50]}")
    
    if all_lines[1249].strip().startswith('const CustomerCheckout'):
        print("✅ Confirmed: Next component is CustomerCheckout")
    else:
        print(f"⚠️  Warning: Line 1250 doesn't start with 'const CustomerCheckout'")
        print(f"   Found: {all_lines[1249][:50]}")
    
    # Write the cleaned file
    with open('/App.tsx', 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)
    
    print("\n" + "="*60)
    print("✅ DEAD CODE CLEANUP COMPLETE!")
    print("="*60)
    print(f"Removed: OldAPIConfiguration component ({removed_count} lines)")
    print(f"App.tsx reduced from {total_lines} to {new_total} lines")
    print(f"Code is now {removed_count/total_lines*100:.1f}% cleaner!")
    print("\n🎉 Your codebase is now more maintainable!")
    
except Exception as e:
    print(f"❌ Error during cleanup: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc()
    sys.exit(1)
