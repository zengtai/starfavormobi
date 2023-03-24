import { SITE_META } from "../lib/constants";
import Link from "next/link";
export default function Footer(params) {
  return (
    <div className="mt-3 bg-emerald-700/80 text-center text-xs text-yellow-100/50">
      <nav className="flex justify-center gap-5 bg-emerald-600/80 p-3 shadow">
        <Link
          href={`/t/privacy-policy`}
          className="xl:hover:text-yellow-100/70"
          title={`Privacy Policy`}
        >
          Privacy Policy
        </Link>
        <Link
          href={`/t/terms-of-use`}
          className="xl:hover:text-yellow-100/70"
          title={`Terms of Use`}
        >
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
