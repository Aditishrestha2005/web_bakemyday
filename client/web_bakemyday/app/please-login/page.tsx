import Link from "next/link";

export default function PleaseLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-4">
        Please log in
      </h1>

      <p className="text-gray-600 mb-6 text-center">
        Please log in or create an account
        to explore our delicious menu and
        place your order.
      </p>

      <Link
        href="/login"
        className="
          text-blue-600
          font-semibold
          hover:underline
        "
      >
        Log In →
      </Link>

    </div>
  );
}