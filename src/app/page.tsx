import { PhotoSlot } from "@/components/photo-slot";
import { ShopActions } from "@/components/shop-actions";
import { Wordmark } from "@/components/wordmark";
import { photos, services, shop } from "@/content/site";

export default function Home() {
  return (
    <>
      <div className="border-b-4 border-ink bg-cream px-4 py-3 text-center text-sm leading-6 text-ink sm:text-base">
        <p className="font-semibold">Website preview</p>
        <p>Draft for review</p>
      </div>

      <main>
        <section className="px-4 pt-4 sm:pt-6" aria-labelledby="shop-name">
          <div className="mx-auto w-max max-w-full border-4 border-ink bg-mustard px-5 py-5 sm:px-9 sm:py-7">
            <Wordmark />
          </div>
          <div className="mx-auto mt-8 max-w-xl text-center sm:mt-10">
            <p className="text-base leading-7 sm:text-lg">
              {shop.street}
              <br />
              {shop.cityLine}
              <br />
              {shop.between}
              <br />
              {shop.landmark}
            </p>
            <div className="mt-6">
              <ShopActions />
            </div>
          </div>
        </section>

        <section
          className="mx-auto mt-12 max-w-xl px-4 sm:mt-14"
          aria-labelledby="services-heading"
        >
          <div className="bg-ink px-5 py-6 text-cream sm:px-8 sm:py-7">
            <h2 id="services-heading" className="section-label text-mustard">
              Services
            </h2>
            <ul className="border-t border-cream/30">
              {services.map((service) => (
                <li
                  key={service}
                  className="border-b border-cream/30 py-3 text-center font-sign text-xl leading-none font-semibold tracking-[0.04em] uppercase last:border-b-0"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="mx-auto mt-12 max-w-2xl px-4 sm:mt-14"
          aria-labelledby="shop-photos-heading"
        >
          <h2 id="shop-photos-heading" className="section-label">
            The shop
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
            {photos.map((photo) => (
              <PhotoSlot key={photo.id} photo={photo} />
            ))}
          </div>
        </section>

        <section
          className="mx-auto mt-12 max-w-xl px-4 pb-14 text-center sm:mt-14"
          aria-labelledby="visit-heading"
        >
          <h2 id="visit-heading" className="section-label">
            Visit
          </h2>
          <p className="text-lg font-medium">{shop.proprietor}</p>
          <address className="mt-3 text-base leading-7 not-italic">
            {shop.name}
            <br />
            {shop.street}
            <br />
            {shop.cityLine}
            <br />
            {shop.between}
            <br />
            {shop.landmark}
          </address>
          <div className="mt-6">
            <ShopActions />
          </div>
          <p className="mt-5 text-sm">Call the shop to ask about hours.</p>
        </section>
      </main>

      <footer className="bg-ink px-5 py-6 text-center text-sm leading-6 text-cream">
        <p className="font-sign text-base font-bold tracking-[0.14em] uppercase">
          {shop.name}
        </p>
        <p className="mt-1">
          {shop.street}, {shop.cityLine}
        </p>
        <p>
          <a
            href={shop.phoneHref}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            {shop.phoneDisplay}
          </a>
        </p>
        <p className="mt-3 text-xs leading-5">Website preview. Draft for review.</p>
      </footer>
    </>
  );
}
