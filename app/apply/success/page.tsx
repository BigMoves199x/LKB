import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
        <CheckCircleIcon className="mx-auto h-20 w-20 text-green-500 mb-6" />

        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Application Submitted!
        </h1>

        <p className="text-gray-600 text-sm">
          Thank you for applying. We truly appreciate your interest.
          <br />
          You will be contacted shortly by our team either via <span className="font-semibold">
            email
          </span> or <span className="font-semibold">by phone </span>If you have any
          questions in the meantime, please visit our website and use the chat
          feature to reach us.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#072a40] px-4 py-2 text-black hover:bg-[#072a40] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in"
        >
          Back to Home <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
