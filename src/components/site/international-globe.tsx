"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Plane, MapPin } from "lucide-react";
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/site/sections";

export const internationalMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

export function InternationalGlobeShowcase() {
  const [activeMarker, setActiveMarker] = useState<GlobeMarker | null>(null);

  return (
    <div className="relative mx-auto min-h-[460px] w-full max-w-7xl overflow-hidden rounded-3xl border border-border/60 bg-navy text-navy-foreground shadow-lift bg-grain">
      {/* Decorative ambient gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-secondary/25 blur-3xl animate-blob"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 -bottom-20 size-72 rounded-full bg-primary/20 blur-3xl animate-blob-delayed"
      />

      <div className="relative z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:max-w-2xl">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-saffron">
            <Globe className="size-3.5 text-saffron" aria-hidden="true" />
            Global Packaging & Exports
          </span>

          <h2 className="text-2xl font-extrabold tracking-tight text-navy-foreground sm:text-4xl lg:text-5xl">
            Custom Packaging Delivered Across the Globe
          </h2>

          <p className="mt-4 text-base text-navy-foreground/85 leading-relaxed sm:text-lg">
            From cafe chains in Dubai and London to cloud kitchens and retail brands
            worldwide, Printzy manufactures and exports brand-consistent cups, food boxes,
            bags, and custom cartons with end-to-end freight coordination.
          </p>

          {/* Interactive marker indicator */}
          <div className="mt-5 min-h-[2.25rem]">
            {activeMarker ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur animate-fade-in">
                <MapPin className="size-3.5 text-saffron" />
                <span>Destination: <strong>{activeMarker.label}</strong></span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs text-navy-foreground/60">
                <Plane className="size-3.5" />
                <span>Hover or drag the interactive 3D globe to explore global destinations</span>
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" shimmer>
            <Link to="/quote" search={{ product: undefined }}>
              Request Export Quote
            </Link>
          </Button>
          <WhatsAppButton
            variant="outlineLight"
            label="WhatsApp Export Desk"
          />
        </div>
      </div>

      {/* 3D Globe Container — precisely positioned & responsive */}
      <div className="relative -mt-10 h-[360px] w-full sm:h-[420px] md:absolute md:-right-24 md:-bottom-48 md:h-[580px] md:w-[580px] lg:-right-20 lg:-bottom-40 lg:h-[680px] lg:w-[680px]">
        <Globe3D
          className="h-full w-full"
          markers={internationalMarkers}
          config={{
            atmosphereColor: "#4da6ff",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.3,
          }}
          onMarkerClick={(marker) => {
            setActiveMarker(marker);
          }}
          onMarkerHover={(marker) => {
            if (marker) {
              setActiveMarker(marker);
            }
          }}
        />
      </div>
    </div>
  );
}

// Backward-compatible alias
export const Globe3DDemoThird = InternationalGlobeShowcase;
