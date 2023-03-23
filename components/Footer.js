import { SITE_META } from "../lib/constants";
import Link from "next/link";
export default function Footer(params) {
  return (
    <div className="mt-3 bg-white text-center text-xs text-gray-500">
      <nav className="flex justify-center gap-5 bg-orange-500 p-3 text-orange-200">
        <Link href={`/t/privacy-policy`} title={`Privacy Policy`}>
          Privacy Policy
        </Link>
        <Link href={`/t/terms-of-use`} title={`Terms of Use`}>
          Terms of Use
        </Link>
      </nav>
      <p className="py-7 leading-5 opacity-90">
        Copyright &copy; {new Date().getFullYear()} {SITE_META.NAME}
        <br />
        All Rights Reserved
      </p>
    </div>
  );
}
