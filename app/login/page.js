export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account? Sign up
        </p>
      </div>
    </div>
  );
}