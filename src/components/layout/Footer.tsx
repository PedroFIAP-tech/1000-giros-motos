import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/config";
import { footerNav } from "@/lib/navigation";
import { ContactStrip } from "./ContactStrip";
import { SocialLinks } from "./SocialLinks";

/** Ano em cache: o site continua estático e o valor se atualiza sozinho. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <>
      <ContactStrip />
      <footer className="border-t border-white/6 bg-bg">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-7 gap-y-[18px] p-6">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <Logo className="h-[38px]" />
            <p className="text-xs text-[#8a8a93]">
              © <CurrentYear /> {siteConfig.name}. Todos os direitos reservados.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-[22px] gap-y-2 text-xs">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>
      </footer>
    </>
  );
}
