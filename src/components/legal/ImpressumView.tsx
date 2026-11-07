import React from 'react'
import {
  Scale,
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  Globe,
  ShieldAlert,
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AppPage } from '../hero/HeroNavigation'

interface ImpressumViewProps {
  onNavigate?: (page: AppPage) => void
}

export const ImpressumView: React.FC<ImpressumViewProps> = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: discRef, isVisible: discVisible } = useScrollAnimation()
  const { ref: haftRef, isVisible: haftVisible } = useScrollAnimation()

  return (
    <div className="space-y-12">
      {/* 1. Herausgeber dieser Seite Card */}
      <section
        ref={headerRef}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#041633] text-white flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-[#F3A81D]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Pflichtangaben nach § 5 DDG
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                headerVisible ? 'is-visible' : ''
              }`}
            >
              Herausgeber dieser Seite
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Company & Management */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                Unternehmensbezeichnung
              </span>
              <p className="text-base font-bold text-slate-900">
                Adamas Elektrotechnik
              </p>
              <div className="flex items-start gap-2 mt-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[#D81E26] mt-0.5 flex-shrink-0" />
                <span>
                  Maybachstr. 37<br />
                  D-51381 Leverkusen<br />
                  Germany
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                Vertretungsberechtigte Geschäftsführung
              </span>
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <User className="w-4 h-4 text-[#F3A81D]" />
                <span>Geschäftsführer: Erol Elmas</span>
              </div>
            </div>
          </div>

          {/* Contact Details & Direct Actions */}
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
              Direkte Kontaktaufnahme
            </span>

            <div className="space-y-3 text-sm">
              <a
                href="tel:+492122309840"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#041633] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 text-[#F3A81D]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Telefon</span>
                  <span className="font-semibold text-slate-900 group-hover:text-[#D81E26] transition-colors">
                    +49 (212) 230 98 40
                  </span>
                </div>
              </a>

              <a
                href="tel:+491631597573"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#041633] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 text-[#F3A81D]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Mobil</span>
                  <span className="font-semibold text-slate-900 group-hover:text-[#D81E26] transition-colors">
                    +49 163 159 75 73
                  </span>
                </div>
              </a>

              <a
                href="mailto:info@elektro-adamas.de"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#041633] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 text-[#F3A81D]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">E-Mail</span>
                  <span className="font-semibold text-slate-900 group-hover:text-[#D81E26] transition-colors">
                    info@elektro-adamas.de
                  </span>
                </div>
              </a>

              <a
                href="https://elektro-adamas.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#041633] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4 text-[#F3A81D]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Internetadresse</span>
                  <span className="font-semibold text-slate-900 group-hover:text-[#D81E26] transition-colors">
                    https://elektro-adamas.de
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Disclaimer Card */}
      <section
        ref={discRef}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#F3A81D] flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-[#F3A81D]" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Rechtliche Bedingungen
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                discVisible ? 'is-visible' : ''
              }`}
            >
              Disclaimer
            </h2>
          </div>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Das Setzen eines Links von Web-Sites Dritter zur Web-Site der Adamas Elektrotechnik ist erlaubt, solange kenntlich gemacht wird, dass es sich um Inhalte der Web-Site der Adamas Elektrotechnik handelt und diese Inhalte nicht in Verbindung mit Inhalten Dritter gebracht werden, die den Interessen der Adamas Elektrotechnik widersprechen. Dies gilt insbesondere für Web-Sites mit ungesetzlichen Inhalten.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#F3A81D] text-slate-800">
            <p className="font-medium">
              Jede anderweitige Verwertung, die nicht ausdrücklich vom Urheberrechtsgesetz zugelassen ist, bedarf der vorherigen schriftlichen Erlaubnis der Adamas Elektrotechnik.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Haftungsausschluss Card */}
      <section
        ref={haftRef}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#D81E26] flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-[#D81E26]" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Haftung &amp; Urheberrechte
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                haftVisible ? 'is-visible' : ''
              }`}
            >
              Haftungsausschluss
            </h2>
          </div>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          {/* 1. Inhalte des Onlineangebotes */}
          <div className="border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D81E26]" />
              Inhalte des Onlineangebotes
            </h3>
            <p>
              Die Adamas Elektrotechnik übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen die Adamas Elektrotechnik, die sich auf Schäden materieller oder ideeller Art beziehen, welche durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens der Adamas Elektrotechnik kein nachweislich vorsätzliches Handeln vorliegt.
            </p>
          </div>

          {/* 2. Marken & Produkte */}
          <div className="border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F3A81D]" />
              Marken- und Warenzeichenrechte
            </h3>
            <p>
              Die Nennung von Produkten und Marken anderer Hersteller oder Anbieter dient ausschließlich der Information und stellt keine Empfehlung dar. Demzufolge verletzt die Nennung keine Warenzeichen- oder Markenrechte.
            </p>
          </div>

          {/* 3. Angebote freibleibend */}
          <div className="border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D81E26]" />
              Änderungsvorbehalt
            </h3>
            <p>
              Alle Angebote sind freibleibend und unverbindlich. Die Adamas Elektrotechnik behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
            </p>
          </div>

          {/* 4. Verweise und Links */}
          <div className="border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F3A81D]" />
              Verweise und Verlinkungen („Links“)
            </h3>
            <p className="mb-3">
              Sofern auf Verweisziele („Links“) direkt oder indirekt verwiesen wird, die außerhalb des Verantwortungsbereiches der Adamas Elektrotechnik liegen, haftet diese nur dann, wenn sie von den Inhalten Kenntnis hat und es ihr technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
            </p>
            <p className="mb-3">
              Für darüber hinausgehende Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              Diese Einschränkung gilt gleichermaßen auch für Fremdeinträge in von der Adamas Elektrotechnik eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten.
            </p>
          </div>

          {/* 5. Urheberrecht */}
          <div className="border-b border-slate-100 pb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D81E26]" />
              Urheber- und Kennzeichenrecht
            </h3>
            <p className="mb-3">
              Die Adamas Elektrotechnik ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihr selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen.
            </p>
            <p>
              Das Copyright für veröffentlichte, von der Adamas Elektrotechnik selbst erstellte Objekte bleibt allein bei der Adamas Elektrotechnik. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung der Adamas Elektrotechnik nicht gestattet.
            </p>
          </div>

          {/* 6. Salvatorische Klausel */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Rechtswirksamkeit dieses Haftungsausschlusses
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
