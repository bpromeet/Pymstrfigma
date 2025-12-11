import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Key, Plus, Copy, CheckCircle, AlertCircle, Shield, Pause, Play, Trash2, Globe, Activity, ExternalLink, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import PageLayout from './PageLayout';

interface APIKey {
  id: string;
  name: string;
  key: string;
  environment: 'test' | 'live';
  status: 'active' | 'inactive';
  createdAt: string;
  lastUsed: string | null;
  totalCalls: number;
  permissions: string[];
  ipWhitelist: string[];
  rateLimit: { perMinute: number; perHour: number };
}

interface APIKeyManagementProps {
  apiKeys: APIKey[];
  onCreateKey: (key: Omit<APIKey, 'id' | 'key' | 'createdAt' | 'lastUsed' | 'totalCalls' | 'status'>) => { key: string };
  onUpdateKey: (id: string, updates: Partial<APIKey>) => void;
  onDeleteKey: (id: string) => void;
  onNavigateToQuickStart?: () => void;
  onNavigateToAPIReference?: () => void;
}

const APIKeyManagement: React.FC<APIKeyManagementProps> = ({ apiKeys, onCreateKey, onUpdateKey, onDeleteKey, onNavigateToQuickStart, onNavigateToAPIReference }) => {
  const [showCreateApiKey, setShowCreateApiKey] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    environment: 'test' as const,
    permissions: ['read_payments'] as string[],
    ipWhitelist: '',
    rateLimit: { perMinute: 100, perHour: 1000 }
  });
  const [showApiKeySecret, setShowApiKeySecret] = useState<string | null>(null);
  const [apiKeyDetailsTab, setApiKeyDetailsTab] = useState('info');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Check URL parameters on mount to auto-open create dialog
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('create=true')) {
      setShowCreateApiKey(true);
      // Clean up the URL parameter
      window.history.replaceState(null, '', window.location.pathname + '#/api-keys');
    }
  }, []);

  const handleCreateApiKey = () => {
    if (!newApiKey.name) {
      toast('Please enter a name for the API key');
      return;
    }

    const result = onCreateKey({
      name: newApiKey.name,
      environment: newApiKey.environment,
      permissions: newApiKey.permissions,
      ipWhitelist: newApiKey.ipWhitelist ? newApiKey.ipWhitelist.split(',').map(ip => ip.trim()).filter(ip => ip) : [],
      rateLimit: newApiKey.rateLimit
    });

    setShowApiKeySecret(result.key);
    setShowCreateApiKey(false);
    setNewApiKey({
      name: '',
      environment: 'test',
      permissions: ['read_payments'],
      ipWhitelist: '',
      rateLimit: { perMinute: 100, perHour: 1000 }
    });
    toast('API key created successfully!');
  };

  const handleToggleApiKeyStatus = (keyId: string) => {
    const key = apiKeys.find(k => k.id === keyId);
    if (key) {
      onUpdateKey(keyId, { status: key.status === 'active' ? 'inactive' : 'active' });
      toast('API key status updated!');
    }
  };

  const handleDeleteApiKey = (keyId: string) => {
    onDeleteKey(keyId);
    setSelectedApiKey(null);
    toast('API key deleted successfully!');
  };

  const handleUpdateWhitelist = (keyId: string, type: 'ip', value: string) => {
    const list = value.split(',').map(item => item.trim()).filter(item => item);
    onUpdateKey(keyId, { ipWhitelist: list });
    toast('IP whitelist updated!');
  };

  const handleTogglePermission = (keyId: string, permission: string) => {
    const key = apiKeys.find(k => k.id === keyId);
    if (key) {
      const hasPermission = key.permissions.includes(permission);
      const newPermissions = hasPermission 
        ? key.permissions.filter(p => p !== permission)
        : [...key.permissions, permission];
      onUpdateKey(keyId, { permissions: newPermissions });
    }
  };

  const formatKey = (key: string) => {
    // Show first 6 chars ... last 4 chars (standard pattern)
    if (key.length <= 10) return key;
    return `${key.substring(0, 6)}...${key.substring(key.length - 4)}`;
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
      setCopiedKey(text);
      toast('Copied to clipboard!');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      toast('Failed to copy to clipboard');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const selectedKey = apiKeys.find(k => k.id === selectedApiKey);

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Key className="w-6 h-6 text-[#FF5914]" />}
        title="API Configuration"
        subtitle="Manage API keys and integration settings"
      />
      <PageLayout.Content>
        <div className="space-y-6">

      {/* ========================================
          DESKTOP ACTION BUTTON (Left-aligned, below subtitle)
          
          Position: Top of content area, left-aligned
          Hidden on mobile (md:hidden) - mobile uses FAB instead
          ======================================== */}
      <Button 
        onClick={() => setShowCreateApiKey(true)}
        size={undefined}
        className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
      >
        <Plus className="w-[18px] h-[18px] mr-2" />
        Create API Key
      </Button>

      {/* Show API Key Secret Dialog */}
      {showApiKeySecret && (
        <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Save Your API Key Now!</span>
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              This is the only time you'll see this key. Store it securely!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 border-2 border-green-300 dark:border-green-800">
              <Label className="text-gray-900 dark:text-white mb-2">Your New API Key</Label>
              <div className="flex space-x-2 mt-2">
                <Input 
                  value={showApiKeySecret} 
                  readOnly 
                  className="font-mono text-sm bg-gray-50 dark:bg-gray-900 rounded-full"
                />
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(showApiKeySecret)}
                  className="rounded-full"
                >
                  {copiedKey === showApiKeySecret ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <Alert className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <AlertDescription className="text-orange-700 dark:text-orange-300">
                Make sure to copy your API key now. You won't be able to see it again!
              </AlertDescription>
            </Alert>
            <Button onClick={() => setShowApiKeySecret(null)} className="w-full rounded-full">
              I've Saved My Key
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create API Key Dialog */}
      <Dialog open={showCreateApiKey} onOpenChange={setShowCreateApiKey}>
        <DialogContent 
          className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#303030] shadow-xl p-8"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl">Create New API Key</DialogTitle>
            <DialogDescription>Generate a new API key for your integration</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder="e.g., Production - Main Website"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey(prev => ({ ...prev, name: e.target.value }))}
                className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Select 
                value={newApiKey.environment} 
                onValueChange={(value: 'test' | 'live') => setNewApiKey(prev => ({ ...prev, environment: value }))}
              >
                <SelectTrigger id="environment" className="w-full h-12 rounded bg-transparent border border-[#43586C] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white dark:bg-[#262626] shadow-md">
                  <SelectItem value="test" className="h-12 px-4 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] cursor-pointer">Test</SelectItem>
                  <SelectItem value="live" className="h-12 px-4 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08] cursor-pointer">Live (Production)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="space-y-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-2xl p-4 border border-[#43586C]">
                {[
                  { id: 'read_payments', label: 'Read payments' },
                  { id: 'create_payment_links', label: 'Create payment links' },
                  { id: 'receive_webhooks', label: 'Receive webhooks' }
                ].map((perm) => (
                  <div key={perm.id} className="flex items-center gap-2">
                    <Switch
                      id={perm.id}
                      checked={newApiKey.permissions.includes(perm.id)}
                      onCheckedChange={(checked) => {
                        setNewApiKey(prev => ({
                          ...prev,
                          permissions: checked 
                            ? [...prev.permissions, perm.id]
                            : prev.permissions.filter(p => p !== perm.id)
                        }));
                      }}
                      className="data-[state=checked]:bg-[#1E88E5] data-[state=unchecked]:bg-[#43586C]"
                    />
                    <Label htmlFor={perm.id} className="cursor-pointer">{perm.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ip-whitelist">IP Whitelist (Optional)</Label>
              <Input
                id="ip-whitelist"
                placeholder="192.168.1.1, 10.0.0.5"
                value={newApiKey.ipWhitelist}
                onChange={(e) => setNewApiKey(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                className="w-full h-12 px-4 py-3 rounded bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
              />
              <p className="text-sm text-[#798A9B]">Comma-separated IP addresses</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleCreateApiKey}
                className="w-full sm:w-auto min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 rounded-full"
              >
                <Key className="w-[18px] h-[18px] mr-2" />
                Generate API Key
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateApiKey(false);
                  setNewApiKey({
                    name: '',
                    environment: 'test',
                    permissions: ['read_payments'],
                    ipWhitelist: '',
                    rateLimit: { perMinute: 100, perHour: 1000 }
                  });
                }}
                className="w-full sm:w-auto min-h-12 px-6 py-2.5 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200 rounded-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>Manage and monitor your API keys</CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">No API keys yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first API key to get started</p>
              <Button 
                onClick={() => setShowCreateApiKey(true)}
                className="min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 rounded-full"
              >
                <Plus className="w-[18px] h-[18px] mr-2" />
                Create API Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div 
                  key={key.id} 
                  className="border rounded-3xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedApiKey(key.id)}
                >
                  {/* Badges at top left */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge 
                      variant={key.status === 'active' ? 'default' : 'secondary'}
                      className={`rounded-full whitespace-nowrap ${
                        key.status === 'active' 
                          ? 'bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]' 
                          : 'bg-[#43586C]/20 text-[#798A9B]'
                      }`}
                    >
                      {key.status}
                    </Badge>
                    <Badge variant="outline" className="rounded-full whitespace-nowrap">
                      {key.environment}
                    </Badge>
                  </div>

                  {/* Title and API key below badges */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                      <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 dark:text-white truncate">{key.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">{formatKey(key.key)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Created</p>
                      <p className="text-gray-900 dark:text-white">{new Date(key.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Last Used</p>
                      <p className="text-gray-900 dark:text-white">
                        {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Total Calls</p>
                      <p className="text-gray-900 dark:text-white">{key.totalCalls.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Security</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        {key.ipWhitelist.length > 0 && (
                          <Badge variant="outline" className="text-xs rounded-full px-1.5 py-0">
                            <Globe className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Key Details Dialog */}
      <Dialog open={!!selectedApiKey} onOpenChange={() => setSelectedApiKey(null)}>
        <DialogContent 
          className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Key className="w-5 h-5" />
              <span>{selectedKey?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Manage API key settings and view activity
            </DialogDescription>
          </DialogHeader>

          {selectedKey && (
            <div className="space-y-6">
              <Tabs value={apiKeyDetailsTab} onValueChange={setApiKeyDetailsTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 mt-4 min-h-[500px]">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex space-x-2">
                      <Input 
                        value={formatKey(selectedKey.key)} 
                        readOnly 
                        className="font-mono text-sm bg-gray-50 dark:bg-gray-900 rounded-full"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => copyToClipboard(selectedKey.key)}
                        className="rounded-full"
                      >
                        {copiedKey === selectedKey.key ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click copy to reveal and copy the full key
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Environment</Label>
                      <Badge variant="outline" className="rounded-full">
                        {selectedKey.environment}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Badge 
                        variant={selectedKey.status === 'active' ? 'default' : 'secondary'}
                        className={`rounded-full ${
                          selectedKey.status === 'active' 
                            ? 'bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]' 
                            : 'bg-[#43586C]/20 text-[#798A9B]'
                        }`}
                      >
                        {selectedKey.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2 bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                      {[
                        { id: 'read_payments', label: 'Read payments' },
                        { id: 'create_payment_links', label: 'Create payment links' },
                        { id: 'receive_webhooks', label: 'Receive webhooks' }
                      ].map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Switch
                            id={`${selectedKey.id}-${perm.id}`}
                            checked={selectedKey.permissions.includes(perm.id)}
                            onCheckedChange={() => handleTogglePermission(selectedKey.id, perm.id)}
                          />
                          <Label htmlFor={`${selectedKey.id}-${perm.id}`}>{perm.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Rate Limit</Label>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedKey.rateLimit.perMinute} requests per minute
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedKey.rateLimit.perHour} requests per hour
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4 mt-4 min-h-[500px]">
                  <div className="space-y-2">
                    <Label>IP Whitelist</Label>
                    <Textarea
                      placeholder="192.168.1.1, 10.0.0.5"
                      value={selectedKey.ipWhitelist.join(', ')}
                      onChange={(e) => handleUpdateWhitelist(selectedKey.id, 'ip', e.target.value)}
                      className="rounded-3xl text-sm"
                      rows={3}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comma-separated IP addresses
                    </p>
                  </div>

                  <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                      Whitelist restrictions provide an extra layer of security for your API keys
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4 mt-4 min-h-[500px]">
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                      <h4 className="text-gray-900 dark:text-white mb-4">Recent Activity</h4>
                      <div className="space-y-3">
                        {selectedKey.lastUsed ? (
                          <>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Last API call</span>
                              <span className="text-gray-900 dark:text-white">
                                {new Date(selectedKey.lastUsed).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Total calls</span>
                              <span className="text-gray-900 dark:text-white">
                                {selectedKey.totalCalls.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Created</span>
                              <span className="text-gray-900 dark:text-white">
                                {new Date(selectedKey.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <Activity className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                            <p className="text-gray-600 dark:text-gray-400">No activity yet</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                              This key has not been used
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator />

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleToggleApiKeyStatus(selectedKey.id)}
                  className={`rounded-full ${
                    selectedKey.status === 'active' 
                      ? 'text-orange-600 hover:text-orange-700' 
                      : 'text-green-600 hover:text-green-700'
                  }`}
                >
                  {selectedKey.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteApiKey(selectedKey.id)}
                  className="text-red-600 hover:text-red-700 rounded-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Key
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Integration guides and API reference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 rounded-full"
              onClick={() => onNavigateToQuickStart?.()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Quick Start Guide</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 rounded-full"
              onClick={() => onNavigateToAPIReference?.()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>API Reference</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 rounded-full"
              onClick={() => onNavigateToAPIReference?.()}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Code Examples</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ========================================
          MD3 MOBILE FAB (Bottom-Right)
          
          Position: fixed bottom-24 right-6 (96px from bottom, 24px from right)
          Note: bottom-24 positions FAB above 80px bottom nav with 16px spacing
          Size: w-14 h-14 (56px × 56px - MD3 standard)
          Color: #07D7FF (PYMSTR secondary/cyan)
          Icon: w-6 h-6 (24px)
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
          Opens Create API Key dialog
          ======================================== */}
      <button
        onClick={() => setShowCreateApiKey(true)}
        aria-label="Create API key"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <Key className="w-6 h-6" />
      </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default APIKeyManagement;