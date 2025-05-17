import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/sanity/lib/siteSettings/getSiteSettings";
import Image from "next/image";

async function Loading() {
    const siteSettings = await getSiteSettings();

    return(
        <div className="flex h-[calc(100vh-84px)] w-screen items-center justify-center">
            {siteSettings?.headerLogo && (
                <Image
                    src={urlFor(siteSettings.headerLogo).url()}
                    alt={siteSettings.title || ""}
                    width={100}
                    height={100}
                    className="h-32 w-32 rounded-full animate-pulse"
                />
            )}

        </div>
    )
}

export default Loading;