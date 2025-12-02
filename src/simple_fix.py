#!/usr/bin/env python3
"""
Simplest possible fix - find the two CustomerCheckout occurrences and remove the first one
"""

print("🔧 Simple Fix Starting...")

with open('/App.tsx', 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

print(f"📄 Original size: {len(content):,} chars")

# Find both occurrences of "const CustomerCheckout = () => ("
pattern = "const CustomerCheckout = () => ("
first_pos = content.find(pattern)
second_pos = content.find(pattern, first_pos + 1)

if first_pos == -1 or second_pos == -1:
    print("❌ Could not find two CustomerCheckout definitions")
    exit(1)

print(f"📍 First CustomerCheckout at position: {first_pos:,}")
print(f"📍 Second CustomerCheckout at position: {second_pos:,}")

# Find the closing "};" before the first CustomerCheckout
# Go backwards from first_pos
search_start = first_pos - 1
closing_pos = content.rfind('};\n', 0, search_start)

if closing_pos == -1:
    print("❌ Could not find closing before first CustomerCheckout")
    exit(1)

# Include the "};\n" and one blank line
keep_until = closing_pos + 3  # Length of "};\n"

print(f"📍 Will keep content up to position: {keep_until:,}")
print(f"✂️  Will remove positions {keep_until:,} to {second_pos - 1:,}")

# Reconstruct: before + blank line + second CustomerCheckout onwards
new_content = content[:keep_until] + '\n' + content[second_pos:]

removed = len(content) - len(new_content)
print(f"✂️  Removed {removed:,} characters")
print(f"📊 New size: {len(new_content):,} chars")

# Write it
with open('/App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("\n✅ DONE! File fixed!")
print("🎉 Run 'npm run build' to verify")
