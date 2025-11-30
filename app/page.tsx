'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, MessageCircleMoreIcon,Phone, Mail, MapPin, Instagram, Facebook, ChevronDown } from 'lucide-react'
import { useState, useEffect } from "react"
import Link from "next/link"

type GalleryImage = {
  src: string
  alt: string
}

export default function LotusEventos() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isGalleryLoading, setIsGalleryLoading] = useState(true)
  const [promoOpen, setPromoOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'LOTUS Eventos',
    url: 'https://lotuseventoslp.com',
    image: 'https://lotuseventoslp.com/Lotus_Hero2.jpg',
    telephone: '+54 9 2215607906',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 14 N 619',
      addressLocality: 'La Plata',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    sameAs: ['https://www.instagram.com/lotuseventoslp/'],
    description:
      'Casita de fiesta y salon de eventos en La Plata. Cumpleanos infantiles, fiestas teens, eventos corporativos, ferias, muestras de arte y mas.',
    areaServed: 'La Plata, Buenos Aires, Argentina',
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const openWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Hola ! Quiero mas informacion del Servicio ${service}`)
    window.open(`https://wa.me/5492214188503?text=${message}`, '_blank')
  }

  useEffect(() => {
    const handleScroll = () => {
      const ctaSection = document.getElementById('cta-section')
      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect()
        const scrollPercentage = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
        setParallaxOffset(scrollPercentage * 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (!response.ok) throw new Error("No se pudieron cargar las imágenes")
        const data: { images?: GalleryImage[] } = await response.json()
        if (isMounted && Array.isArray(data.images)) {
          setGalleryImages(data.images)
        }
      } catch (error) {
        console.error("Error al cargar la galería", error)
      } finally {
        if (isMounted) {
          setIsGalleryLoading(false)
        }
      }
    }

    fetchGalleryImages()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setPromoOpen(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {selectedImage && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-black hover:bg-white transition-colors"
              aria-label="Cerrar imagen"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt || 'Imagen de la galeria'}
              className="w-full h-auto object-contain max-h-[80vh] bg-black"
            />
          </div>
        </div>
      )}
      {promoOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ease-out scale-100 flex flex-col max-h-[90vh]">
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black/80 transition-colors"
              aria-label="Cerrar promocion"
              onClick={() => setPromoOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/PromoInaguracion.png"
              alt="Promocion de inauguracion"
              className="w-full h-full object-contain max-h-[70vh]"
            />
            <div className="w-full px-4 py-6 flex justify-center bg-white">
              <Button
                className="animate-bounce bg-white text-black hover:bg-white/90 shadow-lg"
                onClick={() => openWhatsApp('Promo Inauguracion')}
              >
                Quiero aprovechar
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-primary">LOTUS</h1>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              <li><button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">Inicio</button></li>
              <li><button onClick={() => scrollToSection('nosotros')} className="text-foreground hover:text-primary transition-colors">Nosotros</button></li>
              <li><button onClick={() => scrollToSection('servicios')} className="text-foreground hover:text-primary transition-colors">Servicios</button></li>
              <li><button onClick={() => scrollToSection('galeria')} className="text-foreground hover:text-primary transition-colors">Galería</button></li>
              <li><button onClick={() => scrollToSection('contacto')} className="text-foreground hover:text-primary transition-colors">Contacto</button></li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200">
              <ul className="flex flex-col gap-4">
                <li><button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors w-full text-left">Inicio</button></li>
                <li><button onClick={() => scrollToSection('nosotros')} className="text-foreground hover:text-primary transition-colors w-full text-left">Nosotros</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="text-foreground hover:text-primary transition-colors w-full text-left">Servicios</button></li>
                <li><button onClick={() => scrollToSection('galeria')} className="text-foreground hover:text-primary transition-colors w-full text-left">Galería</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="text-foreground hover:text-primary transition-colors w-full text-left">Contacto</button></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-pink-50/20 to-purple-50/30">
        <div className="absolute inset-0 bg-[url('/Lotus_Hero.jpg')] bg-cover bg-center opacity-60" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Salón de <span className="text-primary">eventos</span> y fiestas en La Plata
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pretty text-foreground">
              Tu evento único e inolvidable en pleno centro de la ciudad.
              Somos tu casita de fiesta ideal para cumpleanos infantiles, reuniones familiares, eventos laborales y encuentros con amigos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('contacto')}>
                Solicitá tu Presupuesto
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('nosotros')}>
                Conocé más
              </Button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-primary" />
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-5">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 mb-6 text-balance">Quiénes Somos</h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>

            {/* Main description */}
            <div className="mb-10">
              <p className="text-xl text-center text-foreground leading-relaxed mb-6 text-balance">
                Si estás buscando un evento personalizado, diferente y divertido,{' '}
                <span className="text-primary font-semibold">¡llegaste al lugar indicado!</span>
                {' '}
              </p>
              <p className="text-xl text-center text-foreground leading-relaxed mb-6 text-balance">
                Somos tu casita de fiesta en La Plata, pensada para celebrar con chicos, familias y empresas.
                Trabajamos con dedicacion, profesionalismo y amor para asegurar que tu festejo sea inolvidable.
                Contamos con un espacio pensado especialmente para las infancias, adolescentes y para adultos, nuestra experiencia nos permite adaptar cada propuesta con servicios totalmente personalizados.
                Conocenos y contactanos!
              </p>
            </div>

            {/* Features - Clean lines design */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              <div className="text-center space-y-4">
                
                <h3 className="text-xl font-bold">Atención Personalizada</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Te acompañamos antes y durante el evento, para que todo salga como vos necesitás.
                </p>
              </div>

              <div className="text-center space-y-4">
                
                <h3 className="text-xl font-bold">Catering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Contamos con un servicio de comidas y bebidas con propuestas que se amoldan a tus posibilidades.
                </p>
              </div>

              <div className="text-center space-y-4">
                
                <h3 className="text-xl font-bold">Luces</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trabajamos con la última tecnología en iluminación para tu evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nuestros Servicios</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
        </div>

        <div className="space-y-0">
          
          {/* Cumpleaños Infantiles - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="relative min-h-[400px] lg:min-h-full">
              <div className="absolute inset-0 bg-[url('/children-party-decorations-balloons-colorful.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="bg-[#e0007b] text-white p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Cumpleaños Infantiles</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                En Lotus, cada evento se transforma en una experiencia única. Nuestro salón puede ambientarse y decorarse con distintos estilos (rústico, temático, entre otros).
              </p>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                Te asesoramos para elegir la animación perfecta, asegurando que tus hijos y sus invitados vivan una jornada inolvidable. Podés traer tus propias ideas o dejar que nuestro equipo te ayude a hacerlas realidad.
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#e0007b] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Cumpleaños Infantiles')}>
                Más Información
              </Button>
            </div>
          </div>

          {/* Fiesta Teens - Content Left, Image Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="bg-[#5f2b4a] text-white p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Fiesta Teens</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                En Lotus sabemos que las fiestas teens merecen un estilo propio: moderno, divertido y lleno de energía. Nuestro salón cuenta con la ambientación ideal para adolescentes que quieren disfrutar con amigos, bailar y celebrar a su manera.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                Podés elegir la música, karaoke, videos musicales, la iluminación y la decoración que más te guste. Ofrecemos opciones flexibles de catering, barra de tragos sin alcohol, animación y horarios extendidos.
              </p>
              <p className="italic text-white/95 font-medium">
                Porque crecer también se celebra — Viví tu fiesta teen en Lotus.
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#5f2b4a] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Fiesta Teens')}>
                Más Información
              </Button>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[url('/teen-party-lights-music-dance-floor.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>

          {/* Fiesta UPD - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="relative min-h-[400px] lg:min-h-full">
              <div className="absolute inset-0 bg-[url('/upd-24.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="bg-[#e0007b] text-white p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Fiesta UPD</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                La Fiesta UPD es una de las celebraciones más esperadas por los estudiantes del último año de secundaria. Marca el comienzo de una nueva etapa y el cierre de una de las más lindas: la vida escolar.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                En esta noche especial, los chicos se reúnen para festejar el Último Primer Día de clases, compartiendo música, cotillón, disfraces y mucha diversión hasta la madrugada.
              </p>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-white text-xl">✨</span>
                  <span>Amplio salón con pista de baile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white text-xl">🎶</span>
                  <span>Equipamiento de sonido e iluminación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white text-xl">🍔</span>
                  <span>Servicio de catering y bebidas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white text-xl">📸</span>
                  <span>Espacio para fotos y disfraces</span>
                </li>
              </ul>
              <Button variant="outline" className="mt-8 bg-white text-[#e0007b] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Fiesta UPD')}>
                Más Información
              </Button>
            </div>
          </div>

          {/* Eventos para Adultos - Content Left, Image Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="bg-[#5f2b4a] text-white p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Eventos para Adultos</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                En Lotus contamos con un espacio versátil pensado también para adultos. Ideal para cumpleaños, reuniones familiares, cenas temáticas, aniversarios o celebraciones especiales.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Nuestro salón ofrece comodidad, privacidad y un ambiente rústico cálido, con posibilidad de ambientación personalizada según tu estilo y necesidades. Además, nuestro equipo te asesora en la organización, decoración y logística para que tu evento sea distintivo, divertido y memorable.
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#5f2b4a] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Eventos para Adultos')}>
                Más Información
              </Button>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[url('/elegant-adult-party-dinner-celebration.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>

          {/* Eventos Corporativos - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="relative min-h-[400px] lg:min-h-full">
              <div className="absolute inset-0 bg-[url('/corporate-event-meeting-presentation-professional.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="bg-[#e0007b] text-white p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Eventos Corporativos</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                En Lotus ofrecemos un espacio versátil y elegante para todo tipo de eventos empresariales. Ideal para desayunos y almuerzos corporativos, workshops, exposiciones, presentaciones, reuniones de trabajo, lanzamientos de productos y fiestas de fin de año.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Nuestro salón cuenta con proyectores, pantallas, Wi-Fi y todos los recursos necesarios para que tu empresa realice un evento distintivo y profesional.
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#e0007b] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Eventos Corporativos')}>
                Más Información
              </Button>
            </div>
          </div>

          {/* Muestras de Arte - Content Left, Image Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="bg-[#5f2b4a] text-white p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Muestras de Arte</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                Lotus es ideal para realizar muestras de arte, finalizaciones de cursos o workshops. Un salón multifuncional ubicado en La Plata, perfecto para quienes buscan un lugar versátil donde el arte sea protagonista.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                El espacio cuenta con amplios salones de techos altos, iluminación ajustable y mobiliario modular que permite diseñar el recorrido de la muestra según cada proyecto. Además, ofrece servicio de recepción, ambientación personalizada y asistencia técnica.
              </p>
              <p className="text-white/90">
                <span className="font-semibold">Ideal para:</span> 🎨 Artistas independientes o colectivos • 🏛️ Instituciones culturales o educativas • 🍷 Organizadores de eventos culturales con recepción o brindis
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#5f2b4a] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Muestras de Arte')}>
                Más Información
              </Button>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[url('/art-gallery-exhibition-paintings-sculpture.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>

          {/* Ferias - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="relative min-h-[400px] lg:min-h-full">
              <div className="absolute inset-0 bg-[url('/market-fair-vendors-stands-entrepreneurs.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="bg-[#e0007b] text-white p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ferias</h3>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                En Lotus contamos con un espacio ideal para realizar ferias, exposiciones y encuentros de emprendedores. Nuestro salón combina comodidad, amplitud y un entorno natural perfecto para recibir al público.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                Podés distribuir stands, mesas y productos con total libertad, aprovechando tanto el espacio interior como el exterior. Además, ofrecemos asesoramiento en organización, ambientación y logística para que tu feria sea un éxito.
              </p>
              <p className="italic text-white/95 font-medium">
                Apoyamos el trabajo local y brindamos un lugar pensado para conectar, mostrar y vender.
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#e0007b] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Ferias')}>
                Más Información
              </Button>
            </div>
          </div>

          {/* Agasajos Especiales - Content Left, Image Right */}
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="bg-[#5f2b4a] text-white p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Agasajos Especiales</h3>
              <p className="text-lg leading-relaxed text-white/90">
                Cumpleaños, aniversarios, casamientos, bautismos, Bar/Bat-Mitzvá, Brit-Milá, Simjat-Bat, té de lluvias y más opciones. En Lotus te asesoramos para que encuentres la solución que estabas buscando.
              </p>
              <Button variant="outline" className="mt-8 bg-white text-[#5f2b4a] hover:bg-neutral-100 w-fit" onClick={() => openWhatsApp('Agasajos Especiales')}>
                Más Información
              </Button>
            </div>
            <div className="relative min-h-[400px] lg:min-h-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[url('/special-celebration-wedding-baptism-elegant.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta-section"
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div 
          className="absolute inset-0 bg-[url('/abstract-elegant-pattern.jpg')] bg-cover bg-center opacity-5"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              ¡Conocenos y Contactanos!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Transformá tu evento en una experiencia inolvidable
            </p>
            <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('contacto')}>
              Solicitá tu Presupuesto
            </Button>
          </div>
        </div>
      </section>

      {/* Galería Section */}
      <section id="galeria" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Galería de Fotos</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          {isGalleryLoading ? (
            <p className="text-center text-muted-foreground">Cargando galeria...</p>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  className="aspect-square bg-neutral-100 rounded-lg overflow-hidden group cursor-pointer focus:outline-none"
                  onClick={() => setSelectedImage(image)}
                  aria-label={image.alt || `Imagen de la galeria ${index + 1}`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url("${encodeURI(image.src)}")` }}
                      role="img"
                      aria-label={image.alt || `Imagen de la galeria ${index + 1}`}
                    />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No hay imagenes disponibles en este momento.</p>
          )}
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Consultanos para más información sobre nuestros servicios. ¡Vení a visitarnos y reservá tu fecha!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Formulario */}
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Teléfono</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tu teléfono"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="evento" className="block text-sm font-medium mb-2">Tipo de Evento</label>
                      <select
                        id="evento"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Cumpleaños Infantil</option>
                        <option>Fiesta Teens</option>
                        <option>Fiesta UPD</option>
                        <option>Evento Adultos</option>
                        <option>Evento Corporativo</option>
                        <option>Muestra de Arte</option>
                        <option>Feria</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Contanos sobre tu evento..."
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    Enviar Consulta
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Información de Contacto */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Dirección</h4>
                        <a
                          href="https://maps.app.goo.gl/UkvMBJaskj9FHhfBA" target="_blank"
                          className="text-muted-foreground hover:text-primary transition-smooth"
                        >
                          Calle 14 N° 619, La Plata
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Teléfono</h4>
                        <a
                          href="https://wa.me/5492214188503" target="_blank" className="text-muted-foreground hover:text-primary transition-smooth">
                          +54 9 2215607906
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <a
                            href="mailto:lotuseventoslp@gmail.com" target="_blank"
                            className="text-muted-foreground hover:text-primary transition-smooth"
                          >
                            lotuseventoslp@gmail.com
                          </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-neutral-200">
                    <h4 className="font-semibold mb-4">Seguinos en Redes</h4>
                    <div className="flex gap-4">
                      <Link href="https://www.instagram.com/lotuseventoslp/" target="_blank" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Instagram className="w-5 h-5" />
                      </Link>
                      {/*
                      <Link href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Facebook className="w-5 h-5" />
                      </Link>*/}
                    </div>
                  </div>
                </CardContent>
              </Card>

              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">LOTUS</h3>
              <p className="text-muted-foreground">
                Tu espacio para eventos inolvidables en el centro de La Plata.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-input">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => scrollToSection('nosotros')} className="hover:text-primary transition-colors">Nosotros</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="hover:text-primary transition-colors">Servicios</button></li>
                <li><button onClick={() => scrollToSection('galeria')} className="hover:text-primary transition-colors">Galería</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="hover:text-primary transition-colors">Contacto</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-input">Contacto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Buenos Aires, Argentina</li>
                <li>Calle 14 N° 619, La Plata</li>
                <li>+54 9 2215607906</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-200 text-center text-muted-foreground">
            <p>© 2025 LOTUS Eventos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/5492214188503"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircleMoreIcon className="w-6 h-6" />
      </a>
    </div>
  )
}
