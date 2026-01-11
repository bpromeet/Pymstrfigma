import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Trash2 } from "lucide-react";
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
} from "../ui/alert-dialog";

interface UserSettingsSectionProps {
  userLoginMethod: string;
  onLogout: () => void;
}

/**
 * UserSettingsSection - End User Settings
 * 
 * Displays:
 * - Account info (login method)
 * - Notification preferences
 * - App preferences
 * - Delete account action
 */
const UserSettingsSection: React.FC<UserSettingsSectionProps> = ({
  userLoginMethod,
  onLogout,
}) => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Account Info */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Login Method</Label>
            <p className="mt-1">{userLoginMethod}</p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive transaction confirmations via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about account activity
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone - Delete Account */}
      <Card className="rounded-2xl border-[#FF5914]">
        <CardHeader>
          <CardTitle className="text-[#FF5914]">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full min-h-12 rounded-full justify-start border-[#FF5914] text-[#FF5914] hover:bg-[#FF5914] hover:text-white transition-all duration-200"
              >
                <Trash2 className="w-[18px] h-[18px] mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#FF5914]">
                  Delete Account Permanently?
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-4 pt-2">
                  <p>
                    This action cannot be undone. This will permanently delete your account and remove all associated data.
                  </p>
                  <div className="bg-[#FF5914]/10 border border-[#FF5914] rounded-xl p-4 space-y-2">
                    <p className="font-semibold text-[#FF5914]">⚠️ Warning:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• All wallet data will be deleted</li>
                      <li>• Transaction history will be removed</li>
                      <li>• You will lose access to your funds if not withdrawn</li>
                      <li>• This action is irreversible</li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium">
                    Make sure to withdraw all funds before deleting your account.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full min-h-12">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onLogout}
                  className="rounded-full min-h-12 bg-[#FF5914] text-white hover:bg-[#E04D0F] transition-all duration-200"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingsSection;