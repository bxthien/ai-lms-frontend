"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/hooks";
import { usersApi } from "@/lib/api";
import { ROUTES } from "@/config/constants";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName ?? "");
      setAvatarUrl(user.avatarUrl ?? "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Vui lòng đăng nhập để xem hồ sơ cá nhân.
          </p>
          <a
            href={ROUTES.LOGIN}
            className="inline-block font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Đăng nhập →
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await usersApi.updateMe({
        fullName: fullName.trim() || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
      });
      await refreshUser();
      setSuccess("Cập nhật hồ sơ thành công.");
    } catch (err) {
      console.error(err);
      setError("Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 lg:mr-80 px-4 pt-4 pb-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Hồ sơ cá nhân
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Quản lý thông tin tài khoản của bạn.
        </p>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-emerald-600">
                  {user.fullName?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Đăng nhập với
              </p>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {user.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Ảnh đại diện (URL)
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Dán link ảnh đại diện (tùy chọn). Sau này có thể hỗ trợ upload.
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {success && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {success}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    setFullName(user.fullName ?? "");
                    setAvatarUrl(user.avatarUrl ?? "");
                    setError(null);
                    setSuccess(null);
                  }
                }}
                className="px-4 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Hoàn tác
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
