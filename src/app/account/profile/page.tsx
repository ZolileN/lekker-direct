'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Loader2, Save, CheckCircle } from 'lucide-react';

type Profile = {
  full_name: string;
  phone_number: string;
  shipping_address: {
    street: string;
    city: string;
    province: string;
    postal_code: string;
  } | null;
};

const PROVINCES = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Free State', 'Mpumalanga', 'Limpopo', 'North West', 'Northern Cape',
];

export default function ProfilePage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone_number: '',
    shipping_address: { street: '', city: '', province: '', postal_code: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('full_name, phone_number, shipping_address')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile({
          full_name: data.full_name ?? '',
          phone_number: data.phone_number ?? '',
          shipping_address: data.shipping_address ?? { street: '', city: '', province: '', postal_code: '' },
        });
      }
      setLoading(false);
    };
    loadProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        shipping_address: profile.shipping_address,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  const updateAddress = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      shipping_address: { ...(prev.shipping_address ?? {}), [field]: value } as Profile['shipping_address'],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your personal information and shipping address.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-5">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
                className={inputClass}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={profile.phone_number}
                onChange={(e) => setProfile((p) => ({ ...p, phone_number: e.target.value }))}
                className={inputClass}
                placeholder="+27 12 345 6789"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-5">Default Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
              <input
                type="text"
                value={profile.shipping_address?.street ?? ''}
                onChange={(e) => updateAddress('street', e.target.value)}
                className={inputClass}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input
                  type="text"
                  value={profile.shipping_address?.city ?? ''}
                  onChange={(e) => updateAddress('city', e.target.value)}
                  className={inputClass}
                  placeholder="Johannesburg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Province</label>
                <select
                  value={profile.shipping_address?.province ?? ''}
                  onChange={(e) => updateAddress('province', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select Province</option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code</label>
                <input
                  type="text"
                  value={profile.shipping_address?.postal_code ?? ''}
                  onChange={(e) => updateAddress('postal_code', e.target.value)}
                  className={inputClass}
                  placeholder="2000"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            id="save-profile-btn"
            className="flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white rounded-xl font-semibold text-sm hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save changes'}
          </button>
          {success && (
            <div className="flex items-center gap-1.5 text-green-700 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Saved!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
