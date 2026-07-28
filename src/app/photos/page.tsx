import { site } from "@/lib/site";

export const metadata = {
  title: "Photos | UMass Motorsports Club",
};

export default function PhotosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">Photos</h1>
      <p className="text-sm text-gray-500 mb-10">
        Photos from all past events are available in our Google Photos album.
      </p>

      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-20 px-6 text-center gap-6">
        <p className="text-gray-500 text-sm max-w-sm">
          Our photo gallery is hosted on Google Photos. Click below to browse all event photos.
        </p>
        <a
          href={site.googlePhotos}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-umass text-white text-sm font-semibold rounded hover:bg-umass-dark transition-colors"
        >
          Open Photo Gallery
        </a>
      </div>
    </div>
  );
}
