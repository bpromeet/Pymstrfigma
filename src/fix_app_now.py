#!/usr/bin/env python3
"""
Direct fix for App.tsx - removes all corrupted lines in one go
"""

def fix_app():
    print("🔧 Reading App.tsx...")
    
    with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    print(f"📄 Current size: {len(content)} characters")
    
    # Find the two CustomerCheckout definitions
    first_def = content.find('const CustomerCheckout = () => (')
    second_def = content.find('const CustomerCheckout = () => (', first_def + 1)
    
    if first_def == -1 or second_def == -1:
        print("❌ Could not find two CustomerCheckout definitions")
        return False
    
    print(f"📍 First CustomerCheckout at position: {first_def}")
    print(f"📍 Second CustomerCheckout at position: {second_def}")
    
    # Find the end of the component before the corrupted section
    # Look for "};" before the first CustomerCheckout
    end_before = content.rfind('};\n', 0, first_def)
    
    if end_before == -1:
        print("❌ Could not find end of previous component")
        return False
    
    # The clean content is: everything up to end_before + "};\n\n" + everything from second_def onward
    clean_content = content[:end_before + 3] + '\n' + content[second_def:]
    
    removed_chars = len(content) - len(clean_content)
    print(f"✂️  Removing {removed_chars} characters of corrupted code")
    
    # Write the fixed file
    with open('/App.tsx', 'w', encoding='utf-8') as f:
        f.write(clean_content)
    
    print(f"✅ Fixed! New size: {len(clean_content)} characters")
    print("🎉 Build errors should be resolved!")
    return True

if __name__ == '__main__':
    try:
        if fix_app():
            print("\n✨ SUCCESS! Run 'npm run build' to verify")
        else:
            print("\n❌ Fix failed - manual intervention needed")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
