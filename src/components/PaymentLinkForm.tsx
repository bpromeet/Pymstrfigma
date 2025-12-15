import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Link, Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from './ui/utils';
import { ChainIcon } from './ChainIcon';

interface PaymentLinkFormProps {
  onLinkGenerated: (link: { 
    id: string; 
    linkId: string;
    price: number; 
    description: string; 
    status: 'active'; 
    chain: string; 
    currency: string; 
    availableCurrencies: string[];
    availableChains: string[];
    baseCurrency: string; // Add baseCurrency to interface
    expiryDate?: string;
  }) => void;
  onCancel?: () => void; // Add optional cancel callback
}

const PaymentLinkForm: React.FC<PaymentLinkFormProps> = ({ onLinkGenerated, onCancel }) => {
  const [formData, setFormData] = useState({
    price: '',
    title: '',
    currencies: ['USDC', 'USDT', 'EURC'] as string[],
    chains: ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base'] as string[],
    baseCurrency: 'USD',
    hasExpiry: false,
    expiryDate: ''
  });
  const [openBaseCurrency, setOpenBaseCurrency] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const generateButtonRef = useRef<HTMLButtonElement>(null);

  const currencies = [
    { value: 'USDC', label: 'USDC' },
    { value: 'USDT', label: 'USDT' },
    { value: 'EURC', label: 'EURC' },
  ];

  const baseCurrencies = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'JPY', label: 'JPY' },
    { value: 'AED', label: 'AED' },
  ];

  const blockchainNetworks = [
    { 
      value: 'ethereum', 
      label: 'Ethereum',
      icon: <ChainIcon chain="ethereum" size={20} />
    },
    { 
      value: 'polygon', 
      label: 'Polygon',
      icon: <ChainIcon chain="polygon" size={20} />
    },
    { 
      value: 'arbitrum', 
      label: 'Arbitrum',
      icon: <ChainIcon chain="arbitrum" size={20} />
    },
    { 
      value: 'optimism', 
      label: 'Optimism',
      icon: <ChainIcon chain="optimism" size={20} />
    },
    { 
      value: 'base', 
      label: 'Base',
      icon: <ChainIcon chain="base" size={20} />
    }
  ];

  const handleChainToggle = (chainValue: string) => {
    setFormData(prev => {
      const newChains = prev.chains.includes(chainValue)
        ? prev.chains.filter(c => c !== chainValue)
        : [...prev.chains, chainValue];
      return { ...prev, chains: newChains };
    });
  };

  const handleCurrencyToggle = (currencyValue: string) => {
    setFormData(prev => {
      const newCurrencies = prev.currencies.includes(currencyValue)
        ? prev.currencies.filter(c => c !== currencyValue)
        : [...prev.currencies, currencyValue];
      return { ...prev, currencies: newCurrencies };
    });
  };

  const copyToClipboard = (text: string) => {
    // Fallback method that doesn't require Clipboard API permissions
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      toast('Copied to clipboard!');
      setCopiedItem(text);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast('Failed to copy to clipboard');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleSubmit = () => {
    if (!formData.price || !formData.title) {
      toast('Please fill in all required fields');
      return;
    }

    if (formData.chains.length === 0) {
      toast('Please select at least one blockchain network');
      return;
    }

    if (formData.currencies.length === 0) {
      toast('Please select at least one currency');
      return;
    }

    const newId = Date.now().toString();
    const linkId = `#PL${newId.slice(-6)}`; // Generate linkId like #PL123456
    const newLink = {
      id: newId,
      linkId: linkId,
      price: parseFloat(formData.price),
      description: formData.title,
      status: 'active' as const,
      chain: formData.chains[0], // Using first selected chain for display purposes
      currency: formData.currencies[0], // Using first selected currency for display purposes
      availableCurrencies: formData.currencies,
      availableChains: formData.chains,
      baseCurrency: formData.baseCurrency, // Add base currency to payment link
      expiryDate: formData.hasExpiry ? formData.expiryDate : undefined
    };

    onLinkGenerated(newLink);
    
    // Reset form
    setFormData({
      price: '',
      title: '',
      currencies: ['USDC', 'USDT', 'EURC'],
      chains: ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base'],
      baseCurrency: 'USD',
      hasExpiry: false,
      expiryDate: ''
    });

    const paymentOptions = `${formData.currencies.join(', ')} on ${formData.chains.length} network${formData.chains.length > 1 ? 's' : ''}`;
    
    toast(`Payment link generated! Accepts ${paymentOptions}`);
    copyToClipboard(`${window.location.origin}/#/pay/${newId}`);
  };

  return (
    <div className="space-y-6">
        {/* Price and Title on same line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Price field */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="flex rounded overflow-hidden border border-[#43586C] hover:border-[#757575] focus-within:border-2 focus-within:border-[#1E88E5] transition-all duration-200">
              <Input 
                id="price" 
                placeholder="100.00" 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="border-0 rounded-none flex-1 h-12 px-4 bg-transparent text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ MozAppearance: 'textfield' }}
              />
              <Popover open={openBaseCurrency} onOpenChange={setOpenBaseCurrency}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={openBaseCurrency}
                    className="border-0 rounded-none w-20 border-l border-l-[#43586C] h-auto px-2 hover:bg-transparent text-[#1C1B1F] dark:text-[#F6F7F9]"
                  >
                    {formData.baseCurrency
                      ? baseCurrencies.find((currency) => currency.value === formData.baseCurrency)?.label
                      : "USD"}
                    <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 rounded-xl bg-white dark:bg-[#262626] shadow-md">
                  <Command className="rounded-xl">
                    <CommandInput placeholder="Search currency..." className="rounded h-12 px-4" />
                    <CommandList>
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <CommandGroup>
                        {baseCurrencies.map((currency) => (
                          <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={(currentValue) => {
                              setFormData(prev => ({ ...prev, baseCurrency: currentValue.toUpperCase() }));
                              setOpenBaseCurrency(false);
                            }}
                            className={cn(
                              "flex items-center gap-2 px-4 py-3 cursor-pointer rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-colors duration-200",
                              formData.baseCurrency === currency.value && "bg-black/[0.08] dark:bg-white/[0.08]"
                            )}
                          >
                            {currency.label}
                            {formData.baseCurrency === currency.value && (
                              <Check className="ml-auto h-4 w-4 text-[#1E88E5]" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Title field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Consulting Services, Product Purchase" 
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  generateButtonRef.current?.focus();
                }
              }}
              className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
            />
          </div>
        </div>



        <div className="space-y-2">
          <Label>Accept payment in</Label>
          <div className="flex flex-wrap gap-2">
            {currencies.map((currency) => (
              <div
                key={currency.value}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 border",
                  formData.currencies.includes(currency.value)
                    ? "bg-[#757575] text-white hover:bg-[#959FA8] border-[#757575]"
                    : "bg-[#FAFAFA] dark:bg-[#2E3C49] text-[#1C1B1F] dark:text-[#F6F7F9] border-[#43586C] hover:bg-[#EEEEEE] dark:hover:bg-[#303030]"
                )}
                onClick={() => handleCurrencyToggle(currency.value)}
              >
                <Checkbox
                  id={`currency-${currency.value}`}
                  checked={formData.currencies.includes(currency.value)}
                  onCheckedChange={() => handleCurrencyToggle(currency.value)}
                  className="hidden"
                />
                <span className="text-sm font-medium">{currency.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Blockchain Networks</Label>
          <div className="flex flex-wrap gap-2">
            {blockchainNetworks.map((network) => (
              <div
                key={network.value}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all duration-200 border",
                  formData.chains.includes(network.value)
                    ? "bg-[#757575] text-white hover:bg-[#959FA8] border-[#757575]"
                    : "bg-[#FAFAFA] dark:bg-[#2E3C49] text-[#1C1B1F] dark:text-[#F6F7F9] border-[#43586C] hover:bg-[#EEEEEE] dark:hover:bg-[#303030]"
                )}
                onClick={() => handleChainToggle(network.value)}
              >
                <Checkbox
                  id={network.value}
                  checked={formData.chains.includes(network.value)}
                  onCheckedChange={() => handleChainToggle(network.value)}
                  className="hidden"
                />
                <div className="flex-shrink-0">
                  {network.icon}
                </div>
                <span className="text-sm font-medium">{network.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch 
              id="expiry" 
              checked={formData.hasExpiry}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasExpiry: checked, expiryDate: checked ? prev.expiryDate : '' }))}
              className="data-[state=checked]:bg-[#1E88E5] data-[state=unchecked]:bg-[#43586C]"
            />
            <Label htmlFor="expiry" className="cursor-pointer">Set expiry date</Label>
          </div>
          {formData.hasExpiry && (
            <Input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
              className="w-full sm:w-auto h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              min={new Date().toISOString().split('T')[0]}
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
          {onCancel && (
            <Button 
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto min-h-12 px-6 py-2.5 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200 rounded-full"
            >
              Cancel
            </Button>
          )}
          <Button 
            className="w-full sm:w-auto min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 rounded-full" 
            onClick={handleSubmit}
            ref={generateButtonRef}
          >
            <Link className="w-[18px] h-[18px] mr-2" />
            Generate Payment Link
          </Button>
        </div>
    </div>
  );
};

export default PaymentLinkForm;