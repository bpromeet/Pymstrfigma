import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Webhook, Plus, Trash2, Copy, Check, RefreshCw, TestTube, Eye, EyeOff, Key } from "lucide-react";
import { toast } from "sonner@2.0.3";
import PageLayout from "../components/PageLayout";
import { WebhookEndpoints } from "../components/WebhookEndpoints";

interface APIKey {
  id: string;
  name: string;
  environment: 'test' | 'live';
  status: 'active' | 'inactive';
}

interface WebhookEndpoint {
  id: string;
  url: string;
  description: string;
  events: string[];
  enabled: boolean;
  secret: string;
  createdAt: string;
  apiKeyId: string;
}

interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  url: string;
  status: "success" | "failed" | "pending";
  responseCode?: number;
  timestamp: string;
  payload: any;
  response?: string;
  attempt: number;
}

const WEBHOOK_EVENTS = [
  { value: "payment.completed", label: "Payment Completed" },
  { value: "payment.failed", label: "Payment Failed" },
  { value: "payment.pending", label: "Payment Pending" },
  { value: "payment.expired", label: "Payment Expired" },
  { value: "refund.completed", label: "Refund Completed" },
  { value: "refund.failed", label: "Refund Failed" },
];

// Mock API keys - in production, these would be passed as props
const mockApiKeys: APIKey[] = [
  { id: "key_1", name: "Production API Key", environment: "live", status: "active" },
  { id: "key_2", name: "Staging API Key", environment: "test", status: "active" },
  { id: "key_3", name: "Development API Key", environment: "test", status: "active" },
];

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: "wh_1",
      url: "https://api.mystore.com/webhooks/pymstr",
      description: "Production webhook endpoint",
      events: ["payment.completed", "payment.failed"],
      enabled: true,
      secret: "whsec_K8JZxN2pqRvL4mT6wYhC9sE3",
      createdAt: "2025-10-15T10:30:00Z",
      apiKeyId: "key_1",
    },
    {
      id: "wh_2",
      url: "https://staging.mystore.com/webhooks/pymstr",
      description: "Staging environment",
      events: ["payment.completed", "payment.failed", "payment.pending"],
      enabled: false,
      secret: "whsec_B3mXp9QrLs2TnF7cZvG5aK1",
      createdAt: "2025-10-10T14:20:00Z",
      apiKeyId: "key_2",
    },
  ]);

  const [deliveries, setDeliveries] = useState<WebhookDelivery[]>([
    {
      id: "del_1",
      webhookId: "wh_1",
      event: "payment.completed",
      url: "https://api.mystore.com/webhooks/pymstr",
      status: "success",
      responseCode: 200,
      timestamp: "2025-10-21T08:45:00Z",
      payload: { payment_id: "pay_123", amount: "100.00", currency: "USDC" },
      response: "OK",
      attempt: 1,
    },
    {
      id: "del_2",
      webhookId: "wh_1",
      event: "payment.failed",
      url: "https://api.mystore.com/webhooks/pymstr",
      status: "failed",
      responseCode: 500,
      timestamp: "2025-10-21T07:30:00Z",
      payload: { payment_id: "pay_124", error: "Insufficient funds" },
      response: "Internal Server Error",
      attempt: 3,
    },
    {
      id: "del_3",
      webhookId: "wh_1",
      event: "payment.completed",
      url: "https://api.mystore.com/webhooks/pymstr",
      status: "success",
      responseCode: 200,
      timestamp: "2025-10-20T18:15:00Z",
      payload: { payment_id: "pay_125", amount: "50.00", currency: "USDT" },
      response: "OK",
      attempt: 1,
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedWebhookId, setSelectedWebhookId] = useState<string | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);
  const [newWebhook, setNewWebhook] = useState({ url: "", description: "", events: [] as string[], apiKeyId: "" });
  const [editingWebhook, setEditingWebhook] = useState<WebhookEndpoint | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<WebhookDelivery | null>(null);
  const [copiedSecret, setCopiedSecret] = useState<string | null>(null);
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const generateSecret = () => {
    return "whsec_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleAddWebhook = () => {
    if (!newWebhook.url || newWebhook.events.length === 0) {
      toast.error("Please provide a URL and select at least one event");
      return;
    }

    if (!newWebhook.apiKeyId) {
      toast.error("Please select an API key");
      return;
    }

    const webhook: WebhookEndpoint = {
      id: `wh_${webhooks.length + 1}`,
      url: newWebhook.url,
      description: newWebhook.description,
      events: newWebhook.events,
      enabled: true,
      secret: generateSecret(),
      createdAt: new Date().toISOString(),
      apiKeyId: newWebhook.apiKeyId,
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ url: "", description: "", events: [], apiKeyId: "" });
    setShowCreateDialog(false);
    toast.success("Webhook endpoint added successfully");
  };

  const handleUpdateWebhook = () => {
    if (!editingWebhook) return;

    setWebhooks(
      webhooks.map((wh) =>
        wh.id === editingWebhook.id ? editingWebhook : wh
      )
    );
    setEditingWebhook(null);
    toast.success("Webhook endpoint updated successfully");
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((wh) => wh.id !== id));
    toast.success("Webhook endpoint deleted");
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, enabled: !webhook.enabled } : webhook
    ));
    const webhook = webhooks.find(w => w.id === id);
    if (webhook) {
      toast.success(webhook.enabled ? 'Webhook deactivated' : 'Webhook activated');
    }
  };

  const handleCopySecret = (secret: string) => {
    // Fallback method that doesn't require Clipboard API permissions
    const textarea = document.createElement('textarea');
    textarea.value = secret;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopiedSecret(secret);
      toast.success("Secret copied to clipboard");
      setTimeout(() => setCopiedSecret(null), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const toggleSecretVisibility = (id: string) => {
    const newVisible = new Set(visibleSecrets);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleSecrets(newVisible);
  };

  const handleTestWebhook = (webhook: WebhookEndpoint) => {
    toast.success(`Test webhook sent to ${webhook.url}`);
    
    // Add a test delivery
    const testDelivery: WebhookDelivery = {
      id: `del_test_${Date.now()}`,
      webhookId: webhook.id,
      event: "payment.completed",
      url: webhook.url,
      status: "success",
      responseCode: 200,
      timestamp: new Date().toISOString(),
      payload: { test: true, payment_id: "pay_test_123", amount: "10.00", currency: "USDC" },
      response: "OK",
      attempt: 1,
    };
    
    setDeliveries([testDelivery, ...deliveries]);
  };

  const handleRetryDelivery = (delivery: WebhookDelivery) => {
    toast.success("Retrying webhook delivery...");
    
    // Update delivery status
    setDeliveries(
      deliveries.map((d) =>
        d.id === delivery.id
          ? { ...d, status: "success" as const, responseCode: 200, attempt: d.attempt + 1 }
          : d
      )
    );
  };

  const handleRegenerateSecret = (id: string) => {
    const newSecret = generateSecret();
    setWebhooks(
      webhooks.map((wh) =>
        wh.id === id ? { ...wh, secret: newSecret } : wh
      )
    );
    toast.success("Webhook secret regenerated");
  };

  const toggleEventSelection = (event: string, isEditing: boolean = false) => {
    if (isEditing && editingWebhook) {
      const events = editingWebhook.events.includes(event)
        ? editingWebhook.events.filter((e) => e !== event)
        : [...editingWebhook.events, event];
      setEditingWebhook({ ...editingWebhook, events });
    } else {
      const events = newWebhook.events.includes(event)
        ? newWebhook.events.filter((e) => e !== event)
        : [...newWebhook.events, event];
      setNewWebhook({ ...newWebhook, events });
    }
  };

  const maskSecret = (secret: string) => {
    return secret.substring(0, 10) + "••••••••••••••••";
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Webhook className="w-6 h-6 text-[#07D7FF]" />}
        title="Webhook Management"
        subtitle="Configure webhooks to receive real-time payment notifications"
      />
      <PageLayout.Content>
        <div className="space-y-6">
      
      {/* ========================================
          DESKTOP ACTION BUTTON (Left-aligned, below subtitle)
          
          Position: Top of content area, left-aligned
          Hidden on mobile (md:hidden) - mobile uses FAB instead
          ======================================== */}
      <Button 
        onClick={() => setShowCreateDialog(true)}
        size={undefined}
        className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
      >
        <Plus className="w-[18px] h-[18px] mr-2" />
        Add Webhook
      </Button>
      
      {/* Add Webhook Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Webhook Endpoint</DialogTitle>
              <DialogDescription>
                Configure a new webhook endpoint to receive event notifications
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-api-key">API Key *</Label>
                <Select
                  value={newWebhook.apiKeyId}
                  onValueChange={(value) => setNewWebhook({ ...newWebhook, apiKeyId: value })}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select an API key" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockApiKeys
                      .filter((key) => key.status === "active")
                      .map((key) => (
                        <SelectItem key={key.id} value={key.id}>
                          {key.name} ({key.environment})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Webhooks will be associated with this API key
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Endpoint URL *</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://api.example.com/webhooks/pymstr"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                  className="rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-description">Description</Label>
                <Input
                  id="webhook-description"
                  placeholder="Production webhook endpoint"
                  value={newWebhook.description}
                  onChange={(e) => setNewWebhook({ ...newWebhook, description: e.target.value })}
                  className="rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Events to Subscribe *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-3xl">
                  {WEBHOOK_EVENTS.map((event) => (
                    <div key={event.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`event-${event.value}`}
                        checked={newWebhook.events.includes(event.value)}
                        onCheckedChange={() => toggleEventSelection(event.value)}
                      />
                      <label
                        htmlFor={`event-${event.value}`}
                        className="text-sm cursor-pointer"
                      >
                        {event.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="rounded-full w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddWebhook}
                className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full w-full sm:w-auto"
              >
                Add Webhook
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Webhook Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Endpoints</CardTitle>
          <CardDescription>Manage your webhook endpoints and secrets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                onClick={() => {
                  setSelectedWebhook(webhook as any);
                  setShowDetailDialog(true);
                }}
                className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
              >
                {/* All Badges Row (TOP - Left aligned) */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge
                    variant={webhook.enabled ? "default" : "secondary"}
                    className={`rounded-full whitespace-nowrap ${
                      webhook.enabled
                        ? 'bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]'
                        : 'bg-[#43586C]/20 text-[#798A9B]'
                    }`}
                  >
                    {webhook.enabled ? "Active" : "Inactive"}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="rounded-full whitespace-nowrap"
                  >
                    {mockApiKeys.find((k) => k.id === webhook.apiKeyId)?.environment}
                  </Badge>
                  {webhook.events.slice(0, 2).map((event) => (
                    <Badge key={event} variant="outline" className="rounded-full text-xs">
                      {WEBHOOK_EVENTS.find((e) => e.value === event)?.label}
                    </Badge>
                  ))}
                  {webhook.events.length > 2 && (
                    <Badge variant="outline" className="rounded-full text-xs">
                      +{webhook.events.length - 2} more
                    </Badge>
                  )}
                </div>

                {/* Icon + Title Row */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                    <Webhook className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 dark:text-white truncate">
                      {webhook.description || 'Webhook Endpoint'}
                    </h4>
                    {/* Subtitle: Key + API Key name + badge */}
                    <div className="flex items-center gap-2 mt-1">
                      <Key className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {mockApiKeys.find((k) => k.id === webhook.apiKeyId)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* URL Preview */}
                <div className="flex items-center gap-2 mb-3 bg-[#FAFAFA] dark:bg-[#2E3C49] p-3 rounded-2xl border border-gray-200 dark:border-[#43586C]">
                  <code className="text-sm text-gray-900 dark:text-white truncate flex-1">
                    {webhook.url}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => { 
                      e.stopPropagation();
                      const textarea = document.createElement('textarea');
                      textarea.value = webhook.url;
                      textarea.style.position = 'fixed';
                      textarea.style.opacity = '0';
                      document.body.appendChild(textarea);
                      textarea.select();
                      try {
                        document.execCommand('copy');
                        setCopiedSecret(webhook.url);
                        toast.success('URL copied to clipboard');
                        setTimeout(() => setCopiedSecret(null), 2000);
                      } catch (err) {
                        toast.error('Failed to copy URL');
                      } finally {
                        document.body.removeChild(textarea);
                      }
                    }}
                    className="rounded-full h-8 w-8 p-0 flex-shrink-0"
                  >
                    {copiedSecret === webhook.url ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Created</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(webhook.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Last Triggered</p>
                    <p className="text-gray-900 dark:text-white">
                      {deliveries.find((d) => d.webhookId === webhook.id) 
                        ? new Date(deliveries.find((d) => d.webhookId === webhook.id)!.timestamp).toLocaleDateString()
                        : 'Never'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Deliveries</p>
                    <p className="text-gray-900 dark:text-white">
                      {deliveries.filter((d) => d.webhookId === webhook.id).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
                    <p className="text-gray-900 dark:text-white">
                      {(() => {
                        const webhookDeliveries = deliveries.filter((d) => d.webhookId === webhook.id);
                        if (webhookDeliveries.length === 0) return 'N/A';
                        const successful = webhookDeliveries.filter((d) => d.status === 'success').length;
                        return `${Math.round((successful / webhookDeliveries.length) * 100)}%`;
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>
            View webhook delivery attempts and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Attempt</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full">
                        {delivery.event}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs">{new URL(delivery.url).hostname}</code>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={delivery.status === "success" ? "default" : "destructive"}
                        className="rounded-full"
                      >
                        {delivery.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {delivery.responseCode && (
                        <span className="text-sm">{delivery.responseCode}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(delivery.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{delivery.attempt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedDelivery(delivery)}
                              className="rounded-full"
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Webhook Delivery Details</DialogTitle>
                              <DialogDescription>
                                Event: {selectedDelivery?.event}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedDelivery && (
                              <div className="space-y-4">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Endpoint</Label>
                                  <code className="text-sm block mt-1">{selectedDelivery.url}</code>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Status</Label>
                                  <div className="mt-1">
                                    <Badge
                                      variant={
                                        selectedDelivery.status === "success"
                                          ? "default"
                                          : "destructive"
                                      }
                                      className="rounded-full"
                                    >
                                      {selectedDelivery.status} - {selectedDelivery.responseCode}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Payload</Label>
                                  <pre className="mt-1 p-3 bg-muted rounded-2xl text-xs overflow-auto">
                                    {JSON.stringify(selectedDelivery.payload, null, 2)}
                                  </pre>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Response</Label>
                                  <p className="mt-1 text-sm">{selectedDelivery.response}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {delivery.status === "failed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRetryDelivery(delivery)}
                            className="rounded-full"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 border rounded-3xl space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="rounded-full">
                    {delivery.event}
                  </Badge>
                  <Badge
                    variant={delivery.status === "success" ? "default" : "destructive"}
                    className="rounded-full"
                  >
                    {delivery.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Endpoint</p>
                  <code className="text-xs">{new URL(delivery.url).hostname}</code>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(delivery.timestamp).toLocaleString()}
                  </span>
                  <span>Attempt {delivery.attempt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDelivery(delivery)}
                        className="rounded-full flex-1"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Webhook Delivery Details</DialogTitle>
                        <DialogDescription>Event: {selectedDelivery?.event}</DialogDescription>
                      </DialogHeader>
                      {selectedDelivery && (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Endpoint</Label>
                            <code className="text-sm block mt-1">{selectedDelivery.url}</code>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Status</Label>
                            <div className="mt-1">
                              <Badge
                                variant={
                                  selectedDelivery.status === "success" ? "default" : "destructive"
                                }
                                className="rounded-full"
                              >
                                {selectedDelivery.status} - {selectedDelivery.responseCode}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Payload</Label>
                            <pre className="mt-1 p-3 bg-muted rounded-2xl text-xs overflow-auto">
                              {JSON.stringify(selectedDelivery.payload, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Response</Label>
                            <p className="mt-1 text-sm">{selectedDelivery.response}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {delivery.status === "failed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRetryDelivery(delivery)}
                      className="rounded-full"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Integration Guide</CardTitle>
          <CardDescription>How to verify webhook signatures and configure endpoints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-[#FF5914] bg-orange-50 dark:bg-orange-950/20 rounded-r-2xl">
            <h4 className="flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-[#FF5914]" />
              API Key Connection
            </h4>
            <p className="text-sm text-muted-foreground">
              Each webhook endpoint is associated with an API key. Webhook events will only be sent for transactions created with the linked API key. This ensures proper security and event routing for multi-environment setups (production, staging, development).
            </p>
          </div>
          <div>
            <h4 className="mb-2">Verifying Webhook Signatures</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Each webhook request includes a signature in the <code>X-PYMSTR-Signature</code>{" "}
              header. Use your webhook secret to verify the signature and ensure the request is
              from PYMSTR.
            </p>
            <div className="bg-muted p-4 rounded-2xl">
              <pre className="text-xs overflow-auto">
{`// Node.js example
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return hmac === signature;
}

// Express.js endpoint
app.post('/webhooks/pymstr', (req, res) => {
  const signature = req.headers['x-pymstr-signature'];
  const isValid = verifyWebhook(req.body, signature, WEBHOOK_SECRET);
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook event
  const event = req.body;
  console.log('Received event:', event.type);
  
  res.status(200).send('OK');
});`}
              </pre>
            </div>
          </div>
          <div>
            <h4 className="mb-2">Webhook Payload Structure</h4>
            <div className="bg-muted p-4 rounded-2xl">
              <pre className="text-xs overflow-auto">
{`{
  "event": "payment.completed",
  "timestamp": "2025-10-21T10:30:00Z",
  "data": {
    "payment_id": "pay_123abc",
    "merchant_id": "merch_456def",
    "price": "100.00",
    "currency": "USDC",
    "chain": "ethereum",
    "status": "completed",
    "customer": {
      "wallet_address": "0x1234...5678"
    }
  }
}`}
              </pre>
            </div>
          </div>
          <div>
            <h4 className="mb-2">Retry Policy</h4>
            <p className="text-sm text-muted-foreground">
              If your endpoint returns a non-2xx status code, PYMSTR will retry the webhook with
              exponential backoff:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1">
              <li>1st retry: after 1 minute</li>
              <li>2nd retry: after 5 minutes</li>
              <li>3rd retry: after 30 minutes</li>
              <li>Final retry: after 2 hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ========================================
          MD3 MOBILE FAB (Bottom-Right)
          
          Position: fixed bottom-24 right-6 (96px from bottom, 24px from right)
          Note: bottom-24 positions FAB above 80px bottom nav with 16px spacing
          Size: w-14 h-14 (56px × 56px - MD3 standard)
          Color: #1E88E5 (PYMSTR primary blue - MD3 primary color role)
          Icon: Plus (w-6 h-6 / 24px) - MD3 standard "add" action icon
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
          Opens Add Webhook dialog
          ======================================== */}
      <button
        onClick={() => setShowCreateDialog(true)}
        aria-label="Add webhook"
        style={{ backgroundColor: '#1E88E5' }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Webhook Detail Modal */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedWebhook && (() => {
            const webhook = webhooks.find(w => w.id === (selectedWebhook as any).id);
            if (!webhook) return null;
            
            const associatedKey = mockApiKeys.find(k => k.id === webhook.apiKeyId);
            const webhookDeliveries = deliveries.filter(d => d.webhookId === webhook.id);
            const successfulDeliveries = webhookDeliveries.filter(d => d.status === 'success').length;
            const successRate = webhookDeliveries.length > 0 
              ? Math.round((successfulDeliveries / webhookDeliveries.length) * 100) 
              : 0;

            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Webhook className="w-5 h-5" />
                    <span>{webhook.description || 'Webhook Endpoint'}</span>
                  </DialogTitle>
                  <DialogDescription>
                    <Key className="w-3 h-3 text-gray-600 dark:text-gray-400 inline mr-2" />
                    {associatedKey?.name}
                  </DialogDescription>
                </DialogHeader>
                
                {/* Badges moved outside DialogDescription to fix HTML nesting */}
                <div className="flex items-center gap-2 flex-wrap mt-4">
                  <Badge
                    variant={webhook.enabled ? "default" : "secondary"}
                    className={`rounded-full ${
                      webhook.enabled
                        ? 'bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]'
                        : 'bg-[#43586C]/20 text-[#798A9B]'
                    }`}
                  >
                    {webhook.enabled ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline" className="rounded-full">
                    {associatedKey?.environment}
                  </Badge>
                  {/* Subscribed Events Badges */}
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="outline" className="rounded-full">
                      {WEBHOOK_EVENTS.find(e => e.value === event)?.label}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-6 py-4">
                  {/* Action Buttons Row - Under Subtitle */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
                    {/* Activate/Deactivate */}
                    <Button
                      onClick={() => toggleWebhook(webhook.id)}
                      size="sm"
                      className={`rounded-full transition-all duration-200 w-full sm:w-auto flex-shrink-0 ${
                        webhook.enabled
                          ? 'bg-transparent border border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <span className="truncate">{webhook.enabled ? 'Deactivate' : 'Activate'}</span>
                    </Button>

                    {/* Regenerate Secret */}
                    <Button
                      onClick={() => {
                        handleRegenerateSecret(webhook.id);
                        setVisibleSecrets(new Set([...visibleSecrets, webhook.id]));
                      }}
                      size="sm"
                      variant="outline"
                      className="rounded-full w-full sm:w-auto flex-shrink-0"
                    >
                      <RefreshCw className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Regenerate</span>
                    </Button>

                    {/* Send Test */}
                    <Button
                      onClick={() => handleTestWebhook(webhook)}
                      size="sm"
                      variant="outline"
                      className="rounded-full w-full sm:w-auto flex-shrink-0"
                    >
                      <TestTube className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Test</span>
                    </Button>

                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full border-[#FF5914] text-[#FF5914] hover:bg-[#FF5914] hover:text-white transition-all duration-200 w-full sm:w-auto flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-[95vw] sm:max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Webhook Endpoint?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. You will stop receiving webhook notifications at this endpoint.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDeleteWebhook(webhook.id);
                              setShowDetailDialog(false);
                            }}
                            className="bg-[#FF5914] text-white hover:bg-[#E64D0F] rounded-full"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Webhook Info */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">API Key</Label>
                      <div className="flex items-center gap-2 mt-1 p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-2xl border border-gray-200 dark:border-[#43586C] overflow-hidden min-w-0">
                        <Key className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white truncate flex-1 min-w-0">
                          {associatedKey?.name}
                        </span>
                        <Badge variant="outline" className="rounded-full text-xs flex-shrink-0">
                          {associatedKey?.environment}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">Endpoint URL</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 min-w-0 p-3 bg-[#2E3C49] dark:bg-[#2E3C49] rounded-2xl border border-[#43586C] dark:border-[#43586C] overflow-hidden">
                          <code className="text-sm text-white dark:text-white break-all">
                            {webhook.url}
                          </code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { 
                            e.stopPropagation();
                            const textarea = document.createElement('textarea');
                            textarea.value = webhook.url;
                            textarea.style.position = 'fixed';
                            textarea.style.opacity = '0';
                            document.body.appendChild(textarea);
                            textarea.select();
                            try {
                              document.execCommand('copy');
                              setCopiedSecret(webhook.url);
                              toast.success('URL copied to clipboard');
                              setTimeout(() => setCopiedSecret(null), 2000);
                            } catch (err) {
                              toast.error('Failed to copy URL');
                            } finally {
                              document.body.removeChild(textarea);
                            }
                          }}
                          className="rounded-full h-10 w-10 p-0 flex-shrink-0"
                        >
                          {copiedSecret === webhook.url ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">Signing Secret</Label>
                      <div className="flex items-center gap-2 mt-1 min-w-0 overflow-hidden">
                        <div className="flex-1 min-w-0 p-3 bg-[#2E3C49] dark:bg-[#2E3C49] rounded-2xl border border-[#43586C] dark:border-[#43586C] overflow-hidden">
                          <code className="text-sm text-white dark:text-white break-all">
                            {visibleSecrets.has(webhook.id) ? webhook.secret : maskSecret(webhook.secret)}
                          </code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSecretVisibility(webhook.id)}
                          className="rounded-full h-10 w-10 p-0 flex-shrink-0"
                        >
                          {visibleSecrets.has(webhook.id) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopySecret(webhook.secret)}
                          className="rounded-full h-10 w-10 p-0 flex-shrink-0"
                        >
                          {copiedSecret === webhook.secret ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-2xl border border-gray-200 dark:border-[#43586C]">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Deliveries</p>
                      <p className="text-xl text-gray-900 dark:text-white mt-1">
                        {webhookDeliveries.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="text-xl text-gray-900 dark:text-white mt-1">
                        {webhookDeliveries.length > 0 ? `${successRate}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Created</p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {new Date(webhook.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Last Triggered</p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {webhookDeliveries.length > 0 
                          ? new Date(webhookDeliveries[0].timestamp).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
}