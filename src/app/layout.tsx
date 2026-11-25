import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Cuántica Studio | Danza, Yoga y Bienestar en Toluca",
  description:
    "Conoce Cuántica Studio en Toluca: clases de danza, Heels Dance, Floorwork, Chair Dance, Danzas Polinesias, Yoga, Flexibilidad y Sonoterapia. Movimiento, expresión y bienestar en un solo espacio.",
  keywords:
    "danza en Toluca, heels dance Toluca, floorwork Toluca, chair dance Toluca, danzas polinesias Toluca, yoga en Toluca, flexibilidad Toluca, sonoterapia Toluca, clases de danza Toluca, bienestar Toluca, Metepec, Zinacantepec, Lerma, Cuántica Studio",
  authors: [{ name: "Cuántica Studio" }],
  creator: "Cuántica Studio",
  publisher: "Cuántica Studio",
  icons: {
    icon: "/icono-rosa.svg",
    shortcut: "/icono-rosa.svg",
    apple: "/icono-rosa.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cuantica-studio.mx"),
  alternates: {
    canonical: "https://cuantica-studio.mx",
  },
  openGraph: {
    title: "Cuántica Studio | Danza, Yoga y Bienestar en Toluca",
    description:
      "Conoce Cuántica Studio en Toluca: clases de danza, Heels Dance, Floorwork, Chair Dance, Danzas Polinesias, Yoga, Flexibilidad y Sonoterapia. Movimiento, expresión y bienestar en un solo espacio.",
    url: "https://cuantica-studio.mx",
    siteName: "Cuántica Studio",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://cuantica-studio.mx/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Cuántica Studio - Danza, Yoga y Bienestar en Toluca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuántica Studio | Danza, Yoga y Bienestar en Toluca",
    description:
      "Conoce Cuántica Studio en Toluca: clases de danza, Heels Dance, Floorwork, Chair Dance, Danzas Polinesias, Yoga, Flexibilidad y Sonoterapia.",
    images: ["https://cuantica-studio.mx/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "MX-MEX",
    "geo.placename": "Toluca, Metepec, Zinacantepec, Lerma",
    "geo.position": "19.2811291;-99.6625421",
    ICBM: "19.2811291, -99.6625421",
    distribution: "global",
    rating: "4.8",
    reviewCount: "150+",
    priceRange: "$$",
    acceptsReservations: "true",
    servesCuisine: "wellness",
    amenityFeature: "yoga studio, meditation room, dance studio, wellness center",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/icono-rosa.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icono-rosa.svg" />

        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="theme-color" content="#4f46e5" />

        <meta name="geo.region" content="MX-MEX" />
        <meta
          name="geo.placename"
          content="Toluca, Metepec, Zinacantepec, Lerma"
        />
        <meta name="geo.position" content="19.2811291;-99.6625421" />
        <meta name="ICBM" content="19.2811291, -99.6625421" />

        <meta
          name="business:contact_data:street_address"
          content="Calle Horacio Zúñiga, P.º Colón 155-interior 7, Colonia Ciprés"
        />
        <meta name="business:contact_data:locality" content="Toluca" />
        <meta
          name="business:contact_data:administrative_area"
          content="Estado de México"
        />
        <meta name="business:contact_data:country_name" content="México" />
        <meta name="business:contact_data:postal_code" content="50120" />
        <meta
          name="business:contact_data:phone_number"
          content="+52-722-670-9287"
        />
        <meta
          name="business:contact_data:email"
          content="ventas1@cuantica-studio.mx"
        />
        <meta
          name="business:contact_data:website"
          content="https://cuantica-studio.mx"
        />

        <StructuredData type="organization" city="Toluca" />
      </head>
      <body>
        <main>{children}</main>
        <SpeedInsights />
        <Analytics />
        <WhatsAppButton
          phoneNumber="+527226709287"
          message="¡Hola! Me gustaría obtener más información sobre las clases en Cuántica Studio."
        />
      </body>
    </html>
  );
}
