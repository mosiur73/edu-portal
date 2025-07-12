"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">EduPortal</h3>
          <p className="text-gray-400 text-sm">
            Your trusted platform for discovering and booking college services and facilities. Explore top colleges, research works, and admission details with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-blue-400 transition">Home</a>
            </li>
            <li>
              <a href="#colleges" className="hover:text-blue-400 transition">Colleges</a>
            </li>
            <li>
              <a href="#admission" className="hover:text-blue-400 transition">Admission</a>
            </li>
            <li>
              <a href="#my-college" className="hover:text-blue-400 transition">My College</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@eduportal.com" className="hover:text-blue-400 transition">support@eduportal.com</a></li>
            <li>Phone: <span className="text-gray-400">+1 (234) 567-890</span></li>
            <li>Address: <span className="text-gray-400">123 University Ave, Cambridge, MA</span></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.19 20.45H3.69V9h3.5v11.45zM5.44 7.61c-1.12 0-1.83-.75-1.83-1.7 0-.96.72-1.7 1.86-1.7s1.83.74 1.85 1.7c0 .95-.71 1.7-1.88 1.7zM20.45 20.45h-3.5v-5.8c0-1.44-.52-2.42-1.83-2.42-.99 0-1.57.66-1.83 1.3-.09.22-.11.52-.11.82v6.1h-3.5s.05-9.89 0-10.91h3.5v1.55c.46-.7 1.28-1.69 3.11-1.69 2.28 0 3.98 1.48 3.98 4.66v6.39z"/></svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775a4.958 4.958 0 0 0 2.163-2.723 9.869 9.869 0 0 1-3.127 1.195 4.926 4.926 0 0 0-8.396 4.49 13.978 13.978 0 0 1-10.15-5.15A4.93 4.93 0 0 0 3.13 9.23a4.905 4.905 0 0 1-2.229-.616v.06a4.928 4.928 0 0 0 3.946 4.827 4.897 4.897 0 0 1-2.224.085 4.936 4.936 0 0 0 4.6 3.419A9.868 9.868 0 0 1 .96 19.13 13.914 13.914 0 0 0 7.548 21c9.14 0 14.307-7.721 14.307-14.412 0-.22-.004-.437-.014-.653a10.146 10.146 0 0 0 2.113-2.366z"/></svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.004 2.003c-5.524 0-10 4.476-10 10 0 4.418 2.865 8.168 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.867-.012-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.153-1.109-1.46-1.109-1.46-.908-.62.069-.607.069-.607 1.002.07 1.53 1.04 1.53 1.04.892 1.528 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.104-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025a9.564 9.564 0 0 1 2.5-.336c.849.004 1.704.115 2.5.337 1.909-1.296 2.748-1.025 2.748-1.025.545 1.377.203 2.394.1 2.647.64.698 1.028 1.59 1.028 2.682 0 3.842-2.338 4.688-4.566 4.935.358.309.678.92.678 1.854 0 1.337-.012 2.418-.012 2.746 0 .268.18.578.688.48C19.137 20.166 22 16.419 22 12.003c0-5.524-4.476-10-9.996-10z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EduPortal. All rights reserved.
      </div>
    </footer>
  );
}
