import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YouTubeIcon },
];

/** Círculos de 36px com borda sutil (rodapé). */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-2.5", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} no ${label}`}
            className="flex size-9 items-center justify-center rounded-full border border-white/12 text-ink transition-all duration-200 hover:border-primary hover:text-primary"
          >
            <Icon className="size-[17px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
