import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-white mb-4">EcoPredict</h3>
            <p className="text-sm text-slate-400">AI-powered climate intelligence for a sustainable future.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="text-slate-400 hover:text-white transition">
                  Simulator
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-slate-400 hover:text-white transition">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  NASA
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  NOAA
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  IMD
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 EcoPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
