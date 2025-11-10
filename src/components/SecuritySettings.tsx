import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import {
  Shield,
  Smartphone,
  Key,
  Monitor,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Trash2,
  Save,
  Download,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import PageLayout from "./PageLayout";

interface SecuritySettingsProps {
  onSave?: (settings: any) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSave }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Mock data for active sessions
  const [activeSessions, setActiveSessions] = useState([
    {
      id: "1",
      device: "Chrome on MacBook Pro",
      location: "New York, US",
      ipAddress: "192.168.1.1",
      lastActive: "2025-11-02T10:30:00Z",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone 15",
      location: "New York, US",
      ipAddress: "192.168.1.5",
      lastActive: "2025-11-02T08:15:00Z",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Firefox on Windows PC",
      location: "Los Angeles, US",
      ipAddress: "10.0.0.12",
      lastActive: "2025-11-01T22:45:00Z",
      isCurrent: false,
    },
  ]);

  // Mock data for login history
  const loginHistory = [
    {
      id: "1",
      timestamp: "2025-11-02T10:30:00Z",
      device: "Chrome on MacBook Pro",
      location: "New York, US",
      ipAddress: "192.168.1.1",
      status: "success",
    },
    {
      id: "2",
      timestamp: "2025-11-02T08:15:00Z",
      device: "Safari on iPhone 15",
      location: "New York, US",
      ipAddress: "192.168.1.5",
      status: "success",
    },
    {
      id: "3",
      timestamp: "2025-11-01T22:45:00Z",
      device: "Firefox on Windows PC",
      location: "Los Angeles, US",
      ipAddress: "10.0.0.12",
      status: "success",
    },
    {
      id: "4",
      timestamp: "2025-11-01T18:20:00Z",
      device: "Chrome on Unknown Device",
      location: "Unknown Location",
      ipAddress: "45.23.67.89",
      status: "failed",
    },
    {
      id: "5",
      timestamp: "2025-11-01T14:10:00Z",
      device: "Chrome on MacBook Pro",
      location: "New York, US",
      ipAddress: "192.168.1.1",
      status: "success",
    },
  ];

  // Mock data for security audit log
  const auditLog = [
    {
      id: "1",
      timestamp: "2025-11-02T10:30:00Z",
      action: "Login successful",
      ipAddress: "192.168.1.1",
      details: "Chrome on MacBook Pro",
    },
    {
      id: "2",
      timestamp: "2025-11-02T09:45:00Z",
      action: "Password changed",
      ipAddress: "192.168.1.1",
      details: "Password updated successfully",
    },
    {
      id: "3",
      timestamp: "2025-11-01T22:45:00Z",
      action: "New device login",
      ipAddress: "10.0.0.12",
      details: "Firefox on Windows PC",
    },
    {
      id: "4",
      timestamp: "2025-11-01T18:20:00Z",
      action: "Failed login attempt",
      ipAddress: "45.23.67.89",
      details: "Invalid credentials",
    },
    {
      id: "5",
      timestamp: "2025-11-01T16:30:00Z",
      action: "2FA enabled",
      ipAddress: "192.168.1.1",
      details: "Two-factor authentication activated",
    },
  ];

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("Please fill all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      toast.success("Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      setShowPasswordChange(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleRevokeSession = (sessionId: string) => {
    setActiveSessions(activeSessions.filter((s) => s.id !== sessionId));
    toast.success("Session revoked successfully");
  };

  const handleExportAuditLog = () => {
    toast.success("Audit log exported to CSV");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("iphone") || device.toLowerCase().includes("android")) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Shield className="w-6 h-6 text-[#07D7FF]" />}
        title="Security Settings"
        subtitle="Manage your account security and authentication"
      />

      <PageLayout.Content>
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p>Authenticator App (TOTP)</p>
                    {twoFactorEnabled && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
                        Enabled
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use an authenticator app to generate verification codes
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      toast.success(
                        checked
                          ? "Two-factor authentication enabled"
                          : "Two-factor authentication disabled"
                      );
                    }}
                  />
                </div>
              </div>

              {twoFactorEnabled && (
                <div className="p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl space-y-3 bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="text-sm">2FA is currently protecting your account</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => toast.info("Backup codes downloaded")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Backup Codes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => toast.info("Opening 2FA reconfiguration")}
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Reconfigure
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Management */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Password Management
              </CardTitle>
              <CardDescription>
                Change your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl">
                <div>
                  <p>Password</p>
                  <p className="text-sm text-muted-foreground">
                    Last changed 45 days ago
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="rounded-full"
                >
                  {showPasswordChange ? "Cancel" : "Change Password"}
                </Button>
              </div>

              {showPasswordChange && (
                <div className="p-4 border border-[#43586C] dark:border-[#43586C] rounded-xl space-y-4 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords({ ...passwords, current: e.target.value })
                        }
                        className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwords.new}
                        onChange={(e) =>
                          setPasswords({ ...passwords, new: e.target.value })
                        }
                        className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({ ...passwords, confirm: e.target.value })
                        }
                        className="rounded bg-[#EEEEEE] dark:bg-[#262626] border-[#43586C] dark:border-[#43586C]"
                      />
                    </div>
                    <Button
                      onClick={handlePasswordChange}
                      disabled={isSaving}
                      className="rounded-full w-full md:w-auto bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Manage devices that are currently logged into your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(session.device)}
                            <div>
                              <p>{session.device}</p>
                              {session.isCurrent && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            {session.location}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {session.ipAddress}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {formatTimestamp(session.lastActive)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {!session.isCurrent && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRevokeSession(session.id)}
                              className="rounded-full text-[#DD6B6B] hover:text-[#DD6B6B] hover:bg-[#DD6B6B]/10"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Revoke
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View - Cards */}
              <div className="md:hidden space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="border border-[#43586C] dark:border-[#43586C] rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(session.device)}
                        <div>
                          <p>{session.device}</p>
                          {session.isCurrent && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full text-xs mt-1">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {session.location}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-mono">{session.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(session.lastActive)}
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        className="rounded-full w-full text-[#DD6B6B] hover:text-[#DD6B6B] hover:bg-[#DD6B6B]/10 border-[#DD6B6B]"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Revoke Session
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Login History */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Login History
              </CardTitle>
              <CardDescription>
                Recent login attempts and activity on your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginHistory.map((login) => (
                      <TableRow key={login.id}>
                        <TableCell>{formatTimestamp(login.timestamp)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(login.device)}
                            {login.device}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            {login.location}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {login.ipAddress}
                        </TableCell>
                        <TableCell>
                          {login.status === "success" ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Success
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400 rounded-full">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View - Cards */}
              <div className="md:hidden space-y-3">
                {loginHistory.map((login) => (
                  <div key={login.id} className="border border-[#43586C] dark:border-[#43586C] rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(login.device)}
                        <div>
                          <p>{login.device}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatTimestamp(login.timestamp)}
                          </p>
                        </div>
                      </div>
                      {login.status === "success" ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Success
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400 rounded-full">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {login.location}
                      </div>
                      <div className="font-mono">{login.ipAddress}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Audit Log */}
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Audit Log
                  </CardTitle>
                  <CardDescription>
                    Complete history of security-related events
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportAuditLog}
                  className="rounded-full flex-shrink-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLog.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.ipAddress}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View - Cards */}
              <div className="md:hidden space-y-3">
                {auditLog.map((log) => (
                  <div key={log.id} className="border border-[#43586C] dark:border-[#43586C] rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <p>{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(log.timestamp)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {log.ipAddress}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default SecuritySettings;
