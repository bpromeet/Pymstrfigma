// Script to swap Chain and Coin sections in App.tsx
// This would be run with Node.js to perform the swap

const fs = require('fs');

// Read the file
const content = fs.readFileSync('/App.tsx', 'utf8');
const lines = content.split('\n');

// Helper function to swap sections
function swapSections(lines, chainStart, chainEnd, coinStart, coinEnd) {
  const beforeChain = lines.slice(0, chainStart);
  const chainSection = lines.slice(chainStart, chainEnd + 1);
  const betweenSections = lines.slice(chainEnd + 1, coinStart);
  const coinSection = lines.slice(coinStart, coinEnd + 1);
  const afterCoin = lines.slice(coinEnd + 1);
  
  // Reassemble with coin first, then chain
  return [
    ...beforeChain,
    ...coinSection,  // Coin FIRST
    ...betweenSections,
    ...chainSection,  // Chain SECOND
    ...afterCoin
  ];
}

// Instance 1: Swap sections at lines 1489-1610
// Chain: 1489-1532 (44 lines)
// Gap: 1533 (1 line)
// Coin: 1534-1610 (77 lines)
let result = swapSections(lines, 1488, 1531, 1533, 1609);

// Instance 2 would be at different line numbers after first swap
// Need to recalculate

// Write result
fs.writeFileSync('/App.tsx', result.join('\n'), 'utf8');

console.log('Sections swapped successfully');
