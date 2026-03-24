import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-lightbg">

      <Navbar />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8">
        {children}
      </main>

      <footer className="py-4 sm:py-6 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600">
          © Copyright & Trademark Registered in India{" "}
          <a
            href="https://bluestock.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Bluestock™
          </a>{" "}
          All Rights Reserved
        </div>
      </footer>

    </div>
  );
}