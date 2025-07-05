import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        <CheckCircleIcon className="mx-auto h-20 w-20 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Application Submitted!
        </h1>

        <p className="text-gray-600 text-lg">
          Thank you for applying. We truly appreciate your interest.
          <br />
          We’ll get back to you via <span className="font-semibold">email</span> or{" "}
          <span className="font-semibold">phone</span> as soon as possible.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
