import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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
} from "./ui/alert-dialog";
import { Webhook, Plus, Trash2, Copy, Check, RefreshCw, TestTube, Eye, EyeOff, Key } from "lucide-react";
import { toast } from "sonner@2.0.3";
import PageLayout from "./PageLayout";

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

export function WebhookManagement() {
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

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<WebhookEndpoint | null>(null);
  const [newWebhook, setNewWebhook] = useState({
    url: "",
    description: "",
    events: [] as string[],
    apiKeyId: "",
  });

  const [copiedSecret, setCopiedSecret] = useState<string | null>(null);
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
  const [selectedDelivery, setSelectedDelivery] = useState<WebhookDelivery | null>(null);

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
    setIsAddDialogOpen(false);
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
    setWebhooks(
      webhooks.map((wh) =>
        wh.id === id ? { ...wh, enabled: !wh.enabled } : wh
      )
    );
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
        onClick={() => setIsAddDialogOpen(true)}
        size={undefined}
        className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
      >
        <Plus className="w-[18px] h-[18px] mr-2" />
        Add Webhook
      </Button>
      
      {/* Add Webhook Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                          <div className="flex items-center gap-2">
                            <span>{key.name}</span>
                            <Badge variant={key.environment === "live" ? "default" : "secondary"} className="rounded-full text-xs">
                              {key.environment}
                            </Badge>
                          </div>
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
                onClick={() => setIsAddDialogOpen(false)}
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
                className="p-4 border rounded-3xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <code className="text-sm bg-muted px-3 py-1 rounded-full break-all">
                        {webhook.url}
                      </code>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={webhook.enabled ? "default" : "secondary"}
                          className="rounded-full"
                        >
                          {webhook.enabled ? "Active" : "Disabled"}
                        </Badge>
                        <div className="sm:hidden">
                          <Switch
                            checked={webhook.enabled}
                            onCheckedChange={() => toggleWebhook(webhook.id)}
                          />
                        </div>
                      </div>
                    </div>
                    {webhook.description && (
                      <p className="text-sm text-muted-foreground">{webhook.description}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Key className="w-3 h-3" />
                        <span>{mockApiKeys.find((k) => k.id === webhook.apiKeyId)?.name}</span>
                        <Badge 
                          variant={mockApiKeys.find((k) => k.id === webhook.apiKeyId)?.environment === "live" ? "default" : "secondary"} 
                          className="rounded-full text-xs"
                        >
                          {mockApiKeys.find((k) => k.id === webhook.apiKeyId)?.environment}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="rounded-full text-xs">
                          {WEBHOOK_EVENTS.find((e) => e.value === event)?.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Switch
                      checked={webhook.enabled}
                      onCheckedChange={() => toggleWebhook(webhook.id)}
                    />
                  </div>
                </div>

                {/* Secret */}
                <div className="bg-muted p-3 rounded-2xl space-y-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Signing Secret</p>
                    <code className="text-sm break-all">
                      {visibleSecrets.has(webhook.id) ? webhook.secret : maskSecret(webhook.secret)}
                    </code>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSecretVisibility(webhook.id)}
                      className="rounded-full"
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
                      className="rounded-full"
                    >
                      {copiedSecret === webhook.secret ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Regenerate Webhook Secret?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will generate a new signing secret. You'll need to update your
                            application with the new secret to verify webhook signatures.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                          <AlertDialogCancel className="rounded-full m-0">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRegenerateSecret(webhook.id)}
                            className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full m-0"
                          >
                            Regenerate
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestWebhook(webhook)}
                    className="rounded-full"
                  >
                    <TestTube className="w-4 h-4 mr-2" />
                    Send Test
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingWebhook(webhook)}
                        className="rounded-full"
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Webhook Endpoint</DialogTitle>
                        <DialogDescription>
                          Update your webhook endpoint configuration
                        </DialogDescription>
                      </DialogHeader>
                      {editingWebhook && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-webhook-api-key">API Key</Label>
                            <Select
                              value={editingWebhook.apiKeyId}
                              onValueChange={(value) =>
                                setEditingWebhook({ ...editingWebhook, apiKeyId: value })
                              }
                            >
                              <SelectTrigger className="rounded-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {mockApiKeys
                                  .filter((key) => key.status === "active")
                                  .map((key) => (
                                    <SelectItem key={key.id} value={key.id}>
                                      <div className="flex items-center gap-2">
                                        <span>{key.name}</span>
                                        <Badge variant={key.environment === "live" ? "default" : "secondary"} className="rounded-full text-xs">
                                          {key.environment}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-webhook-url">Endpoint URL</Label>
                            <Input
                              id="edit-webhook-url"
                              value={editingWebhook.url}
                              onChange={(e) =>
                                setEditingWebhook({ ...editingWebhook, url: e.target.value })
                              }
                              className="rounded-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-webhook-description">Description</Label>
                            <Input
                              id="edit-webhook-description"
                              value={editingWebhook.description}
                              onChange={(e) =>
                                setEditingWebhook({
                                  ...editingWebhook,
                                  description: e.target.value,
                                })
                              }
                              className="rounded-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Events to Subscribe</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-3xl">
                              {WEBHOOK_EVENTS.map((event) => (
                                <div key={event.value} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`edit-event-${event.value}`}
                                    checked={editingWebhook.events.includes(event.value)}
                                    onCheckedChange={() => toggleEventSelection(event.value, true)}
                                  />
                                  <label
                                    htmlFor={`edit-event-${event.value}`}
                                    className="text-sm cursor-pointer"
                                  >
                                    {event.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setEditingWebhook(null)}
                          className="rounded-full w-full sm:w-auto"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleUpdateWebhook}
                          className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full w-full sm:w-auto"
                        >
                          Update Webhook
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Trash2 className="w-4 h-4 text-[#DD6B6B]" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Webhook?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this webhook endpoint. This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="rounded-full m-0">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteWebhook(webhook.id)}
                          className="rounded-full bg-destructive hover:bg-destructive/90 m-0"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
        onClick={() => setIsAddDialogOpen(true)}
        aria-label="Add webhook"
        style={{ backgroundColor: '#1E88E5' }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <Plus className="w-6 h-6" />
      </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
}
