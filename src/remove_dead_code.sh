#!/bin/bash
# Remove OldAPIConfiguration dead code from App.tsx (lines 1097-1248)
sed -i '1097,1248d' /App.tsx
echo "✅ Removed 152 lines of dead code (OldAPIConfiguration component)"
