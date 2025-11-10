/**
 * MD3 Component Examples & Implementation Guide
 * 
 * Complete examples of Material Design 3 components
 * for copy-paste implementation in PYMSTR
 */

import React, { useState } from 'react';
import {
  MD3FilledButton,
  MD3OutlinedButton,
  MD3TextButton,
  MD3ErrorButton,
  MD3SuccessButton,
  MD3WarningButton,
  MD3PrimaryFAB,
  MD3SecondaryFAB,
  MD3SmallFAB,
  MD3LargeFAB,
  MD3OutlinedInput,
  MD3OutlinedInputLarge,
  MD3FilledInput,
  MD3OutlinedInputError,
  MD3ElevatedCard,
  MD3FilledCard,
  MD3InteractiveCard,
  MD3NestedSection,
  MD3SmallContainer,
  MD3SuccessBadge,
  MD3ErrorBadge,
  MD3WarningBadge,
  MD3CountBadge,
  MD3ChipBadge,
} from './MD3Components';
import {
  Plus,
  Save,
  Trash2,
  Edit,
  Check,
  X,
  AlertTriangle,
  Send,
  Settings,
  Download,
  Upload,
  Copy,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  User,
  Mail,
  CreditCard,
  Link as LinkIcon,
  Bell,
} from 'lucide-react';

// ============================================================================
// EXAMPLE 1: Payment Link Creation Form
// ============================================================================

