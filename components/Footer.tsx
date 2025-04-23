import Link from "next/link";
import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import NewsletterSubscription from "./NewsletterSubscription";

export default function Footer() {
  return (
    <div className="bg-black mt-auto">
      <div className="flex flex-row justify-between mx-12">
        <div className="flex flex-row gap-1 items-center">
          <Link href="https://x.com/ethmar_spp?s=21">
            <button className="bg-white rounded-full flex items-center justify-center w-8 h-8 shadow-lg">
              <SiX size={22} className="text-green-800" />
            </button>
          </Link>
          <Link href="https://www.linkedin.com/in/ethmar-spp-971460288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
            <button className="bg-white rounded-full flex items-center justify-center w-8 h-8 shadow-lg">
              <FaLinkedin size={22} className="text-green-800" />
            </button>
          </Link>
          <Link href="https://www.instagram.com/ethmar_spp?igsh=MzRrc242enRsMnV4">
            <button className="bg-white rounded-full flex items-center justify-center w-8 h-8 shadow-lg">
              <FaInstagram size={22} className="text-green-800" />
            </button>
          </Link>
        </div>
        <NewsletterSubscription />
      </div>
    </div>
  );
}
