import React from 'react'
import {
  Scale,
  Zap,
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AppPage } from '../hero/HeroNavigation'

interface AgbViewProps {
  onNavigate?: (page: AppPage) => void
}

export const AgbView: React.FC<AgbViewProps> = () => {
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation()

  const paragraphs = [
    {
      id: '1',
      title: '§1 Geltungsbereich',
      points: [
        'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Adamas Elektrotechnik (nachfolgend „Auftragnehmer“) und ihren Kunden (nachfolgend „Auftraggeber“) über Leistungen im Bereich der Elektrotechnik.',
        'Entgegenstehende oder abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, ihrer Geltung wurde ausdrücklich schriftlich zugestimmt.',
        'Diese AGB gelten sowohl gegenüber Verbrauchern (§ 13 BGB) als auch Unternehmern (§ 14 BGB), sofern nicht ausdrücklich zwischen diesen unterschieden wird.',
      ],
    },
    {
      id: '2',
      title: '§2 Leistungsumfang',
      customContent: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Der Auftragnehmer erbringt Leistungen insbesondere in folgenden Bereichen:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
            {[
              'Klassische Elektroinstallation (Neuinstallation, Sanierung, Innen- und Außenbereich)',
              'Smart Home- und Bussysteme (z. B. KNX)',
              'Kommunikations- und Sicherheitsleitungen',
              'Spezial- und Schutzleitungen (z. B. Potentialausgleich, Brandschutzverkabelung)',
              'Infrastruktur für Elektromobilität (z. B. Wallbox-Zuleitungen)',
              'Prüfung, Wartung und Instandhaltung elektrischer Anlagen',
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800"
              >
                <Zap className="w-4 h-4 text-[#F3A81D] flex-shrink-0 mt-0.5" />
                <span className="font-medium text-xs sm:text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-700 leading-relaxed text-sm pt-2">
            Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot, der Auftragsbestätigung oder dem geschlossenen Vertrag.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm">
            Technische Änderungen bleiben vorbehalten, sofern sie dem technischen Fortschritt dienen und für den Auftraggeber zumutbar sind.
          </p>
        </div>
      ),
    },
    {
      id: '3',
      title: '§3 Vertragsschluss',
      points: [
        'Angebote sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.',
        'Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung oder durch Beginn der Ausführung zustande.',
        'Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung.',
      ],
    },
    {
      id: '4',
      title: '§4 Preise und Zahlungsbedingungen',
      points: [
        'Es gelten die im Angebot vereinbarten Preise.',
        'Alle Preise verstehen sich in Euro. Gegenüber Verbrauchern inklusive gesetzlicher Mehrwertsteuer, gegenüber Unternehmern zzgl. gesetzlicher Mehrwertsteuer, sofern nicht anders vereinbart.',
        'Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zahlbar, sofern nichts anderes vereinbart wurde.',
        'Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in gesetzlicher Höhe zu verlangen.',
      ],
    },
    {
      id: '5',
      title: '§5 Ausführungsfristen',
      points: [
        'Vereinbarte Termine gelten nur dann als verbindlich, wenn sie ausdrücklich schriftlich bestätigt wurden.',
        'Verzögerungen aufgrund höherer Gewalt, Materialengpässen oder unvorhersehbaren Ereignissen verlängern die Ausführungsfrist angemessen.',
        'Schadensersatzansprüche wegen Verzögerung sind ausgeschlossen, sofern kein vorsätzliches oder grob fahrlässiges Verhalten vorliegt.',
      ],
    },
    {
      id: '6',
      title: '§6 Mitwirkungspflichten des Auftraggebers',
      points: [
        'Der Auftraggeber hat sicherzustellen, dass die Arbeitsbereiche frei zugänglich sind.',
        'Erforderliche Genehmigungen und Zustimmungen Dritter sind vom Auftraggeber rechtzeitig einzuholen, sofern nichts anderes vereinbart wurde.',
        'Verzögerungen aufgrund fehlender Mitwirkung gehen nicht zu Lasten des Auftragnehmers.',
      ],
    },
    {
      id: '7',
      title: '§7 Abnahme',
      points: [
        'Nach Fertigstellung der Arbeiten erfolgt eine Abnahme.',
        'Die Leistung gilt als abgenommen, wenn der Auftraggeber nicht innerhalb von 7 Tagen nach Fertigstellung wesentliche Mängel schriftlich rügt.',
        'Bei Ingebrauchnahme der Anlage gilt die Leistung ebenfalls als abgenommen.',
      ],
    },
    {
      id: '8',
      title: '§8 Gewährleistung',
      points: [
        'Es gelten die gesetzlichen Gewährleistungsrechte.',
        'Für Unternehmer beträgt die Gewährleistungsfrist 12 Monate ab Abnahme.',
        'Keine Gewährleistung besteht bei unsachgemäßer Nutzung, eigenmächtigen Änderungen oder Eingriffen durch Dritte.',
      ],
    },
    {
      id: '9',
      title: '§9 Haftung',
      points: [
        'Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit.',
        'Bei einfacher Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) und beschränkt auf den vorhersehbaren, vertragstypischen Schaden.',
        'Die Haftungsbeschränkungen gelten nicht bei Verletzung von Leben, Körper oder Gesundheit.',
      ],
    },
    {
      id: '10',
      title: '§10 Eigentumsvorbehalt',
      points: [
        'Gelieferte Materialien bleiben bis zur vollständigen Bezahlung Eigentum des Auftragnehmers.',
        'Bei Unternehmern gilt der erweiterte Eigentumsvorbehalt.',
      ],
    },
    {
      id: '11',
      title: '§11 Schlussbestimmungen',
      points: [
        'Es gilt das Recht der Bundesrepublik Deutschland.',
        'Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand Leverkusen.',
        'Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
      ],
    },
  ]

  return (
    <div className="space-y-12">
      {/* Intro Header Card */}
      <section
        ref={introRef}
        className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#041633] text-white flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-[#F3A81D]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#D81E26] uppercase tracking-wider block">
              Vertragsgrundlagen
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold text-slate-900 anim-fade-in ${
                introVisible ? 'is-visible' : ''
              }`}
            >
              Allgemeine Geschäftsbedingungen (AGB)
            </h2>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70 text-sm text-slate-700 leading-relaxed">
          <p className="font-bold text-slate-900 text-base mb-1">
            Adamas Elektrotechnik
          </p>
          <p>Maybachstr. 37 &middot; D-51381 Leverkusen &middot; Deutschland</p>
          <p className="font-medium text-slate-800 mt-1">Geschäftsführer: Erol Elmas</p>
        </div>
      </section>

      {/* Paragraphs List */}
      <div className="space-y-6">
        {paragraphs.map((p) => (
          <section
            key={p.id}
            id={`agb-section-${p.id}`}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm transition-all hover:border-slate-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#041633] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                §{p.id}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {p.title}
              </h3>
            </div>

            {p.customContent ? (
              p.customContent
            ) : (
              <ul className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {p.points?.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D81E26] mt-2.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
