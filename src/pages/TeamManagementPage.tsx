import { useState } from "react";
import {
  UsersRound,
  UserPlus,
  AlertCircle,
  UserX,
  UserCheck,
  Trash2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
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
import { toast } from "sonner@2.0.3";
import PageLayout from "../components/PageLayout";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  lastActive: string;
}

interface NewMemberForm {
  name: string;
  email: string;
  role: string;
}

interface MemberToDelete {
  id: string;
  name: string;
  email: string;
}

interface TeamManagementPageProps {
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  showAddMember: boolean;
  setShowAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  newMember: NewMemberForm;
  setNewMember: React.Dispatch<React.SetStateAction<NewMemberForm>>;
  handleAddTeamMember: () => void;
  handleDeleteMember: (memberId: string) => void;
}

export default function TeamManagementPage({
  teamMembers,
  setTeamMembers,
  showAddMember,
  setShowAddMember,
  newMember,
  setNewMember,
  handleAddTeamMember,
  handleDeleteMember,
}: TeamManagementPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberToDelete | null>(
    null
  );

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<UsersRound className="w-6 h-6 text-[#FF5914]" />}
        title="Team Management"
        subtitle="Invite and manage team members with role-based permissions"
      />
      <PageLayout.Content>
        <div className="space-y-6">
          {/* ========================================
          DESKTOP ACTION BUTTON (Left-aligned, below subtitle)
          
          Position: Top of content area, left-aligned
          Hidden on mobile (md:hidden) - mobile uses FAB instead
          ======================================== */}
          <Button
            onClick={() => setShowAddMember(true)}
            className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
          >
            <UserPlus className="w-[18px] h-[18px] mr-2" />
            Add Team Member
          </Button>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && memberToDelete && (
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span>Confirm Deletion</span>
                </CardTitle>
                <CardDescription className="text-red-700">
                  This action cannot be undone. This will
                  permanently remove the team member from your
                  workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-2xl">
                  <p className="font-medium text-gray-900">
                    {memberToDelete.name}
                  </p>
                  <p className="text-muted-foreground">
                    {memberToDelete.email}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setMemberToDelete(null);
                    }}
                    variant="outline"
                    className="flex-1 rounded-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteMember(memberToDelete.id);
                      setShowDeleteConfirm(false);
                      setMemberToDelete(null);
                    }}
                    className="flex-1 rounded-full bg-[#FF5914] text-white hover:bg-[#E54D0F]"
                  >
                    Delete Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Member Form */}
          {showAddMember && (
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle>Add Team Member</CardTitle>
                <CardDescription>
                  Invite a new team member to your workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) =>
                      setNewMember((prev) => ({
                        ...prev,
                        role: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view-only">
                        View Only
                      </SelectItem>
                      <SelectItem value="limited">
                        Limited
                      </SelectItem>
                      <SelectItem value="admin">
                        Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleAddTeamMember}
                    className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
                  >
                    Add Member
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddMember(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team Members List */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <UsersRound className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 dark:text-white mb-2">No team members yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first team member to get started</p>
                </div>
              ) : (
                <>
                  {/* Desktop: Table View */}
                  <div className="hidden md:block">
                    <Table className="table-fixed">
                      <TableHeader>
                        <TableRow className="border-b border-[#43586C] hover:bg-transparent">
                          <TableHead className="text-[#798A9B] w-[30%]">Member</TableHead>
                          <TableHead className="text-[#798A9B] w-[15%]">Role</TableHead>
                          <TableHead className="text-[#798A9B] w-[18%]">Status</TableHead>
                          <TableHead className="text-[#798A9B] w-[22%]">Last Active</TableHead>
                          <TableHead className="text-[#798A9B] w-[15%]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.id} className="border-b border-[#43586C]/30 hover:bg-transparent">
                            {/* Member Column */}
                            <TableCell className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1E88E5] text-white flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-medium">{member.avatar}</span>
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {member.name}
                                  </p>
                                  <p className="text-sm text-[#798A9B] truncate">
                                    {member.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            
                            {/* Role Column */}
                            <TableCell className="py-4">
                              <Select
                                value={member.role}
                                onValueChange={(value) => {
                                  setTeamMembers((prev) =>
                                    prev.map((m) =>
                                      m.id === member.id
                                        ? { ...m, role: value }
                                        : m
                                    )
                                  );
                                }}
                              >
                                <SelectTrigger className="w-full max-w-[110px] h-9 bg-transparent border-[#43586C] rounded">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="limited">Limited</SelectItem>
                                  <SelectItem value="view-only">View Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            
                            {/* Status Column */}
                            <TableCell className="py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  member.status === "active"
                                    ? "bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                                    : member.status === "pending"
                                    ? "bg-[#FFF3CD] text-[#856404] dark:bg-[#3d3000] dark:text-[#D9C370]"
                                    : "bg-[#43586C]/20 text-[#798A9B]"
                                }`}
                              >
                                {member.status}
                              </span>
                            </TableCell>
                            
                            {/* Last Active Column */}
                            <TableCell className="py-4 text-gray-900 dark:text-white">
                              {member.status === "pending" ? (
                                /* Resend Invite Button for Pending Members */
                                <Button
                                  variant="outline"
                                  className="h-8 px-3 rounded-full border-[#D9C370] text-[#D9C370] hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all duration-200"
                                  onClick={() => {
                                    toast.success(`Invitation resent to ${member.email}`);
                                  }}
                                  aria-label="Resend invitation"
                                >
                                  <span className="text-xs">Resend Invite</span>
                                </Button>
                              ) : (
                                /* Last Active Date for Active/Inactive Members */
                                new Date(member.lastActive).toLocaleDateString('en-US', {
                                  month: 'numeric',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                              )}
                            </TableCell>
                            
                            {/* Actions Column */}
                            <TableCell className="py-4">
                              <div className="flex items-center gap-2">
                                {/* Activate/Deactivate Button - Only for Active/Inactive Members */}
                                {member.status !== "pending" && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 rounded-full transition-all duration-200 ${
                                      member.status === "active"
                                        ? "hover:bg-orange-100 dark:hover:bg-orange-900/20"
                                        : "hover:bg-green-100 dark:hover:bg-green-900/20"
                                    }`}
                                    onClick={() => {
                                      setTeamMembers((prev) =>
                                        prev.map((m) =>
                                          m.id === member.id
                                            ? {
                                                ...m,
                                                status: m.status === "active" ? "inactive" : "active",
                                              }
                                            : m
                                        )
                                      );
                                      toast.success(
                                        member.status === "active"
                                          ? `${member.name} deactivated`
                                          : `${member.name} activated`
                                      );
                                    }}
                                    aria-label={member.status === "active" ? "Deactivate member" : "Activate member"}
                                  >
                                    {member.status === "active" ? (
                                      <UserX className="w-4 h-4 text-[#FF5914]" />
                                    ) : (
                                      <UserCheck className="w-4 h-4 text-[#7DD069]" />
                                    )}
                                  </Button>
                                )}
                                
                                {/* Delete Button - Always Available */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-200"
                                  onClick={() => {
                                    setMemberToDelete({
                                      id: member.id,
                                      name: member.name,
                                      email: member.email,
                                    });
                                    setShowDeleteConfirm(true);
                                  }}
                                  aria-label="Delete member"
                                >
                                  <Trash2 className="w-4 h-4 text-[#FF5914]" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

              {/* Mobile: Card View */}
              <div className="md:hidden space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="border border-[#43586C] rounded-2xl p-4 bg-white dark:bg-[#303030] space-y-4"
                  >
                    {/* Status Badge - Above Name */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "active"
                            ? "bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                            : member.status === "pending"
                            ? "bg-[#FFF3CD] text-[#856404] dark:bg-[#3d3000] dark:text-[#D9C370]"
                            : "bg-[#43586C]/20 text-[#798A9B]"
                        }`}
                      >
                        {member.status}
                      </span>
                      <span className="text-xs text-[#798A9B] capitalize">
                        {member.role === 'view-only' ? 'View Only' : member.role}
                      </span>
                    </div>

                    {/* Member Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#1E88E5] text-white flex items-center justify-center flex-shrink-0">
                        <span className="font-medium">{member.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {member.name}
                        </p>
                        <p className="text-sm text-[#798A9B] truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>

                    {/* Role Selector */}
                    <div className="space-y-2">
                      <Label className="text-[#798A9B] text-xs">Role</Label>
                      <Select
                        value={member.role}
                        onValueChange={(value) => {
                          setTeamMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id
                                ? { ...m, role: value }
                                : m
                            )
                          );
                        }}
                      >
                        <SelectTrigger className="w-full h-10 bg-transparent border-[#43586C] rounded">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="limited">Limited</SelectItem>
                          <SelectItem value="view-only">View Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Last Active */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#798A9B]">Last Active</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(member.lastActive).toLocaleDateString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#43586C]/30">
                      {/* Conditional Actions based on status */}
                      {member.status === "pending" ? (
                        /* Resend Invite for Pending Members */
                        <>
                          <Button
                            variant="outline"
                            className="flex-1 h-10 rounded-full border-[#D9C370] text-[#D9C370] hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all duration-200"
                            onClick={() => {
                              toast.success(`Invitation resent to ${member.email}`);
                            }}
                          >
                            Resend Invite
                          </Button>
                          {/* Delete Button */}
                          <Button
                            variant="outline"
                            className="flex-1 h-10 rounded-full border-[#FF5914] text-[#FF5914] hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-200"
                            onClick={() => {
                              setMemberToDelete({
                                id: member.id,
                                name: member.name,
                                email: member.email,
                              });
                              setShowDeleteConfirm(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </>
                      ) : (
                        /* Activate/Deactivate for Active/Inactive Members */
                        <>
                          <Button
                            variant="outline"
                            className={`flex-1 h-10 rounded-full transition-all duration-200 ${
                              member.status === "active"
                                ? "border-[#FF5914] text-[#FF5914] hover:bg-orange-100 dark:hover:bg-orange-900/20"
                                : "border-[#7DD069] text-[#7DD069] hover:bg-green-100 dark:hover:bg-green-900/20"
                            }`}
                            onClick={() => {
                              setTeamMembers((prev) =>
                                prev.map((m) =>
                                  m.id === member.id
                                    ? {
                                        ...m,
                                        status: m.status === "active" ? "inactive" : "active",
                                      }
                                    : m
                                )
                              );
                              toast.success(
                                member.status === "active"
                                  ? `${member.name} deactivated`
                                  : `${member.name} activated`
                              );
                            }}
                          >
                            {member.status === "active" ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </Button>
                          {/* Delete Button */}
                          <Button
                            variant="outline"
                            className="flex-1 h-10 rounded-full border-[#FF5914] text-[#FF5914] hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-200"
                            onClick={() => {
                              setMemberToDelete({
                                id: member.id,
                                name: member.name,
                                email: member.email,
                              });
                              setShowDeleteConfirm(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
              )}
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>

      {/* Mobile FAB - Add Team Member */}
      <button
        onClick={() => setShowAddMember(true)}
        className="md:hidden fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
        aria-label="Add team member"
      >
        <UserPlus className="w-6 h-6" />
      </button>
    </PageLayout>
  );
}