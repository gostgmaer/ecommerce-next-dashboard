import Link from 'next/link';
export const metadata = {
  title: "Ecommerce Dashboard",
  description: "Created by kishor sarkar",
};
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">eCommerce Dashboard</h1>
        <nav className="flex gap-4">
          <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-800 transition font-medium">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition font-medium"
          >
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gray-50">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          Manage Your Store Like a Pro
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Powerful analytics, smart inventory management, and seamless order tracking — all in one dashboard.
        </p>
        <Link
          href="/register"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Trusted By */}
      <section className="py-10 bg-white px-6 text-center">
        <p className="text-gray-500 uppercase tracking-wide text-sm mb-6">Trusted by top brands</p>
        <div className="flex justify-center flex-wrap gap-10 opacity-80">
          <span className="text-xl font-semibold text-gray-600">Shopify</span>
          <span className="text-xl font-semibold text-gray-600">WooCommerce</span>
          <span className="text-xl font-semibold text-gray-600">Magento</span>
          <span className="text-xl font-semibold text-gray-600">BigCommerce</span>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-indigo-600 text-3xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">Product Management</h3>
            <p className="text-gray-600">Easily manage inventory, categories, and product details.</p>
          </div>
          <div>
            <div className="text-indigo-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Sales Analytics</h3>
            <p className="text-gray-600">Visualize sales performance with real-time insights and charts.</p>
          </div>
          <div>
            <div className="text-indigo-600 text-3xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
            <p className="text-gray-600">Track and fulfill customer orders with efficiency and transparency.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white px-6 text-center">
        <h3 className="text-3xl font-bold mb-10">How It Works</h3>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="text-4xl text-indigo-600 mb-4">📝</div>
            <h4 className="text-xl font-semibold mb-2">Sign Up</h4>
            <p className="text-gray-600">Create your free account in less than 2 minutes.</p>
          </div>
          <div>
            <div className="text-4xl text-indigo-600 mb-4">⚙️</div>
            <h4 className="text-xl font-semibold mb-2">Set Up</h4>
            <p className="text-gray-600">Add your products, branding, and preferences.</p>
          </div>
          <div>
            <div className="text-4xl text-indigo-600 mb-4">🚀</div>
            <h4 className="text-xl font-semibold mb-2">Launch</h4>
            <p className="text-gray-600">Start managing your business and watch it grow.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 px-6 text-center">
        <h3 className="text-3xl font-bold mb-10">What Our Users Say</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="italic text-gray-700">&quot; The dashboard made it so easy to track sales and manage products. Highly recommended! &quot;</p>
            <p className="mt-4 font-semibold text-indigo-600">— Sarah L., Online Retailer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="italic text-gray-700">&quot; I love how intuitive and fast it is. Everything I need to run my store is here &quot;</p>
            <p className="mt-4 font-semibold text-indigo-600">— Mark T., Fashion Brand Owner</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <footer className="text-center py-16 bg-white border-t border-gray-200">
        <h4 className="text-2xl font-bold mb-4">Ready to elevate your eCommerce business?</h4>
        <Link
          href="/auth/register"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition text-lg"
        >
          Create an Account Now
        </Link>
        <p className="mt-4 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
      </footer>
    </main>
  );
}
