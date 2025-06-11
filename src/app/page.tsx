export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="text-center">
          <h1 className="text-6xl font-biblical biblical-text text-biblical-700 mb-8">
            Verse Pursuit
          </h1>
          <p className="text-xl text-biblical-600 mb-8">
            Complete Bible verses by placing word tiles in the correct order
          </p>
          <div className="text-biblical-500">
            Setting up the game engine...
          </div>
        </div>
      </div>
    </main>
  )
}