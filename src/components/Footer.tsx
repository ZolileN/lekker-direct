import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-yellow-400">LekkerDirect</span>
            </Link>
            <p className="text-green-100 mb-4">
              South Africa's favourite online store. Quality products, instant EFT payments, delivered to your door.
            </p>
            <p className="text-green-200 text-sm">
              © 2024 LekkerDirect. All rights reserved.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/electronics" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/fashion" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gadgets" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Gadgets
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/track-order" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Privacy Policy (POPIA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-green-100 hover:text-yellow-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment and Ownership Badges */}
        <div className="mt-8 pt-8 border-t border-green-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <span className="bg-green-700 px-3 py-1 rounded-full text-sm">Instant EFT</span>
              <span className="bg-green-700 px-3 py-1 rounded-full text-sm">Ozow</span>
              <span className="bg-green-700 px-3 py-1 rounded-full text-sm">SA Owned</span>
            </div>
            <div className="text-green-200 text-sm">
              Secure checkout powered by Ozow
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
