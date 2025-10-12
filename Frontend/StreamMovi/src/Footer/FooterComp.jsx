import { SiThemoviedatabase } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="w-full px-4 md:px-8 py-8">
        <div className="md:flex md:justify-between md:items-center">
          {/* Logo + Title */}
          <div className="flex items-center mb-6 md:mb-0">
            <SiThemoviedatabase className="text-4xl text-yellow-400 me-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ViteStreaming
            </span>
          </div>

          {/* You can keep follow us + legal sections */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://github.com/" className="hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Bottom Footer */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 ViteStreaming. All Rights Reserved.
          </span>
        
        </div>
      </div>
    </footer>
  );
};
