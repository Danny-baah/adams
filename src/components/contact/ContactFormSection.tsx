import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  ListFilter,
  MessageSquare,
  ArrowRight,
  MapPin,
  Smartphone,
  CheckCircle2,
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const ContactFormSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyAccepted: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.privacyAccepted) {
      alert('Bitte stimmen Sie den Hinweisen zum Datenschutz zu.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  return (
    <section
      ref={ref}
      id="contact-form"
      className="relative py-24 sm:py-32 bg-[#FFFFFF] text-slate-900 border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-16 sm:mb-20">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#D81E26]" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
              KONTAKT
            </span>
            <span className="w-5 h-[2px] bg-[#D81E26]" />
          </div>

          {/* Headline - Fades in */}
          <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.18] mb-4`}>
            Wir freuen uns auf Ihre <span className="text-[#D81E26]">Anfrage.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            Nehmen Sie einfach Kontakt mit uns auf. Wir beraten Sie gerne und melden uns schnellstmöglich bei Ihnen.
          </p>
        </div>

        {/* 2-Column Form & Contact Info Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Form Card Header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-6 bg-[#F3A81D] rounded-full inline-block" />
                <h3 className="text-xl sm:text-2xl font-bold text-[#0E1E38] tracking-tight">
                  Ihre Nachricht an uns
                </h3>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0E1E38] mb-2">
                    Vielen Dank für Ihre Nachricht!
                  </h4>
                  <p className="text-slate-600 max-w-md mb-6 leading-relaxed">
                    Wir haben Ihre Anfrage erfolgreich erhalten und werden uns schnellstmöglich persönlich bei Ihnen melden.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        privacyAccepted: false,
                      })
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0E1E38] text-white font-semibold text-sm hover:bg-[#16305a] transition-colors"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Row 1: Name & E-Mail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-800">
                        Name <span className="text-[#D81E26]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ihr Name"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81E26]/20 focus:border-[#D81E26] transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-800">
                        E-Mail-Adresse <span className="text-[#D81E26]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Ihre E-Mail-Adresse"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81E26]/20 focus:border-[#D81E26] transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-800">
                        Telefonnummer
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Ihre Telefonnummer"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81E26]/20 focus:border-[#D81E26] transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-800">
                        Betreff <span className="text-[#D81E26]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <ListFilter className="w-4 h-4" />
                        </div>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81E26]/20 focus:border-[#D81E26] transition-all shadow-xs appearance-none cursor-pointer"
                        >
                          <option value="">Bitte wählen ...</option>
                          <option value="elektroinstallation">Klassische Elektroinstallation</option>
                          <option value="smarthome">Smart Home &amp; KNX</option>
                          <option value="sicherheit">Sicherheits- &amp; Kommunikationstechnik</option>
                          <option value="beleuchtung">Beleuchtungstechnik</option>
                          <option value="emobilitaet">E-Mobilität / Wallbox</option>
                          <option value="wartung">Prüfung &amp; Wartung (E-Check)</option>
                          <option value="allgemein">Allgemeine Anfrage</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Ihre Nachricht <span className="text-[#D81E26]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ihre Nachricht an uns ..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#D81E26]/20 focus:border-[#D81E26] transition-all shadow-xs resize-y"
                      />
                    </div>
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="privacyCheckbox"
                      required
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-[#D81E26] focus:ring-[#D81E26] cursor-pointer"
                    />
                    <label htmlFor="privacyCheckbox" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                      Ich habe die Hinweise zum{' '}
                      <span className="text-[#D81E26] underline font-medium">Datenschutz</span>{' '}
                      gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.{' '}
                      <span className="text-[#D81E26]">*</span>
                    </label>
                  </div>

                  {/* Submit Button - Slides in from Left */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`anim-slide-left ${isVisible ? 'is-visible' : ''} delay-200 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm sm:text-base shadow-lg shadow-red-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-70 group`}
                    >
                      <span>{isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Info Card */}
          <div className="lg:col-span-5 bg-[#06152B] text-white rounded-3xl shadow-2xl overflow-hidden relative p-8 sm:p-10 flex flex-col justify-between border border-slate-800">
            
            {/* Background Image of Circuit Breakers on the Right Edge with Yellow Swoosh */}
            <div className="absolute top-0 right-0 bottom-0 w-2/5 pointer-events-none opacity-50 lg:opacity-75 overflow-hidden">
              <img
                src="/contact/contact_card_panel.jpg"
                alt="ADAMAS Schaltschrank"
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06152B] via-[#06152B]/60 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-[2.5px] bg-[#F3A81D]" />
                  <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F3A81D] uppercase">
                    KONTAKTINFORMATIONEN
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 font-normal mb-8">
                  So erreichen Sie uns direkt:
                </p>

                {/* 4 Info Items */}
                <div className="flex flex-col gap-6">
                  {/* Adresse */}
                  <div className="flex items-start gap-4 pb-5 border-b border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-[#11233D] border border-white/15 flex items-center justify-center text-[#F3A81D] flex-shrink-0 shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Adresse
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-white leading-snug">
                        Maybachstr. 37<br />
                        51381 Leverkusen, Deutschland
                      </span>
                    </div>
                  </div>

                  {/* E-Mail */}
                  <div className="flex items-center gap-4 pb-5 border-b border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-[#11233D] border border-white/15 flex items-center justify-center text-[#F3A81D] flex-shrink-0 shadow-md">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        E-Mail
                      </span>
                      <a
                        href="mailto:info@elektro-adamas.de"
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#F3A81D] transition-colors"
                      >
                        info@elektro-adamas.de
                      </a>
                    </div>
                  </div>

                  {/* Telefon */}
                  <div className="flex items-center gap-4 pb-5 border-b border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-[#11233D] border border-white/15 flex items-center justify-center text-[#F3A81D] flex-shrink-0 shadow-md">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Telefon
                      </span>
                      <a
                        href="tel:+492122309840"
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#F3A81D] transition-colors"
                      >
                        +49 (212) 230 98 40
                      </a>
                    </div>
                  </div>

                  {/* Mobil */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#11233D] border border-white/15 flex items-center justify-center text-[#F3A81D] flex-shrink-0 shadow-md">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Mobil
                      </span>
                      <a
                        href="tel:+491631597573"
                        className="text-sm sm:text-base font-semibold text-white hover:text-[#F3A81D] transition-colors"
                      >
                        +49 163 159 75 73
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

