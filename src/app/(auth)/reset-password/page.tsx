'use client';

import { useState, useEffect, Suspense } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, KeyRound, CheckCircle, Eye, EyeOff } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    if (searchParams.get('type') === 'recovery') {
      setIsUpdateMode(true);
    }
  }, [searchParams]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/reset-password&type=recovery`,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/account');
      router.refresh();
    }
  };

  if (success && !isUpdateMode) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Email sent!</h2>
        <p className="text-sm text-gray-600">Check your inbox for a password reset link.</p>
        <Link href="/login" className="mt-4 inline-block text-sm text-green-700 font-semibold hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-4">
          <KeyRound className="w-6 h-6 text-green-700" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isUpdateMode ? 'Set new password' : 'Reset your password'}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isUpdateMode
            ? 'Enter your new password below.'
            : "Enter your email and we'll send you a reset link."}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      {isUpdateMode ? (
        <form onSubmit={handleUpdatePassword} className="space-y-5">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-700 text-white rounded-xl font-semibold text-sm hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRequestReset} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-700 text-white rounded-xl font-semibold text-sm hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link href="/login" className="font-semibold text-green-700 hover:text-green-800 transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-gray-500">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
