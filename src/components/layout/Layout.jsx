import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-lightbg">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 pt-24 pb-10 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
          © Copyright & Trademark Registered in India{" "}
          <a
            href="https://bluestock.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Bluestock™
          </a>{" "}
          All Rights Reserved | Fintech Platforms for a Growing India. 🇮🇳
        </div>
      </footer>

    </div>
  );
}