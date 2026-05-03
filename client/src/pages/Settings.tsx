import React, { useState, useEffect } from "react";
import { authClient, useSession } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Settings() {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  // Profile Form State
  const [name, setName] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete Account Form State
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!session) {
    navigate("/auth");
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await authClient.updateUser(
        {
          name: name,
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to update profile");
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      await authClient.changePassword(
        {
          newPassword,
          currentPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess: () => {
            toast.success("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to change password");
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsDeletingAccount(true);
    try {
      await authClient.deleteUser(
        {
          password: deletePassword,
        },
        {
          onSuccess: () => {
            toast.success("Account deleted successfully");
            navigate("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to delete account");
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

      {/* Profile Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={session.user.email}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-400 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">
              Email cannot be changed currently.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isUpdatingProfile}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUpdatingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Security</h2>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isChangingPassword}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isChangingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Password
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-slate-400 text-sm mb-6">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <form onSubmit={handleDeleteAccount} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password to Delete
            </label>
            <input
              type="password"
              required
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={isDeletingAccount}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeletingAccount && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}
