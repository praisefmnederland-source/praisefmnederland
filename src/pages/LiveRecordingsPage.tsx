export default function ListenAgainPage() {
  const episodes = [
    {
      id: 1,
      title: 'Praise FM Classics',
      presenter: 'Martien Holterman',
      date: '20 mei 2026',
      duration: '60 min',
      image:
        'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874294/martien-holterman_ckagup.webp',
      description:
        'De beste christelijke klassiekers van 2015 tot 2022.',
      audio:
        'https://example.com/classics.mp3',
    },
    {
      id: 2,
      title: 'Future Artists',
      presenter: 'Lauke Adkin',
      date: '19 mei 2026',
      duration: '60 min',
      image:
        'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lauke-adkin_tw08fj.webp',
      description:
        'Ontdek de toekomstige sound van christelijke muziek.',
      audio:
        'https://example.com/future-artists.mp3',
    },
    {
      id: 3,
      title: 'Praise FM Rock',
      presenter: 'Lieke Aarnink',
      date: '18 mei 2026',
      duration: '60 min',
      image:
        'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lieke-aarnink_x9qyzx.webp',
      description:
        'Christelijke rock en geloof.',
      audio:
        'https://example.com/rock.mp3',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-black">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-orange-400">
              Praise FM Nederland
            </p>

            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Terugluisteren
            </h1>

            <p className="mb-6 max-w-xl text-lg text-zinc-300">
              Luister naar de nieuwste afleveringen van uw favoriete programma's. Mist u een show? Geen probleem, hier kunt u alles terugvinden.
            </p>

            <div className="flex gap-4">
              <button className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-orange-400">
                ▶ Laatste Afspelen
              </button>

              <button className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Volg Show
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop"
              alt="Praise FM Nederland"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/80" />
          </div>
        </div>
      </section>

      {/* EPISODES */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Afleveringen</h2>

          <div className="text-sm text-zinc-500">
            {episodes.length} afleveringen beschikbaar
          </div>
        </div>

        <div className="space-y-6">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="group flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:flex-row"
            >
              <img
                src={episode.image}
                alt={episode.title}
                className="h-36 w-36 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                  <span>{episode.presenter}</span>
                  <span>•</span>
                  <span>{episode.date}</span>
                  <span>•</span>
                  <span>{episode.duration}</span>
                </div>

                <h3 className="mb-3 text-2xl font-bold group-hover:text-orange-500">
                  {episode.title}
                </h3>

                <p className="mb-5 text-zinc-600">
                  {episode.description}
                </p>

                <audio controls className="w-full">
                  <source src={episode.audio} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}