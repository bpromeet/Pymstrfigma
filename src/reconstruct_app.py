#!/usr/bin/env python3
"""
Reconstruct App.tsx by finding and removing the corrupted CustomerCheckout
"""

def main():
    print("🔧 Reading App.tsx...")
    
    with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    lines = content.split('\n')
    print(f"📄 Current file: {len(lines)} lines")
    
    # Find all lines with "const CustomerCheckout"
    checkout_lines = []
    for i, line in enumerate(lines):
        if 'const CustomerCheckout = () => (' in line:
            checkout_lines.append(i + 1)  # 1-indexed
            print(f"📍 Found CustomerCheckout at line {i + 1}")
    
    if len(checkout_lines) != 2:
        print(f"❌ Expected 2 CustomerCheckout definitions, found {len(checkout_lines)}")
        return False
    
    first_line = checkout_lines[0] - 1  # Convert to 0-indexed
    second_line = checkout_lines[1] - 1
    
    print(f"✂️  Will remove lines {first_line + 1} to {second_line}")
    
    # Find the end of the component before the first CustomerCheckout
    # Look backwards for "};"
    end_before = -1
    for i in range(first_line - 1, -1, -1):
        if lines[i].strip() == '};':
            end_before = i
            print(f"📍 Found end of previous component at line {i + 1}")
            break
    
    if end_before == -1:
        print("❌ Could not find end of previous component")
        return False
    
    # Reconstruct: Keep lines 0 to end_before, then lines from second_line onward
    new_lines = lines[:end_before + 1] + [''] + lines[second_line:]
    
    new_content = '\n'.join(new_lines)
    
    removed = len(lines) - len(new_lines)
    print(f"✂️  Removed {removed} lines")
    print(f"📊 New file: {len(new_lines)} lines")
    
    # Write back
    with open('/App.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ File reconstructed successfully!")
    return True

if __name__ == '__main__':
    try:
        if main():
            print("\n✨ SUCCESS! Run 'npm run build' to verify")
        else:
            print("\n❌ Reconstruction failed")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
