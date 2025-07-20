export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      <p className="text-center text-lg mb-12">
        Have questions about job applications, onboarding, or partnership opportunities? Reach out to us using the details below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">📍 Office Address</h2>
            <p>Luke Bryan Job Opportunity Program</p>
          </div>

         {/*  <div>
            <h2 className="text-xl font-semibold">📧 Email</h2>
            <p>support@lukebryan-jobs.com</p>
          </div> */}

       {/*    <div>
            <h2 className="text-xl font-semibold">📞 Phone</h2>
            <p>+1 (800) 123-4567</p>
          </div> */}

          <div>
            <h2 className="text-xl font-semibold">🕒 Support Hours</h2>
            <p>Monday – Friday: 9:00 AM – 6:00 PM CST<br />Saturday – Sunday: Closed</p>
          </div>
        </div>

        {/* Optional: Embedded Map */}
        <div className="w-full h-64 md:h-full">
          <iframe
            title="Vaco Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.147941235896!2d-86.7816!3d36.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864665cf3a52a8f%3A0x6c64be05b191b2b6!2sNashville%2C%20TN!5e0!3m2!1sen!2sus!4v1710000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
