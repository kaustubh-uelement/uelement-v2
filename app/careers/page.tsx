import Link from 'next/link';
import type { Metadata } from 'next';
import OpenPositions from '@/components/careers/OpenPositions';

export const metadata: Metadata = {
  title: 'Careers — UElement Technologies',
  description:
    'Do the work your grandkids will brag about. Quantum-safe banking rails, autonomy that survives when the network dies, machines that keep nations running.',
};

export default function CareersPage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="hero hero-half">
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Company / Careers
          </div>
          <div className="kicker">Careers</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Do the work your grandkids will brag about.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Quantum-safe banking rails. Autonomy that survives when the network
            dies. Machines that keep nations running. This is not another SaaS
            job — this is sovereign DeepTech, and it needs you.
          </p>

          <div
            className="grid2"
            style={{ marginTop: 44, gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            <div className="stat">
              <b>3</b>
              <span>Countries — Pune HQ, Singapore, UAE</span>
            </div>
            <div className="stat">
              <b>2+1</b>
              <span>DeepTech programs and a quantum practice to build in</span>
            </div>
            <div className="stat">
              <b>∞</b>
              <span>Problems that have never been solved before</span>
            </div>
            <div className="stat">
              <b>1</b>
              <span>Standard: systems that cannot fail</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ REASONS TO JOIN ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker" style={{ color: 'var(--navy-800)' }}>
            Why join
          </div>
          <h2 className="display text-navy-gradient">
            Reasons this beats <span className="au">your current job.</span>
          </h2>
          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <h4>Your code guards nations</h4>
              <p>
                The systems you build here protect banking rails, defence
                networks, and critical infrastructure. When you ship, it matters
                at national scale.
              </p>
            </div>
            <div className="card">
              <h4>Quantum decade, front row</h4>
              <p>
                Post-quantum migration, QKD, tactical-edge autonomy, agentic AI
                — you&apos;ll work on the problems the rest of the industry will
                discover in five years.
              </p>
            </div>
            <div className="card">
              <h4>Small teams, real authority</h4>
              <p>
                Program-level ownership from early. You won&apos;t be a cog —
                you&apos;ll be the person whose name is on the architecture
                document.
              </p>
            </div>
            <div className="card">
              <h4>Engineering-led culture</h4>
              <p>
                Air-gap first, evidence over assertion, resilience by
                construction. We hold the bar because our customers cannot
                afford anything less.
              </p>
            </div>
            <div className="card">
              <h4>Grow with the programs</h4>
              <p>
                U234 MainSTAY, U235 MainSPAR, and U92 are compounding. Join
                while the story is being written, not after.
              </p>
            </div>
            <div className="card">
              <h4>Three offices, one team</h4>
              <p>
                Build from Pune, Singapore, or the UAE — with customers and
                deployments across regions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CULTURE: RADIOACTIVE STARTUP ═══════ */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Culture</div>
          <h2 className="display">
            We&apos;re a radioactive startup.
            <br />
            Every hire is an <span className="au">isotope.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Stable elements sit in the ground doing nothing for a billion years.
            Isotopes are the ones that actually <em>emit</em>. Same atomic
            number as everyone else, different energy entirely. That&apos;s the
            hiring bar — not &quot;culture fit,&quot; culture{' '}
            <em>reactivity</em>.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Half-life</div>
              <h4>Short by design</h4>
              <p>
                If you&apos;re doing the same job in 18 months, we failed you.
                Roles here decay into bigger roles. That&apos;s not attrition —
                that&apos;s the decay chain working as intended.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Critical mass</div>
              <h4>Small teams, supercritical</h4>
              <p>
                Four people who actually ship &gt; forty who align on alignment.
                We keep pods small enough that the chain reaction sustains
                itself without a committee moderating the neutrons.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Chain reaction</div>
              <h4>One idea splits the next</h4>
              <p>
                Someone drops a thought in Slack at 11pm, three people fission
                off it by morning, and it&apos;s in the architecture doc by
                Friday. No gatekeeping. No &quot;let&apos;s take this
                offline.&quot;
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Containment</div>
              <h4>We shield, we don&apos;t suppress</h4>
              <p>
                Strong opinions are the fuel — we just build the reactor around
                them. Disagree with the CEO in the thread. Bring receipts. Best
                argument wins, seniority doesn&apos;t.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Atomic number</div>
              <h4>Same element, different mass</h4>
              <p>
                We all share the same core — sovereignty, craft, receipts over
                vibes. Everything else about you can and should be different.
                Homogeneous teams are inert.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Activity</div>
              <h4>Measured in output, not hours</h4>
              <p>
                Nobody&apos;s counting your seat time. We count decays per
                second. Ship the thing, then go touch grass — genuinely, please,
                the grass is right there.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CULTURE PRINCIPLES ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div className="grid2">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>Async by default.</b>{' '}
                That meeting <em>was</em> a message. We sent the message.
              </li>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  Memes are a valid PR comment.
                </b>{' '}
                A well-placed reaction gif has closed more design debates than
                any RFC.
              </li>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  No &quot;we&apos;re a family.&quot;
                </b>{' '}
                We&apos;re a team. Teams have standards, families have
                obligations. You can leave a team on good terms.
              </li>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  Radical transparency, actual version.
                </b>{' '}
                Roadmaps, wins, and the losses. Especially the losses.
              </li>
            </ul>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  Delulu is allowed, receipts are mandatory.
                </b>{' '}
                Pitch the impossible thing — then show the benchmark.
              </li>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  Your setup, your rules.
                </b>{' '}
                Vim or VS Code, dark mode or feral light mode, 6am or 6pm. We
                care about the artifact.
              </li>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  Mental health isn&apos;t a perk slide.
                </b>{' '}
                Burnout is a reactor failure, not a badge. We staff for
                sustainable output.
              </li>
              <li className="mut">
                <b style={{ color: 'var(--ink-900)' }}>
                  Learning budget that&apos;s actually spent.
                </b>{' '}
                Quantum papers, conferences, that course you keep bookmarked.
                Go.
              </li>
            </ul>
          </div>

          <p className="mut" style={{ marginTop: 32, fontSize: 13.5 }}>
            Not compliant with: performative standups, &quot;quick syncs&quot;
            that aren&apos;t, LinkedIn-voice, unpaid overtime cosplaying as
            passion.
          </p>

          <p className="serif-line" style={{ marginTop: 28, maxWidth: 620 }}>
            Stability is overrated. Bring your instability — we&apos;ll build
            the reactor around it.
          </p>
        </div>
      </div>

      {/* ═══════ OPEN ROLES ═══════ */}
      <OpenPositions />

      {/* ═══════ HIRING PROCESS ═══════ */}
      <div className="section navy">
        <div className="wrap grid2" style={{ alignItems: 'center' }}>
          <div>
            <div className="kicker">The process</div>
            <h2 className="display">
              Four steps. <span className="au">No riddles.</span>
            </h2>
            <p className="mut" style={{ marginTop: 18 }}>
              Somewhere in Pune, a team is building what the next decade runs
              on. The only question is whether you&apos;re in the room.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <b>01 · Conversation</b>
              <p>
                A real discussion about your work and what you want to build —
                not a screening script.
              </p>
            </div>
            <div className="step">
              <b>02 · Deep dive</b>
              <p>
                Technical or functional session on problems close to the actual
                role. Bring opinions.
              </p>
            </div>
            <div className="step">
              <b>03 · Program fit</b>
              <p>
                Meet the people you&apos;d build with — leadership included. Ask
                us the hard questions.
              </p>
            </div>
            <div className="step">
              <b>04 · Offer</b>
              <p>
                Clear terms, quick decision. We don&apos;t leave great people
                waiting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CLOSING CTA ═══════ */}
      <div className="section cream">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p className="serif-line" style={{ maxWidth: 760, margin: '0 auto' }}>
            Somewhere in Pune, a team is building what the next decade runs on.
          </p>
          <p
            className="mut"
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-heading)',
              fontSize: 12,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            The only question is whether you&apos;re in the room
          </p>
          <Link
            href="/contact"
            className="btn btn-gold"
            style={{ marginTop: 28 }}
          >
            Write to us
          </Link>
        </div>
      </div>
    </>
  );
}
