import React from 'react'
import {
  ShieldCheck,
  Eye,
  Server,
  FileText,
  Lock,
  ExternalLink,
  CheckCircle2,
  Database,
  BarChart3,
  Layers,
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AppPage } from '../hero/HeroNavigation'

interface DatenschutzViewProps {
  onNavigate?: (page: AppPage) => void
}

export const DatenschutzView: React.FC<DatenschutzViewProps> = () => {
  const { ref: s1Ref, isVisible: s1Visible } = useScrollAnimation()
  const { ref: s2Ref, isVisible: s2Visible } = useScrollAnimation()
  const { ref: s3Ref, isVisible: s3Visible } = useScrollAnimation()
  const { ref: s4Ref, isVisible: s4Visible } = useScrollAnimation()
  const { ref: s5Ref, isVisible: s5Visible } = useScrollAnimation()
  const { ref: s6Ref, isVisible: s6Visible } = useScrollAnimation()

  return (
    <div className="space-y-12">
      {/* Introduction Banner */}
      <div className="bg-[#041633] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#092654] border border-white/15 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#F3A81D]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              Datenschutzerklärung
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Erklärung.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Datenschutz auf einen Blick */}
      <section
        ref={s1Ref}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#041633] flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5 text-[#0E1E38]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Kapitel 1
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                s1Visible ? 'is-visible' : ''
              }`}
            >
              1. Datenschutz auf einen Blick
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Allgemeine Hinweise
            </h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie der folgenden Datenschutzerklärung.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
              Datenerfassung auf dieser Website
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                </h4>
                <p className="text-sm text-slate-600">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Wie erfassen wir Ihre Daten?
                </h4>
                <p className="text-sm text-slate-600 mb-2">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-sm text-slate-600">
                  Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Wofür nutzen wir Ihre Daten?
                </h4>
                <p className="text-sm text-slate-600">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Welche Rechte haben Sie bezüglich Ihrer Daten?
                </h4>
                <p className="text-sm text-slate-600 mb-2">
                  Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                </p>
                <p className="text-sm text-slate-600">
                  Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hosting und Content Delivery Networks (CDN) */}
      <section
        ref={s2Ref}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Server className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Kapitel 2
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                s2Visible ? 'is-visible' : ''
              }`}
            >
              2. Hosting und Content Delivery Networks (CDN)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Externes Hosting
          </h3>
          <p>
            Diese Website wird bei einem externen Dienstleister (Hoster) gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
          </p>
          <p>
            Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) sowie im Interesse einer sicheren und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="text-sm font-medium text-slate-900">
              Wir haben einen Vertrag über Auftragsverarbeitung mit unserem Hoster geschlossen.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
      <section
        ref={s3Ref}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#F3A81D] flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#F3A81D]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Kapitel 3
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                s3Visible ? 'is-visible' : ''
              }`}
            >
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          {/* Datenschutz Grundsatz */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Datenschutz
            </h3>
            <p className="mb-2">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="text-sm text-slate-500">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
            </p>
          </div>

          {/* Hinweis zur verantwortlichen Stelle */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D81E26]" />
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="text-sm text-slate-800 space-y-1 bg-white p-4 rounded-xl border border-slate-200/60 max-w-md">
              <p className="font-bold text-slate-900">Adamas Elektrotechnik</p>
              <p>Maybachstr. 37</p>
              <p>D-51381 Leverkusen</p>
              <p>Deutschland</p>
              <p className="pt-2 font-medium text-slate-900">Geschäftsführer: Erol Elmas</p>
            </div>
          </div>

          {/* Widerruf Ihrer Einwilligung */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
            </p>
          </div>

          {/* Widerspruchsrecht Art. 21 DSGVO */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Widerspruchsrecht nach Art. 21 DSGVO
            </h3>
            <p className="mb-2">
              Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch einzulegen.
            </p>
            <p>
              Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch einzulegen.
            </p>
          </div>

          {/* Beschwerderecht */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Beschwerderecht bei der zuständigen Aufsichtsbehörde
            </h3>
            <p>
              Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
            </p>
          </div>

          {/* Recht auf Datenübertragbarkeit */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Recht auf Datenübertragbarkeit
            </h3>
            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, in einem maschinenlesbaren Format zu erhalten.
            </p>
          </div>

          {/* SSL/TLS */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F3A81D]" />
              SSL- bzw. TLS-Verschlüsselung
            </h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
            </p>
          </div>

          {/* Auskunft, Löschung und Berichtigung */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Auskunft, Löschung und Berichtigung
            </h3>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten sowie auf Berichtigung oder Löschung.
            </p>
          </div>

          {/* Recht auf Einschränkung der Verarbeitung */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Recht auf Einschränkung der Verarbeitung
            </h3>
            <p>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </p>
          </div>

          {/* Widerspruch gegen Werbe-E-Mails */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Widerspruch gegen Werbe-E-Mails
            </h3>
            <p>
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung nicht ausdrücklich angeforderter Werbung wird hiermit widersprochen.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Datenerfassung auf dieser Website */}
      <section
        ref={s4Ref}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Database className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Kapitel 4
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                s4Visible ? 'is-visible' : ''
              }`}
            >
              4. Datenerfassung auf dieser Website
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          {/* Cookies */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Cookies
            </h3>
            <p className="mb-2">
              Unsere Internetseiten verwenden sogenannte „Cookies“. Cookies richten auf Ihrem Endgerät keinen Schaden an.
            </p>
            <p>
              Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Sofern eine Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
            </p>
          </div>

          {/* Server-Log-Dateien */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Server-Log-Dateien
            </h3>
            <p className="mb-2">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien.
            </p>
            <p>
              Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          {/* Anfrage per E-Mail oder Telefon */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              Anfrage per E-Mail oder Telefon
            </h3>
            <p className="mb-2">
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller personenbezogenen Daten zum Zwecke der Bearbeitung gespeichert.
            </p>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Analyse-Tools */}
      <section
        ref={s5Ref}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-700 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-cyan-700" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Kapitel 5
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                s5Visible ? 'is-visible' : ''
              }`}
            >
              5. Analyse-Tools
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            WP Statistics
          </h3>
          <p>
            Diese Website nutzt das WordPress-Plugin WP Statistics zur anonymisierten Auswertung der Besucherzugriffe.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Es werden keine Cookies gesetzt und keine Nutzerprofile erstellt.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Die IP-Adressen werden anonymisiert gespeichert.</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </div>
      </section>

      {/* 6. Plugins und Tools */}
      <section
        ref={s6Ref}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#D81E26] flex items-center justify-center flex-shrink-0">
            <Layers className="w-5 h-5 text-[#D81E26]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Kapitel 6
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                s6Visible ? 'is-visible' : ''
              }`}
            >
              6. Plugins und Tools
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Google Maps
          </h3>
          <p>
            Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
          </p>
          <p>
            Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an Server von Google übertragen.
          </p>
          <p className="text-xs sm:text-sm text-slate-500">
            Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <div className="pt-2">
            <a
              href="https://policies.google.com/privacy?hl=de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D81E26] hover:underline"
            >
              <span>Mehr Informationen finden Sie in der Datenschutzerklärung von Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
