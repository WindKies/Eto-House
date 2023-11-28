import Link from "next/link";
import React from "react";
import {FiGlobe} from "react-icons/fi";
import {PiCaretUpBold} from "react-icons/pi"

export const links = [
    "Quyền riêng tư",
    "Điều khoản",
    "Sơ đồ",
    "Chi tiết",
    "Điểm đến"
];
const Footer = () => {
  return (
    <div className="bottom-0 fixed px-20 border-t border-t-gray-200 bg-blue-50 py-2 flex justify-between w-full text-sm">
      <ul className="flex gap-3 font-normal">
        <li>&copy; {new Date().getFullYear()} Sushiba, Inc</li>
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="capitalize">
              {link}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-4 font-medium">
        <li className="flex items-center gap-2 cursor-pointer">
          <FiGlobe/> Tiếng Việt (VN)
        </li>
        <li className="cursor-pointer">
          $ USD
        </li>
        <li className="flex items-center gap-2 cursor-pointer">
          Hỗ trợ và tài nguyên <PiCaretUpBold/>
        </li>
      </ul>

    </div>
  );
}

export default Footer;