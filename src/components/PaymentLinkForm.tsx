import React, { useState } from 'react';
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

interface PaymentLinkFormProps {
  onLinkGenerated: (link: { id: string; price: number; description: string; status: 'active'; clicks: number; chain: string; currency: string; availableCurrencies: string[]; availableChains: string[] }) => void;
}

const PaymentLinkForm: React.FC<PaymentLinkFormProps> = ({ onLinkGenerated }) => {
  const [formData, setFormData] = useState({
    price: '',
    title: '',
    currencies: ['USDC'] as string[],
    chains: ['ethereum'] as string[],
    baseCurrency: 'USD',
    hasExpiry: false,
    expiryDate: ''
  });
  const [openBaseCurrency, setOpenBaseCurrency] = useState(false);

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
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      value: 'polygon', 
      label: 'Polygon',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <path d="M17.045 10.788a1.5 1.5 0 00-1.5 0l-2.545 1.47-1.727 1-2.545 1.47a1.5 1.5 0 01-1.5 0l-2-1.155a1.5 1.5 0 01-.75-1.3v-2.31a1.5 1.5 0 01.75-1.3l2-1.155a1.5 1.5 0 011.5 0l2 1.155a1.5 1.5 0 01.75 1.3v1.47l1.727-1v-1.47a1.5 1.5 0 00-.75-1.3l-3.727-2.155a1.5 1.5 0 00-1.5 0L3.478 7.663a1.5 1.5 0 00-.75 1.3v4.31a1.5 1.5 0 00.75 1.3l3.75 2.155a1.5 1.5 0 001.5 0l2.545-1.47 1.727-1 2.545-1.47a1.5 1.5 0 011.5 0l2 1.155a1.5 1.5 0 01.75 1.3v2.31a1.5 1.5 0 01-.75 1.3l-2 1.155a1.5 1.5 0 01-1.5 0l-2-1.155a1.5 1.5 0 01-.75-1.3v-1.47l-1.727 1v1.47a1.5 1.5 0 00.75 1.3l3.75 2.155a1.5 1.5 0 001.5 0l3.75-2.155a1.5 1.5 0 00.75-1.3v-4.31a1.5 1.5 0 00-.75-1.3l-3.75-2.155z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      value: 'arbitrum', 
      label: 'Arbitrum',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <path d="M12 3l9 5.196v10.608L12 24l-9-5.196V8.196L12 3zm6.75 13.5l-2.25-3.9-2.25 3.9h4.5zm-9 0l2.25-3.9-2.25-3.9-2.25 3.9 2.25 3.9zm4.5-7.8L12 6.3l-2.25 2.4L12 11.1l2.25-2.4z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      value: 'optimism', 
      label: 'Optimism',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
          <path d="M8.5 10.5c0-1.1.9-2 2-2s2 .9 2 2v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3zm5 0c0-1.1.9-2 2-2s2 .9 2 2v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      value: 'base', 
      label: 'Base',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
          <path d="M12 6c3.314 0 6 2.686 6 6s-2.686 6-6 6c-2.537 0-4.706-1.575-5.598-3.8h8.598v-4.4H6.402C7.294 7.575 9.463 6 12 6z" fill="currentColor"/>
        </svg>
      )
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
    const newLink = {
      id: newId,
      price: parseFloat(formData.price),
      description: formData.title,
      status: 'active' as const,
      clicks: 0,
      chain: formData.chains[0], // Using first selected chain for display purposes
      currency: formData.currencies[0], // Using first selected currency for display purposes
      availableCurrencies: formData.currencies,
      availableChains: formData.chains
    };

    onLinkGenerated(newLink);
    
    // Reset form
    setFormData({
      price: '',
      title: '',
      currencies: ['USDC'],
      chains: ['ethereum'],
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
                          className="h-12 px-4 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.baseCurrency === currency.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {currency.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            placeholder="e.g., Consulting Services, Product Purchase" 
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
          />
        </div>



        <div className="space-y-2">
          <Label>Accept payment in</Label>
          <div className="flex flex-wrap gap-2">
            {currencies.map((currency) => (
              <div
                key={currency.value}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full cursor-pointer transition-all duration-200",
                  formData.currencies.includes(currency.value)
                    ? "bg-[#757575] text-white hover:bg-[#959FA8]"
                    : "bg-[#FAFAFA] dark:bg-[#2E3C49] text-[#1C1B1F] dark:text-[#F6F7F9] border border-[#43586C] hover:bg-[#EEEEEE] dark:hover:bg-[#303030]"
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
                  "flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all duration-200",
                  formData.chains.includes(network.value)
                    ? "bg-[#757575] text-white hover:bg-[#959FA8]"
                    : "bg-[#FAFAFA] dark:bg-[#2E3C49] text-[#1C1B1F] dark:text-[#F6F7F9] border border-[#43586C] hover:bg-[#EEEEEE] dark:hover:bg-[#303030]"
                )}
                onClick={() => handleChainToggle(network.value)}
              >
                <Checkbox
                  id={network.value}
                  checked={formData.chains.includes(network.value)}
                  onCheckedChange={() => handleChainToggle(network.value)}
                  className="hidden"
                />
                <div className="w-4 h-4">
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

        <Button 
          className="w-full min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 rounded-full" 
          onClick={handleSubmit}
        >
          <Link className="w-[18px] h-[18px] mr-2" />
          Generate Payment Link
        </Button>
    </div>
  );
};

export default PaymentLinkForm;