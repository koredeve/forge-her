import "./globals.css";
import Navbar from "@/components/Navbar";
import WorkoutPlayer from "@/components/WorkoutPlayer";
import GlobalModals from "@/components/GlobalModals";
import CoachAssistant from "@/components/CoachAssistant";
import { AuthProvider } from "@/context/AuthContext";
import { FitnessProvider } from "@/context/FitnessContext";
import { Inter, Archivo } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const viewport = {
  themeColor: "#0d0f12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL("https://forgeher.vercel.app"),
  title: "FORGE HER — Snatched Waist & Glute Sculpt",
  description: "Sculpt your silhouette from within. Snatched waist, hourglass glutes, upright posture, and lifted décolletage. Guided feminine biomechanics with Coach HER.",
  applicationName: "FORGE HER",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FORGE HER",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "FORGE HER",
    title: "FORGE HER — Snatched Waist & Glute Sculpt",
    description: "Cinch your waist, lift your glutes, and align your posture. Guided biomechanics.",
    images: [
      {
        url: "/banners/hero.jpg",
        width: 1200,
        height: 630,
        alt: "FORGE HER Fitness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORGE HER — Snatched Waist & Glute Sculpt",
    description: "Sculpt your silhouette from within.",
    images: ["/banners/hero.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className}`}>
        <AuthProvider>
          <FitnessProvider>
            <Navbar />
            <main>{children}</main>
            <WorkoutPlayer />
            <CoachAssistant />
            <GlobalModals />
          </FitnessProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
