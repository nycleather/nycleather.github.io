import { Button } from "@/components/ui/button";
import { shop } from "@/content/site";

export function ShopActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Button
        nativeButton={false}
        variant="board"
        size="shop"
        className="w-full sm:w-auto sm:min-w-48"
        render={<a href={shop.phoneHref} />}
      >
        Call {shop.phoneDisplay}
      </Button>
      <Button
        nativeButton={false}
        variant="line"
        size="shop"
        className="w-full sm:w-auto sm:min-w-48"
        render={
          <a href={shop.mapsHref} target="_blank" rel="noopener noreferrer" />
        }
      >
        Directions
      </Button>
    </div>
  );
}