export const PaymentLinkFormMD3: React.FC = () => {
  const [formData, setFormData] = useState({
    price: '',
    title: '',
    email: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    price: false,
    title: false,
  });

  const handleSubmit = () => {
    // Validation
    const newErrors = {
      price: !formData.price,
      title: !formData.title,
    };
    setErrors(newErrors);

    if (!newErrors.price && !newErrors.title) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <MD3ElevatedCard className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-medium mb-6">Create Payment Link</h2>

      <div className="space-y-6">
        {/* Price Input */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-[#F6F7F9]">
            Price *
          </label>
          {errors.price ? (
            <>
              <MD3OutlinedInputError
                id="price"
                type="number"
                placeholder="100.00"
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                  setErrors({ ...errors, price: false });
                }}
              />
              <p className="text-xs text-[#DD6B6B]">Price is required</p>
            </>
          ) : (
            <MD3OutlinedInput
              id="price"
              type="number"
              placeholder="100.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          )}
        </div>

        {/* Title Input (Large) */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-[#F6F7F9]">
            Title *
          </label>
          {errors.title ? (
            <>
              <MD3OutlinedInputError
                id="title"
                placeholder="e.g., Consulting Services"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setErrors({ ...errors, title: false });
                }}
              />
              <p className="text-xs text-[#DD6B6B]">Title is required</p>
            </>
          ) : (
            <MD3OutlinedInputLarge
              id="title"
              placeholder="e.g., Consulting Services"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          )}
        </div>

        {/* Optional Fields */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-[#F6F7F9]">
            Email (optional)
          </label>
          <MD3OutlinedInput
            id="email"
            type="email"
            placeholder="customer@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Description (Filled Input Example) */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-[#F6F7F9]">
            Description (optional)
          </label>
          <MD3FilledInput
            id="description"
            placeholder="Additional details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <MD3FilledButton
            icon={<LinkIcon />}
            onClick={handleSubmit}
            className="flex-1"
          >
            Generate Payment Link
          </MD3FilledButton>
          <MD3OutlinedButton
            icon={<X />}
            onClick={() => setFormData({ price: '', title: '', email: '', description: '' })}
          >
            Clear
          </MD3OutlinedButton>
        </div>
      </div>
    </MD3ElevatedCard>
  );
};

// ============================================================================
// EXAMPLE 2: Payment Link Card with Actions
// ============================================================================

export const PaymentLinkCard: React.FC<{
  id: string;
  title: string;
  price: number;
  status: 'active' | 'completed' | 'expired';
  clicks: number;
}> = ({ id, title, price, status, clicks }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#/pay/${id}`);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulate delete
    setTimeout(() => setIsDeleting(false), 2000);
  };

  return (
    <MD3InteractiveCard>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <p className="text-2xl font-semibold text-[#1E88E5]">${price.toFixed(2)}</p>
          </div>
          
          {/* Status Badge */}
          {status === 'active' && <MD3SuccessBadge>Active</MD3SuccessBadge>}
          {status === 'completed' && <MD3WarningBadge>Completed</MD3WarningBadge>}
          {status === 'expired' && <MD3ErrorBadge>Expired</MD3ErrorBadge>}
        </div>

        {/* Stats Section */}
        <MD3NestedSection>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#798A9B]">Clicks</span>
            <MD3CountBadge>{clicks}</MD3CountBadge>
          </div>
        </MD3NestedSection>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <MD3OutlinedButton
            icon={<Copy />}
            onClick={handleCopy}
            className="flex-1 text-sm"
          >
            Copy Link
          </MD3OutlinedButton>
          <MD3ErrorButton
            icon={<Trash2 />}
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </MD3ErrorButton>
        </div>
      </div>
    </MD3InteractiveCard>
  );
};

// ============================================================================
// EXAMPLE 3: Dashboard with FABs
// ============================================================================

export const DashboardWithFABs: React.FC = () => {
  return (
    <div className="relative min-h-screen p-6">
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-medium mb-8">Payment Links</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PaymentLinkCard
            id="PL001"
            title="Consulting Services"
            price={150.00}
            status="active"
            clicks={12}
          />
          <PaymentLinkCard
            id="PL002"
            title="Product Purchase"
            price={49.99}
            status="completed"
            clicks={5}
          />
          <PaymentLinkCard
            id="PL003"
            title="Subscription"
            price={29.99}
            status="expired"
            clicks={0}
          />
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <MD3SmallFAB
          icon={<Filter />}
          aria-label="Filter"
        />
        <MD3PrimaryFAB
          icon={<Plus />}
          aria-label="Create Payment Link"
        />
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 4: Settings Page with Nested Sections
// ============================================================================

export const SettingsPageMD3: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('merchant@pymstr.com');
  const [apiKey, setApiKey] = useState('sk_live_********************');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-medium mb-8">Settings</h1>

      {/* Profile Section */}
      <MD3ElevatedCard>
        <h2 className="text-xl font-medium mb-6">Profile Information</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#F6F7F9]">
              Email Address
            </label>
            <MD3OutlinedInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <MD3FilledButton icon={<Save />}>
              Save Changes
            </MD3FilledButton>
            <MD3OutlinedButton icon={<X />}>
              Cancel
            </MD3OutlinedButton>
          </div>
        </div>
      </MD3ElevatedCard>

      {/* API Key Section */}
      <MD3ElevatedCard>
        <h2 className="text-xl font-medium mb-6">API Configuration</h2>

        <MD3NestedSection className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#F6F7F9]">
              API Key
            </label>
            <div className="flex gap-2">
              <MD3OutlinedInput
                type="password"
                value={apiKey}
                readOnly
                className="flex-1"
              />
              <MD3OutlinedButton icon={<Copy />}>
                Copy
              </MD3OutlinedButton>
            </div>
          </div>

          <MD3WarningButton icon={<AlertTriangle />}>
            Regenerate API Key
          </MD3WarningButton>
        </MD3NestedSection>
      </MD3ElevatedCard>

      {/* Preferences */}
      <MD3FilledCard>
        <h2 className="text-xl font-medium mb-6">Preferences</h2>

        <div className="space-y-4">
          <MD3SmallContainer>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-[#798A9B]">
                  Receive notifications for new payments
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${notifications ? 'bg-[#1E88E5]' : 'bg-[#43586C]'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${notifications ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </MD3SmallContainer>
        </div>
      </MD3FilledCard>

      {/* Danger Zone */}
      <MD3ElevatedCard className="border-2 border-[#DD6B6B]">
        <h2 className="text-xl font-medium mb-6 text-[#DD6B6B]">Danger Zone</h2>

        <div className="space-y-4">
          <p className="text-sm text-[#798A9B]">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          <MD3ErrorButton icon={<Trash2 />}>
            Delete Account
          </MD3ErrorButton>
        </div>
      </MD3ElevatedCard>
    </div>
  );
};

// ============================================================================
// EXAMPLE 5: Search and Filter Interface
// ============================================================================

export const SearchFilterMD3: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(['USDC']);

  const currencies = ['USDC', 'USDT', 'EURC'];

  const toggleCurrency = (currency: string) => {
    setSelectedCurrencies(prev =>
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    );
  };

  return (
    <MD3ElevatedCard className="max-w-4xl mx-auto">
      <h2 className="text-xl font-medium mb-6">Filter Payment Links</h2>

      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#F6F7F9]">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#798A9B]" />
            <MD3OutlinedInput
              placeholder="Search by title or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        {/* Currency Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#F6F7F9]">
            Currencies
          </label>
          <div className="flex flex-wrap gap-2">
            {currencies.map((currency) => (
              <MD3ChipBadge
                key={currency}
                className={selectedCurrencies.includes(currency) ? 'bg-[#1E88E5] border-[#1E88E5]' : ''}
                onClick={() => toggleCurrency(currency)}
              >
                {currency}
                {selectedCurrencies.includes(currency) && (
                  <Check className="w-3 h-3 ml-1.5" />
                )}
              </MD3ChipBadge>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <MD3NestedSection>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#798A9B]">Results</span>
            <MD3CountBadge>42</MD3CountBadge>
          </div>
        </MD3NestedSection>

        {/* Actions */}
        <div className="flex gap-3">
          <MD3FilledButton icon={<Search />} className="flex-1">
            Apply Filters
          </MD3FilledButton>
          <MD3TextButton
            icon={<X />}
            onClick={() => {
              setSearchTerm('');
              setSelectedCurrencies(['USDC']);
            }}
          >
            Clear
          </MD3TextButton>
        </div>
      </div>
    </MD3ElevatedCard>
  );
};

// ============================================================================
// EXAMPLE 6: Action Buttons Showcase
// ============================================================================

export const ActionButtonsShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-medium mb-8">MD3 Button Examples</h1>

      {/* Primary Actions */}
      <MD3ElevatedCard>
        <h2 className="text-lg font-medium mb-4">Primary Actions</h2>
        <div className="flex flex-wrap gap-3">
          <MD3FilledButton icon={<Plus />}>
            Create Payment Link
          </MD3FilledButton>
          <MD3FilledButton icon={<Send />}>
            Send Invoice
          </MD3FilledButton>
          <MD3FilledButton icon={<Download />}>
            Export Data
          </MD3FilledButton>
        </div>
      </MD3ElevatedCard>

      {/* Secondary Actions */}
      <MD3ElevatedCard>
        <h2 className="text-lg font-medium mb-4">Secondary Actions</h2>
        <div className="flex flex-wrap gap-3">
          <MD3OutlinedButton icon={<Save />}>
            Save Changes
          </MD3OutlinedButton>
          <MD3OutlinedButton icon={<Edit />}>
            Edit
          </MD3OutlinedButton>
          <MD3OutlinedButton icon={<Copy />}>
            Copy
          </MD3OutlinedButton>
        </div>
      </MD3ElevatedCard>

      {/* Tertiary Actions */}
      <MD3ElevatedCard>
        <h2 className="text-lg font-medium mb-4">Tertiary Actions</h2>
        <div className="flex flex-wrap gap-3">
          <MD3TextButton icon={<Settings />}>
            Settings
          </MD3TextButton>
          <MD3TextButton icon={<Calendar />}>
            Schedule
          </MD3TextButton>
          <MD3TextButton icon={<ExternalLink />}>
            View Details
          </MD3TextButton>
        </div>
      </MD3ElevatedCard>

      {/* Semantic Actions */}
      <MD3ElevatedCard>
        <h2 className="text-lg font-medium mb-4">Semantic Actions</h2>
        <div className="flex flex-wrap gap-3">
          <MD3ErrorButton icon={<Trash2 />}>
            Delete Payment Link
          </MD3ErrorButton>
          <MD3SuccessButton icon={<Check />}>
            Confirm Payment
          </MD3SuccessButton>
          <MD3WarningButton icon={<AlertTriangle />}>
            Archive Link
          </MD3WarningButton>
        </div>
      </MD3ElevatedCard>

      {/* FABs */}
      <MD3ElevatedCard>
        <h2 className="text-lg font-medium mb-4">Floating Action Buttons</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <MD3LargeFAB icon={<Plus />} />
            <span className="text-xs text-[#798A9B]">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MD3PrimaryFAB icon={<Send />} />
            <span className="text-xs text-[#798A9B]">Standard</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MD3SmallFAB icon={<Edit />} />
            <span className="text-xs text-[#798A9B]">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MD3SecondaryFAB icon={<Download />} />
            <span className="text-xs text-[#798A9B]">Secondary</span>
          </div>
        </div>
      </MD3ElevatedCard>

      {/* Disabled States */}
      <MD3ElevatedCard>
        <h2 className="text-lg font-medium mb-4">Disabled States</h2>
        <div className="flex flex-wrap gap-3">
          <MD3FilledButton disabled>
            Disabled Filled
          </MD3FilledButton>
          <MD3OutlinedButton disabled>
            Disabled Outlined
          </MD3OutlinedButton>
          <MD3TextButton disabled>
            Disabled Text
          </MD3TextButton>
        </div>
      </MD3ElevatedCard>
    </div>
  );
};

// ============================================================================
// EXAMPLE 7: Complete App Layout
// ============================================================================

export const CompleteLayoutExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      {/* Header */}
      <header className="bg-white dark:bg-[#303030] border-b border-[#43586C] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">PYMSTR</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-[#F6F7F9]" />
              <MD3CountBadge className="absolute -top-1 -right-1">3</MD3CountBadge>
            </div>
            <MD3OutlinedButton icon={<Settings />} className="text-sm">
              Settings
            </MD3OutlinedButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <PaymentLinkFormMD3 />
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            <MD3ElevatedCard>
              <h3 className="font-medium mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <MD3SmallContainer>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#798A9B]">Active Links</span>
                    <span className="font-semibold">42</span>
                  </div>
                </MD3SmallContainer>
                <MD3SmallContainer>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#798A9B]">Total Revenue</span>
                    <span className="font-semibold text-[#1E88E5]">$12,450</span>
                  </div>
                </MD3SmallContainer>
              </div>
            </MD3ElevatedCard>
          </div>
        </div>
      </main>

      {/* FAB */}
      <MD3PrimaryFAB
        icon={<Plus />}
        className="fixed bottom-6 right-6"
        aria-label="Create new payment link"
      />
    </div>
  );
};

// Export all examples
export const MD3ExampleShowcase: React.FC = () => {
  const [activeExample, setActiveExample] = useState<string>('form');

  const examples = [
    { id: 'form', label: 'Payment Form', component: PaymentLinkFormMD3 },
    { id: 'dashboard', label: 'Dashboard', component: DashboardWithFABs },
    { id: 'settings', label: 'Settings', component: SettingsPageMD3 },
    { id: 'search', label: 'Search & Filter', component: SearchFilterMD3 },
    { id: 'buttons', label: 'Buttons', component: ActionButtonsShowcase },
    { id: 'layout', label: 'Complete Layout', component: CompleteLayoutExample },
  ];

  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component || PaymentLinkFormMD3;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">MD3 Component Examples</h1>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {examples.map((example) => (
            <MD3ChipBadge
              key={example.id}
              onClick={() => setActiveExample(example.id)}
              className={
                activeExample === example.id
                  ? 'bg-[#1E88E5] text-white border-[#1E88E5]'
                  : ''
              }
            >
              {example.label}
            </MD3ChipBadge>
          ))}
        </div>

        {/* Active Example */}
        <ActiveComponent />
      </div>
    </div>
  );
};

export default MD3ExampleShowcase;
