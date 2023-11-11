import RichTextEditor from "@/components/global/fields/textEditor";
import Image from "next/image";
import Link from "next/link";
import { Fa500Px, FaBars, FaCheck } from "react-icons/fa";

export default function Home() {

  return (
    <div className="bg-white text-black">
      <div className="w-full py-10 ">
        <div className="relative flex flex-col px-10 mx-auto space-y-5 md:w-3/4">
          <header className="flex items-center justify-between space-x-3">
            <Link className="text-2xl font-bold" href="/">
              SaaS
            </Link>
            <button className="md:hidden">
              <FaBars className="w-8 h-8" />
            </button>
            <div className="items-center justify-center md:flex-row md:flex md:relative md:bg-transparent md:shadow-none md:top-0 md:backdrop-blur-none md:space-x-3 hidden">
              <nav className="flex flex-col w-full space-x-0 space-y-3 text-center md:space-y-0 md:space-x-3 md:flex-row">
                <Link
                  className="w-full px-5 py-2 text-center capitalize text-white bg-blue-600 rounded shadow hover:bg-blue-500"
                  href={"/auth/register"}
                >
                  signup
                </Link>
                <Link
                  className="w-full px-5 py-2 capitalize text-center text-white bg-blue-600 rounded shadow hover:bg-blue-500"
                  href="/auth/login"
                >
                  Login
                </Link>
              </nav>
            </div>
          </header>
          <div className="flex flex-col items-center justify-center pt-10 mx-auto md:w-3/5">
            <h1 className="text-6xl font-extrabold text-center">
              <span className="block">Build SaaS platforms</span>
              <span className="block text-blue-600">like never before</span>
            </h1>
            <p className="mt-5 text-center text-gray-600">
              Quickly build landing pages that will help you get results fast
            </p>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <Link
              href={"/dashboard"}
              className="px-10 py-3 text-center text-white bg-blue-600 rounded shadow hover:bg-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full py-10">
        <div className="relative flex flex-col w-3/4 mx-auto space-y-5">
          <div className="flex flex-col items-center">
            <h6 className="font-bold text-center text-blue-600 uppercase">
              Features
            </h6>
            <h2 className="text-4xl font-bold text-center">
              <span className="block">A better way to build your SaaS</span>
            </h2>
            <p className="text-center text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
          <div className="flex flex-col py-10 space-x-0 space-y-10 md:space-y-0 md:space-x-5 md:flex-row">
            <div className="flex flex-col items-center justify-start px-5 space-y-3 md:w-1/3">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full"></div>
              <h3 className="text-lg font-bold">Excellent Services</h3>
              <p className="text-center text-gray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </p>
            </div>
            <div className="flex flex-col items-center justify-start px-5 space-y-3 md:w-1/3">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full"></div>
              <h3 className="text-lg font-bold">Grow Your Market</h3>
              <p className="text-center text-gray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </p>
            </div>
            <div className="flex flex-col items-center justify-start px-5 space-y-3 md:w-1/3">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full"></div>
              <h3 className="text-lg font-bold">Launch Time</h3>
              <p className="text-center text-gray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-10">
        <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
          <div className="flex flex-col items-center">
            <h6 className="font-bold text-center text-blue-600 uppercase">
              Pricing
            </h6>
            <h2 className="text-4xl font-bold text-center">
              <span className="block">
                The right pricing for you, whoever you are
              </span>
            </h2>
            <p className="text-center text-gray-600">
              It features multiple CSS components based on the Tailwind CSS
              design system
            </p>
          </div>
          <div className="flex flex-col p-10 space-x-0 space-y-5 bg-gray-200 rounded-lg md:space-y-0 md:space-x-5 md:flex-row">
            <div className="flex flex-col items-start overflow-hidden bg-white border rounded-lg md:w-1/2">
              <div className="w-full p-10 space-y-5">
                <span className="px-5 py-1 text-sm text-blue-600 uppercase bg-blue-100 rounded-full">
                  Hobby
                </span>
                <h2 className="space-x-2 text-6xl">
                  <span className="font-extrabold">Free</span>
                  <small className="text-lg text-gray-400">for life!</small>
                </h2>
              </div>
              <div className="flex flex-col w-full h-full p-10 space-y-5 bg-gray-100 border-t">
                <a
                  className="px-10 py-3 text-lg text-center text-blue-600 bg-white rounded shadow hover:bg-blue-50"
                  href="#!"
                >
                  Get Started with Hobby
                </a>
                <div className="space-y-5">
                  <h6 className="uppercase">What&apos;s Included</h6>
                  <ul className="leading-10 list-none list-inside">
                    {[
                      "Fast Page Loading",
                      "Automatic Friendly URLs",
                      "Custom Themes",
                      "SEO",
                    ].map((item, index) => (
                      <li className="flex items-center space-x-5" key={index}>
                        <FaCheck className=" text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start overflow-hidden bg-white border rounded-lg md:w-1/2">
              <div className="w-full p-10 space-y-5">
                <span className="px-5 py-1 text-sm text-blue-600 uppercase bg-blue-100 rounded-full">
                  Premium
                </span>
                <h2 className="space-x-2 text-6xl">
                  <span className="font-extrabold">$9</span>
                  <small className="text-lg text-gray-400">per month</small>
                </h2>
              </div>
              <div className="flex flex-col w-full h-full p-10 space-y-5 bg-gray-100 border-t">
                <a
                  className="px-10 py-3 text-lg text-center text-blue-600 bg-white rounded shadow hover:bg-blue-50"
                  href="#!"
                >
                  Get Started with Premium
                </a>
                <div className="space-y-5">
                  <h6 className="uppercase">What&apos;s Included</h6>
                  <ul className="leading-10 list-disc list-inside">
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Everything in Hobby</span>
                    </li>
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Custom Domain Name</span>
                    </li>
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Analytics</span>
                    </li>
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Publishing Status</span>
                    </li>
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Custom Favicon</span>
                    </li>
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Custom Meta Tags</span>
                    </li>
                    <li className="flex items-center space-x-5">
                      <FaCheck className=" text-green-600" />
                      <span>Live Site Preview</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-10">
        <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
          <div className="flex flex-col items-center">
            <h6 className="font-bold text-center text-blue-600 uppercase">
              Guides
            </h6>
            <h2 className="text-4xl font-bold text-center">
              <span className="block">Supercharge your website</span>
            </h2>
            <p className="text-center text-gray-600">
              Lorem ipsum dolor sit amet
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3">
            <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
              <div className="w-full h-40 bg-gray-400 rounded-lg animate-pulse"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-400">
                  Getting Started
                </h3>
                <h2 className="text-2xl font-bold">
                  Using Notion to build your site
                </h2>
              </div>
            </div>
            <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
              <div className="w-full h-40 bg-gray-400 rounded-lg animate-pulse"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-400">SEO</h3>
                <h2 className="text-2xl font-bold">
                  Improve SEO and discoverability of your site
                </h2>
              </div>
            </div>
            <div className="p-5 space-y-5 transition rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2">
              <div className="w-full h-40 bg-gray-400 rounded-lg animate-pulse"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-400">Themes</h3>
                <h2 className="text-2xl font-bold">Customize your site</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-10 bg-gray-200">
        <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
          <div className="flex flex-col items-center justify-center mx-auto space-y-5 md:w-3/5">
            <h3 className="text-2xl leading-10 text-center text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h3>
            <div className="flex flex-row items-center justify-center space-x-5">
              <h4 className="font-bold">Adam Warlock</h4>
              <span className="text-2xl font-extrabold text-blue-600">/</span>
              <h4>CEO at ABC Inc.</h4>
            </div>
          </div>
        </div>
      </div>
     

      <div className="flex items-center justify-center w-full h-screen bg-blue-600">
        <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
          <div className="flex flex-col space-y-3 text-white">
            <h2 className="text-4xl font-extrabold text-center md:text-6xl">
              <span className="block">Build SaaS platforms like a PRO</span>
            </h2>
            <h2 className="text-2xl font-bold text-center md:text-4xl">
              <span className="block">Start your free trial today</span>
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <a className="px-10 py-3 text-xl text-center text-blue-600 bg-white rounded shadow hover:bg-blue-50">
              Subscribe Now
            </a>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative flex flex-col md:mx-auto md:w-3/4">
          <footer className="flex flex-col items-center justify-center py-5 space-x-0 space-y-3 border-b md:flex-row md:space-y-0 md:space-x-3">
            <a className="px-5 py-2 text-xl rounded hover:underline">About</a>
            <a className="px-5 py-2 text-xl rounded hover:underline">
              Showcase
            </a>
            <a className="px-5 py-2 text-xl rounded hover:underline">
              Community
            </a>
            <a className="px-5 py-2 text-xl rounded hover:underline">Privacy</a>
            <a className="px-5 py-2 text-xl rounded hover:underline">Terms</a>
          </footer>
          <p className="py-5 text-center text-gray-400">
            © Nextacular. All rights reserved 2023
          </p>
        </div>
      </div>
    </div>
  );
}
