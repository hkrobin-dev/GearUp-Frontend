"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Pencil,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { useUpdateProfile } from "@/lib/api/auth";

export default function CustomerProfilePage() {
  const { user } = useAuthStore();
  const updateProfile = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  // Keep form data synchronized with the authenticated user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      phone?: string;
    } = {};

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.name =
        "Full name must be at least 2 characters.";
    }

    if (trimmedPhone && !/^[0-9+\-\s()]{7,20}$/.test(trimmedPhone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await updateProfile.mutateAsync({
        name: formData.name.trim(),
        phone: formData.phone.trim() || undefined,
      });

      toast.success("Profile updated successfully.");

      setIsEditing(false);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile.";

      toast.error(message);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    setFormData({
      name: user.name ?? "",
      phone: user.phone ?? "",
    });

    setErrors({});
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Unable to load profile information.
        </p>
      </div>
    );
  }

  const isSaving = updateProfile.isPending;

  return (
    <div className="container mx-auto w-full space-y-6 px-4 sm:px-6 lg:px-8 ">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account information and profile details.
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="bg-emerald-50 px-6 py-8 dark:bg-emerald-950/30">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {user.email}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                Customer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
      >
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update your personal information.
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing || isSaving}
                required
                aria-invalid={!!errors.name}
                className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-800/60 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-600"
                }`}
              />
            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-3 text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-400"
              />
            </div>

            <p className="mt-1.5 text-xs text-slate-400">
              Email address cannot be changed.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Phone Number
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing || isSaving}
                placeholder="Enter your phone number"
                aria-invalid={!!errors.phone}
                className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-800/60 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-600"
                }`}
              />
            </div>

            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Account Role
            </label>

            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="role"
                type="text"
                value="Customer"
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-3 text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* Account Status */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Account Status
        </h2>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Account
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your current account status
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
            {user.status || "ACTIVE"}
          </span>
        </div>
      </div>
    </div>
  );
}