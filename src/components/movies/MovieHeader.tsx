export default function MovieHeader() {
  return (
    <>
      <header className="absolute top-2 z-10 text-white w-full py-4 px-2">
        <div className="container mx-auto">
          <h1>
            <a href="/" aria-label="MovieFinder 홈">
              <img src="/logo.svg" alt="MovieFinder" className="h-10 w-auto" />
            </a>
          </h1>
        </div>
      </header>
    </>
  );
}
