import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchFilters } from "@/components/search-filters";
import { AppDownloadBanner } from "@/components/app-download-banner";
import { BoatCategories } from "@/components/boat-categories";
import { LazioPorts } from "@/components/lazio-ports";
import { GoogleMap } from "@/components/google-map-clean";
import { BoatCard } from "@/components/boat-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Boat } from "@shared/schema";
import { Link } from "wouter";
import heroImage from "@assets/HD-wallpaper-sailing-boat-beach-nature-trees_1753081381507.jpg";
import { MobileNavigation } from "@/components/mobile-navigation";
import { LiveChatButton } from "@/components/live-chat-button";

export default function HomePage() {
  const { data: boats = [], isLoading } = useQuery<Boat[]>({
    queryKey: ["/api/boats"],
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPort, setSelectedPort] = useState<string>("");

  // Filtra barche per categoria e porto
  const filteredBoats = boats.filter(boat => {
    if (selectedCategory && boat.type !== selectedCategory) return false;
    if (selectedPort && selectedPort !== "tutti" && boat.port !== selectedPort) return false;
    return true;
  });

  const featuredBoats = filteredBoats.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <AppDownloadBanner />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ocean-blue to-deep-navy text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Naviga verso l'avventura
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium">
              Prenota barche, yacht e imbarcazioni uniche in tutta Italia. 
              Vivi il mare come mai prima d'ora.
            </p>
          </div>

          <SearchFilters />
        </div>
      </section>

      {/* Boat Categories with Real Images */}
      <BoatCategories 
        onCategorySelect={setSelectedCategory} 
        selectedCategory={selectedCategory}
      />

      {/* Lazio Ports */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazioPorts 
            onPortSelect={setSelectedPort}
            selectedPort={selectedPort}
          />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🗺️ Mappa Interattiva del Lazio</h2>
            <p className="text-lg text-gray-600">Esplora i porti e trova le imbarcazioni disponibili</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Porto di Civitavecchia</h3>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">4 barche</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📍 42.0942, 11.7939</div>
                  <div>⚓ Porto principale del Lazio</div>
                  <div className="text-green-600 font-medium">€280 - €1200/giorno</div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Esplora barche
                  </button>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Porto di Gaeta</h3>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">2 barche</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📍 41.2058, 13.5696</div>
                  <div>⚓ Località turistica rinomata</div>
                  <div className="text-green-600 font-medium">€280 - €850/giorno</div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Esplora barche
                  </button>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Porto di Ponza</h3>
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-medium">2 barche</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📍 40.8992, 12.9619</div>
                  <div>⚓ Isola paradisiaca</div>
                  <div className="text-green-600 font-medium">€550 - €950/giorno</div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                    Esplora barche
                  </button>
                </div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Porto di Terracina</h3>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium">2 barche</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📍 41.2857, 13.2443</div>
                  <div>⚓ Costa laziale storica</div>
                  <div className="text-green-600 font-medium">€320 - €580/giorno</div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Esplora barche
                  </button>
                </div>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Marina di Anzio</h3>
                  <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm font-medium">3 barche</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📍 41.4471, 12.6221</div>
                  <div>⚓ Porto turistico moderno</div>
                  <div className="text-green-600 font-medium">€200 - €750/giorno</div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Esplora barche
                  </button>
                </div>
              </div>

              <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Porto di Formia</h3>
                  <span className="bg-pink-600 text-white px-2 py-1 rounded text-sm font-medium">2 barche</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📍 41.2565, 13.6058</div>
                  <div>⚓ Golfo di Gaeta</div>
                  <div className="text-green-600 font-medium">€300 - €600/giorno</div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                    Esplora barche
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-800">
                <span className="text-2xl mr-3">🗺️</span>
                <div>
                  <h4 className="font-bold text-lg">Mappa Interattiva del Lazio</h4>
                  <p className="text-sm">Vista completa di tutti i porti principali con barche disponibili</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Boats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Imbarcazioni in evidenza</h2>
              <p className="text-lg text-gray-600">Le migliori proposte selezionate per te</p>
            </div>
            <Button variant="ghost" className="hidden md:block" asChild>
              <Link href="/?show=all">
                Vedi tutte →
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBoats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredBoats.map((boat) => (
                <BoatCard key={boat.id} boat={boat} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Nessuna imbarcazione disponibile al momento.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Button className="md:hidden bg-ocean-blue hover:bg-blue-600" asChild>
              <Link href="/?show=all">
                Vedi tutte le imbarcazioni
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Come funziona SeaGO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Prenota la tua imbarcazione ideale in 3 semplici passaggi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-ocean-blue text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cerca la tua imbarcazione</h3>
              <p className="text-gray-600">
                Trova l'imbarcazione perfetta usando la nostra mappa interattiva e i filtri avanzati per tipo, prezzo e ubicazione
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-seafoam text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Prenota</h3>
              <p className="text-gray-600">
                Seleziona le date, paga online in totale sicurezza e ricevi conferma istantanea della tua prenotazione
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-coral text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Naviga</h3>
              <p className="text-gray-600">
                Ritira la tua imbarcazione nel porto concordato e goditi un'esperienza indimenticabile in mare
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Host CTA */}
      <section className="py-16 bg-gradient-to-r from-ocean-blue to-deep-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Affitta la tua barca</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Guadagna mettendo a disposizione la tua imbarcazione. Gestisci tutto facilmente dalla tua dashboard personale.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-ocean-blue hover:bg-gray-100" asChild>
              <Link href="/diventa-noleggiatore">Diventa noleggiatore</Link>
            </Button>
            <Button size="lg" className="bg-white text-ocean-blue hover:bg-gray-100 font-semibold shadow-lg border-2 border-white" asChild>
              <Link href="/diventa-noleggiatore">Scopri di più</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section id="help" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hai bisogno di aiuto?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Siamo qui per aiutarti. Trova le risposte alle domande più frequenti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prenotazioni</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/come-prenotare" className="text-blue-600 hover:text-blue-800">• Come prenotare un'imbarcazione</Link></li>
                <li><Link href="/politiche-cancellazione" className="text-blue-600 hover:text-blue-800">• Politiche di cancellazione</Link></li>
                <li><Link href="/modifica-prenotazione" className="text-blue-600 hover:text-blue-800">• Modificare una prenotazione</Link></li>
                <li><Link href="/documenti" className="text-blue-600 hover:text-blue-800">• Documenti necessari</Link></li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pagamenti</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/pagamenti" className="text-blue-600 hover:text-blue-800">• Metodi di pagamento accettati</Link></li>
                <li><Link href="/sicurezza-pagamenti" className="text-blue-600 hover:text-blue-800">• Sicurezza dei pagamenti</Link></li>
                <li><Link href="/rimborsi" className="text-blue-600 hover:text-blue-800">• Rimborsi e restituzioni</Link></li>
                <li><Link href="/fatturazione" className="text-blue-600 hover:text-blue-800">• Fatturazione</Link></li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Per i noleggiatori</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/inserisci-barca" className="text-blue-600 hover:text-blue-800">• Come inserire la tua barca</Link></li>
                <li><Link href="/gestione-prenotazioni" className="text-blue-600 hover:text-blue-800">• Gestione delle prenotazioni</Link></li>
                <li><Link href="/commissioni" className="text-blue-600 hover:text-blue-800">• Commissioni e guadagni</Link></li>
                <li><Link href="/assistenza-proprietari" className="text-blue-600 hover:text-blue-800">• Assistenza proprietari</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Non trovi quello che cerchi?</p>
            <Button className="bg-ocean-blue hover:bg-blue-600 mr-4" asChild>
              <Link href="/contatti">Contatta il supporto</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/aiuto">Centro assistenza</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavigation />
      <LiveChatButton />
    </div>
  );
}
