import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/config";
import { mainNav, servicesNav } from "@/lib/navigation";
import { SocialLinks } from "./SocialLinks";

/** Ano em cache: o site continua estático e o valor se atualiza sozinho. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const footerLinks = mainNav.map((item) =>
  item.children ? { label: item.label, href: servicesNav[0].href } : item,
);

export function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 text-center sm:px-6 lg:flex-row lg:justify-between lg:gap-8 lg:px-8 lg:text-left">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
          <Logo />
          <p className="text-sm text-muted">
            © <CurrentYear /> {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>
    </footer>
  );
}
