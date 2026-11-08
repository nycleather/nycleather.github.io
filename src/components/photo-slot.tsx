import Image from "next/image";
import type { ShopPhoto } from "@/content/site";

export function PhotoSlot({ photo }: { photo: ShopPhoto }) {
  return (
    <figure>
      <div className="relative flex aspect-[4/5] items-center justify-center border-2 border-ink bg-mat">
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 220px, 100vw"
            className="object-cover"
          />
        ) : (
          <p className="px-4 text-center text-sm text-ink">Photo to be added</p>
        )}
      </div>
      <figcaption className="mt-2 text-center font-sign text-sm font-bold tracking-[0.14em] text-ink uppercase">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
