import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowDown,
  Hammer,
  ShieldCheck,
  MousePointerClick,
  Wrench,
  UserX,
  Ghost,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';
import ProcessStep from '@/components/ProcessStep';
import PricingCard from '@/components/PricingCard';
import CarePlanCard from '@/components/CarePlanCard';
import FaqAccordion from '@/components/FaqAccordion';
import { src, images, site } from '@/lib/assets';
import { painPoints, processSteps, buildPlans, carePlans, faqs } from '@/lib/content';

const painIcons = [Wrench, UserX, Ghost];
const stepIcons = [MousePointerClick, Hammer, ShieldCheck];

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── 1. HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-paper-fade">
        {/* Soft brand glows — keeps the white space feeling warm rather than empty */}
        <div
          className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full
                     bg-brand-orange/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full
                     bg-brand-navy/5 blur-3xl"
          aria-hidden
        />

        <div className="container relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-32">
          <div className="animate-fade-up">
            <p className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Websites for small business
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[3.5rem]">
              A Professional Website That{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Brings You Customers</span>
                <span
                  className="absolute inset-x-0 bottom-1.5 z-0 h-3 rounded-full bg-brand-orange/25 sm:bottom-2 sm:h-4"
                  aria-hidden
                />
              </span>{' '}
              — Without the Tech Headaches.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-navy/70">
              You focus on running your business. We&rsquo;ll build a beautiful website that gets
              you found, and we&rsquo;ll handle all the ongoing maintenance so you never have to
              stress about it breaking.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href="#pricing" className="btn-primary w-full sm:w-auto">
                See Our Packages
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="#process" className="btn-secondary w-full sm:w-auto">
                How It Works
              </Link>
            </div>

            <p className="mt-5 text-sm font-semibold text-brand-navy/55">
              Simple, transparent pricing for small businesses.
            </p>

            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-brand-navy/10 pt-7">
              {[
                { Icon: Clock, label: 'Launch in 2–3 weeks' },
                { Icon: ShieldCheck, label: 'Care plan included' },
                { Icon: TrendingUp, label: 'Built to get found' },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-bold text-brand-navy/65">
                  <Icon className="h-4 w-4 text-brand-orange" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Higgsfield hero image */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-4xl bg-white shadow-lift ring-1 ring-brand-navy/10">
              <Image
                src={src('hero')}
                alt={images.hero.alt}
                width={2688}
                height={1536}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating proof chip */}
            <div
              className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border
                         border-brand-navy/10 bg-white px-5 py-4 shadow-lift sm:flex lg:-left-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange-tint">
                <TrendingUp className="h-5 w-5 text-brand-orange" aria-hidden />
              </span>
              <span>
                <span className="block text-xl font-extrabold leading-none text-brand-navy">+40%</span>
                <span className="mt-1 block text-xs font-bold text-brand-navy/55">
                  monthly enquiries
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 2. THE AGITATOR ───────────────────── */}
      <section className="border-y border-brand-navy/10 bg-white py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Sound familiar?"
            title={
              <>
                Let&rsquo;s be honest: building a website shouldn&rsquo;t feel like a{' '}
                <span className="text-brand-orange">second full-time job.</span>
              </>
            }
            lede="Most small business owners we talk to are dealing with one of these three headaches:"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {painPoints.map((pain, i) => {
              const Icon = painIcons[i];
              return (
                <div
                  key={pain.title}
                  className="group rounded-2xl border border-brand-navy/10 bg-brand-paper p-8
                             transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange/30
                             hover:bg-white hover:shadow-lift"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-brand-navy/5">
                    <Icon className="h-6 w-6 text-brand-navy/70 transition-colors group-hover:text-brand-orange" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-extrabold tracking-tight text-brand-navy">
                    {pain.title}
                  </h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-brand-navy/70">
                    {pain.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Conclusion / turn */}
          <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-navy-fade px-8 py-10 text-center shadow-lift sm:px-12">
            <ArrowDown className="mx-auto h-6 w-6 text-brand-orange" aria-hidden />
            <p className="mt-5 text-xl font-extrabold leading-snug text-white sm:text-2xl">
              It doesn&rsquo;t have to be this way.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
              We give you a done-for-you service with a long-term partner you can actually reach.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── 3. THE 3-STEP PROCESS ───────────────── */}
      <section id="process" className="relative overflow-hidden bg-brand-paper py-20 sm:py-32">
        {/* Higgsfield honeycomb texture, dialled right down so it reads as paper, not pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
          <Image
            src={src('honeycomb')}
            alt=""
            fill
            aria-hidden
            className="object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-paper via-brand-paper/60 to-brand-paper"
          aria-hidden
        />

        <div className="container relative">
          <SectionHeading
            eyebrow="The Hive process"
            title="How It Works: Getting Online is Easy."
            lede="Three steps, no jargon, and no homework for you beyond a logo and a few details."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.step}
                step={step.step}
                title={step.title}
                body={step.body}
                Icon={stepIcons[i]}
                isLast={i === processSteps.length - 1}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="#pricing" className="btn-primary">
              Start with Step 1
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── 4. FEATURED CASE STUDY ───────────────── */}
      <section id="work" className="bg-white py-20 sm:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-4xl bg-brand-navy-tint"
              aria-hidden
            />
            <Image
              src={src('caseStudy')}
              alt={images.caseStudy.alt}
              width={2432}
              height={1792}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="w-full rounded-2xl shadow-lift ring-1 ring-brand-navy/10"
            />
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Featured work"
              title="See What A Great Website Can Do."
              align="left"
            />

            <blockquote className="mt-8 border-l-4 border-brand-orange pl-6">
              <p className="text-[1.05rem] leading-relaxed text-brand-navy/75">
                &ldquo;We designed a clean, fast-loading website focused on getting their phone to
                ring. Now, they have a digital storefront working for them 24/7, resulting in a{' '}
                <strong className="font-extrabold text-brand-navy">
                  40% increase in monthly inquiries
                </strong>{' '}
                and saving them hours of technical frustration.&rdquo;
              </p>
            </blockquote>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-navy/10 pt-8">
              {[
                { value: '+40%', label: 'Monthly enquiries' },
                { value: '24/7', label: 'Always working' },
                { value: '0 hrs', label: 'Of your tech time' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-extrabold tracking-tight text-brand-orange sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-xs font-bold leading-snug text-brand-navy/55 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <Link href="#pricing" className="btn-primary mt-10">
              I want results like this
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── 5. PRICING (BUILDS) ───────────────── */}
      <section id="pricing" className="border-y border-brand-navy/10 bg-paper-fade py-20 sm:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="Website builds"
            title="Transparent Pricing for Small Businesses."
            lede="A single upfront price for your build. No hourly billing, no scope games, no surprise invoices."
          />

          <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
            {buildPlans.map((plan) => (
              <PricingCard key={plan.slug} {...plan} />
            ))}
          </div>

          <p className="mt-12 text-center text-sm font-semibold text-brand-navy/55">
            Every build includes a Care Plan so your site stays secure, fast and up to date.{' '}
            <Link href="#care" className="font-bold text-brand-orange underline-offset-4 hover:underline">
              See the care plans
            </Link>
          </p>
        </div>
      </section>

      {/* ───────────────── 6. CARE PLANS ───────────────── */}
      <section id="care" className="bg-white py-20 sm:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="Ongoing care"
            title="Included Peace of Mind: Your Monthly Care Plan."
            lede="A website is like a car—it needs regular maintenance to run smoothly. Every website we build comes with ongoing care so it stays secure, fast, and updated. You choose the level that fits you."
          />

          <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
            {carePlans.map((plan) => (
              <CarePlanCard key={plan.slug} {...plan} />
            ))}
          </div>

          <p className="mt-12 text-center text-sm font-semibold text-brand-navy/55">
            Annual billing saves 15%. Care plans run for an initial 12 months from launch.
          </p>
        </div>
      </section>

      {/* ───────────────── 7. FAQ ───────────────── */}
      <section id="faq" className="border-t border-brand-navy/10 bg-brand-paper py-20 sm:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="Good questions"
            title="The Things Everyone Asks Us."
            lede="Straight answers, no fine print."
          />

          <div className="mx-auto mt-14 max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />

            <p className="mt-10 text-center text-[0.975rem] font-semibold text-brand-navy/60">
              Still wondering about something?{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-extrabold text-brand-orange underline-offset-4 hover:underline"
              >
                Email us at {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
