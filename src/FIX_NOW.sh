#!/bin/bash
# Emergency fix for corrupted App.tsx
# Removes lines 1097-1230 (corrupted duplicate)

echo "🚨 Fixing App.tsx corruption..."

# Backup first
cp /App.tsx /App.tsx.backup
echo "✅ Backup created: /App.tsx.backup"

# Remove lines 1097-1230
sed -i '1097,1230d' /App.tsx

echo "✅ Removed corrupted lines 1097-1230"
echo "📊 Checking result..."

# Verify
line_count=$(wc -l < /App.tsx)
echo "📄 App.tsx now has $line_count lines"

# Check for duplicates
customer_count=$(grep -c "const CustomerCheckout" /App.tsx)
echo "🔍 CustomerCheckout definitions found: $customer_count (should be 1)"

if [ "$customer_count" -eq 1 ]; then
    echo "✅ SUCCESS! Build errors should be fixed!"
else
    echo "⚠️  Warning: Unexpected number of CustomerCheckout definitions"
fi

echo ""
echo "🎯 Next step: Run 'npm run build' to verify"
