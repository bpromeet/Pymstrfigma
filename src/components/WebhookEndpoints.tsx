import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Send,
  Edit,
  Trash2,
  Check,
} from "lucide-react";
import { copyToClipboard } from "../utils/clipboard";

interface WebhookEndpoint {
  id: string;
  url: string;
  signingSecret: string;
  isActive: boolean;
  environment: "live" | "test";
  eventTypes: string[];
  createdAt: string;
}

interface WebhookEndpointsProps {
  endpoint?: WebhookEndpoint;
  onToggleActive?: (isActive: boolean) => void;
  onSendTest?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCopyUrl?: () => void;
  onCopySecret?: () => void;
  onRefreshSecret?: () => void;
}

export const WebhookEndpoints: React.FC<WebhookEndpointsProps> = ({
  endpoint = {
    id: "we_1234567890",
    url: "https://api.yourcompany.com/webhooks/pymstr",
    signingSecret: "whsec_K8JZ2mN9pQ4rT6vY8aB3cD5eF7gH9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5j",
    isActive: true,
    environment: "live",
    eventTypes: ["Payment Completed", "Payment Failed"],
    createdAt: "2025-01-15",
  },
  onToggleActive,
  onSendTest,
  onEdit,
  onDelete,
  onCopyUrl,
  onCopySecret,
  onRefreshSecret,
}) => {
  const [isActive, setIsActive] = useState(endpoint.isActive);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked);
    onToggleActive?.(checked);
  };

  const handleCopyUrl = () => {
    const success = copyToClipboard(endpoint.url);
    if (success) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
      onCopyUrl?.();
    }
  };

  const handleCopySecret = () => {
    const success = copyToClipboard(endpoint.signingSecret);
    if (success) {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
      onCopySecret?.();
    }
  };

  const truncateSecret = (secret: string) => {
    if (showSecret) return secret;
    // Show first 10 chars + dots: whsec_K8JZ••••••••••••••••
    return secret.substring(0, 10) + "••••••••••••••••";
  };

  return (
    <Card className="rounded-2xl bg-white dark:bg-[#303030] border-[#43586C]">
      <CardHeader className="space-y-1">
        {/* Status Badge + Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge
              className={`rounded-full px-3 py-1 ${
                isActive
                  ? "bg-[#032e15] text-[#05df72]"
                  : "bg-[#43586C]/20 text-[#798A9B]"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <Switch
              checked={isActive}
              onCheckedChange={handleToggleActive}
              className="data-[state=checked]:bg-[#1E88E5] data-[state=unchecked]:bg-[#43586C]"
            />
          </div>

          {/* Delete Icon Button */}
          <button
            onClick={onDelete}
            className="w-12 h-12 rounded-full bg-transparent hover:bg-[#FF5914]/10 text-[#FF5914] flex items-center justify-center transition-all duration-200"
            aria-label="Delete webhook endpoint"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <CardTitle className="text-[#F6F7F9]">Webhook Endpoint</CardTitle>
        <CardDescription className="text-[#798A9B]">
          Receive real-time notifications for payment events
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Webhook URL Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[#F6F7F9]">Webhook URL</Label>
            <Badge className="rounded-full px-3 py-1 bg-[#032e15] text-[#05df72]">
              {endpoint.environment}
            </Badge>
          </div>

          <div className="relative">
            <div className="rounded-lg bg-[#123653] border border-[#43586C] p-4 pr-14">
              <code className="text-[#07D7FF] break-all">
                {endpoint.url}
              </code>
            </div>
            <button
              onClick={handleCopyUrl}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent hover:bg-white/10 text-[#F6F7F9] flex items-center justify-center transition-all duration-200"
              aria-label="Copy webhook URL"
            >
              {copiedUrl ? (
                <Check className="w-[18px] h-[18px] text-[#7DD069]" />
              ) : (
                <Copy className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>
        </div>

        {/* Signing Secret Section */}
        <div className="space-y-2">
          <Label className="text-[#F6F7F9]">Signing Secret</Label>

          <div className="relative">
            <div className="rounded-lg bg-[#123653] border border-[#43586C] p-4 pr-28">
              <code className="text-[#07D7FF] break-all font-mono">
                {truncateSecret(endpoint.signingSecret)}
              </code>
            </div>

            {/* Icon Buttons */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* Toggle visibility */}
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="w-10 h-10 rounded-full bg-transparent hover:bg-white/10 text-[#F6F7F9] flex items-center justify-center transition-all duration-200"
                aria-label={showSecret ? "Hide secret" : "Show secret"}
              >
                {showSecret ? (
                  <EyeOff className="w-[18px] h-[18px]" />
                ) : (
                  <Eye className="w-[18px] h-[18px]" />
                )}
              </button>

              {/* Copy secret */}
              <button
                onClick={handleCopySecret}
                className="w-10 h-10 rounded-full bg-transparent hover:bg-white/10 text-[#F6F7F9] flex items-center justify-center transition-all duration-200"
                aria-label="Copy signing secret"
              >
                {copiedSecret ? (
                  <Check className="w-[18px] h-[18px] text-[#7DD069]" />
                ) : (
                  <Copy className="w-[18px] h-[18px]" />
                )}
              </button>

              {/* Refresh secret */}
              <button
                onClick={onRefreshSecret}
                className="w-10 h-10 rounded-full bg-transparent hover:bg-white/10 text-[#F6F7F9] flex items-center justify-center transition-all duration-200"
                aria-label="Refresh signing secret"
              >
                <RefreshCw className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Event Types Section */}
        <div className="space-y-2">
          <Label className="text-[#F6F7F9]">Event Types</Label>
          <div className="flex flex-wrap gap-2">
            {endpoint.eventTypes.map((eventType) => (
              <Badge
                key={eventType}
                className="rounded-full px-3 py-1 bg-[#43586C] text-[#F6F7F9]"
              >
                {eventType}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={onSendTest}
            className="flex-1 min-h-12 px-6 py-2.5 bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 rounded-full"
          >
            <Send className="w-[18px] h-[18px] mr-2" />
            Send Test
          </Button>

          <Button
            onClick={onEdit}
            className="flex-1 min-h-12 px-6 py-2.5 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200 rounded-full"
          >
            <Edit className="w-[18px] h-[18px] mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookEndpoints;
