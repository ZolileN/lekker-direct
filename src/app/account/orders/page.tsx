import { cookies } from 'next/headers';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { createClient } from '@/lib/supabase';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  paid: 'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-purple-50 text-purple-700 border-purple-200',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default async function OrdersPage() {
  cookies(); // opt into dynamic rendering
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const { data: orders } = await supabase
    .from('orders')
    .select(`
      id,
      order_number,
      total_amount,
      status,
      payment_status,
      created_at,
      order_items(id, product_title, quantity, unit_price)
    `)
    .eq('user_id', session!.user.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Your complete order history.</p>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No orders yet</h3>
          <p className="text-sm text-gray-500 mb-6">Once you place an order, it will appear here.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-semibold text-sm hover:bg-green-800 transition-all"
          >
            Start shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = order.status as string;
            const statusClass = statusColors[status] ?? 'bg-gray-50 text-gray-700 border-gray-200';
            const createdAt = new Date(order.created_at).toLocaleDateString('en-ZA', {
              day: 'numeric', month: 'long', year: 'numeric',
            });
            const itemCount = Array.isArray(order.order_items) ? order.order_items.length : 0;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{order.order_number}</p>
                      <p className="text-xs text-gray-500">{createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${statusClass}`}>
                      {status}
                    </span>
                    <span className="font-bold text-gray-900">
                      R{Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order items preview */}
                {Array.isArray(order.order_items) && order.order_items.length > 0 && (
                  <div className="border-t border-gray-50 pt-4 mt-4">
                    <div className="space-y-1.5">
                      {order.order_items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs text-gray-600">
                          <span className="truncate max-w-xs">{item.product_title}</span>
                          <span className="shrink-0 ml-2">x{item.quantity} · R{Number(item.unit_price).toFixed(2)}</span>
                        </div>
                      ))}
                      {itemCount > 2 && (
                        <p className="text-xs text-gray-400">+{itemCount - 2} more item{itemCount - 2 > 1 ? 's' : ''}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
