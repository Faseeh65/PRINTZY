import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: ReadonlyArray<{ readonly to: string; readonly label: string }>;
}

export function MobileNav({ open, onOpenChange, navLinks }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-80 flex-col bg-card">
        <SheetTitle className="font-display text-foreground">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation menu links</SheetDescription>
        <nav aria-label="Mobile navigation" className="mt-4 flex flex-col">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => onOpenChange(false)}
              className="flex min-h-12 items-center border-b font-display font-medium text-foreground hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 pb-4">
          <Button asChild size="lg">
            <Link to="/quote" search={{ product: undefined }} onClick={() => onOpenChange(false)}>
              Get a Free Quote
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;

