import ImageGenerator from "./_components/image_generator";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[3rem]">
          Generate Images with SDXL & Replicate
        </h1>

        <ImageGenerator />

      </div>
    </main>
  );
}
