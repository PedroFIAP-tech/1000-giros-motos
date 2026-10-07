import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YouTubeIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} no ${label}`}
            className="inline-flex size-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-primary hover:text-white"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
