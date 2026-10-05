import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from 'motion/react';
import { contact, profile } from '@/data/profile';
import { MaskBlock } from '@/components/Reveal';
import { Portrait } from '@/components/Portrait';
import { Spark } from '@/components/Spark';
import { ButtonLink } from '@/components/Button';
import { useNearViewport, usePrefersReducedMotion } from '@/hooks/useEnvironment';
import { EASE_OUT_EXPO } from '@/components/motion';

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group grid gap-1 border-t border-white/15 py-4 first:border-t-0 md:grid-cols-[132px_minmax(0,1fr)] md:gap-6"
    >
      <span className="text-[0.9rem] text-white/60">{label}</span>
      <span className="u-line inline-block w-fit text-[1.05rem] font-medium text-white">
        {value}
      </span>
    </a>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const near = useNearViewport(sectionRef, '0px');

  const spin = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scrollRot = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotation = useTransform([scrollRot, spin], ([a, b]: number[]) => a + b);

  useEffect(() => {
    if (reduced || !near) return;
    const controls = animate(spin, 360, {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    });
    return () => controls.stop();
  }, [near, reduced, spin]);

  const rows = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    ...contact.links.map((link) => ({
      label: link.label,
      value: link.value,
      href: link.href,
      external: link.external,
    })),
  ];

  return (
    <section id="contact" ref={sectionRef} className="pb-[var(--section-y)]">
      <div className="container-x">
        <motion.div
          className="relative overflow-hidden bg-[#1a1a1a] text-white"
          initial={
            reduced ? undefined : { opacity: 0, scale: 0.96, borderRadius: 64 }
          }
          whileInView={
            reduced ? { opacity: 1 } : { opacity: 1, scale: 1, borderRadius: 40 }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        >
          <div className="px-6 pt-10 md:px-10 md:pt-14 lg:px-14 lg:pt-16">
            <MaskBlock delay={0.08}>
              <h2 className="flex items-center gap-3 font-display text-section font-bold lg:whitespace-nowrap">
                <motion.span
                  className="inline-block h-7 w-7 shrink-0 text-accent"
                  style={reduced ? undefined : { rotate: rotation }}
                  aria-hidden="true"
                >
                  <Spark className="h-full w-full" />
                </motion.span>
                {contact.heading}
              </h2>
            </MaskBlock>
          </div>

          <div className="grid gap-0 px-6 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:grid-cols-[minmax(0,1fr)_clamp(200px,30vw,420px)] lg:gap-16 lg:px-14 lg:pt-8 lg:pb-8">
            <div>
              <MaskBlock delay={0.14}>
                <p className="measure text-[1.02rem] leading-relaxed text-white/70">
                  {contact.line}
                </p>
              </MaskBlock>

              <MaskBlock delay={0.2}>
                <div className="mt-8 inline-block">
                  <ButtonLink
                    href={`mailto:${contact.email}`}
                    variant="accent"
                    size="lg"
                  >
                    {contact.emailLabel}
                  </ButtonLink>
                </div>
              </MaskBlock>

              <MaskBlock delay={0.26}>
                <div className="mt-10 border-b border-white/15">
                  {rows.map((row) => (
                    <ContactRow key={row.label} {...row} />
                  ))}
                </div>
              </MaskBlock>
            </div>

            <motion.div
              className="-mb-10 self-end md:-mb-14 lg:-mb-16"
              initial={reduced ? undefined : { opacity: 0, y: 60 }}
              whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.1 }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[24px]">
                <Portrait
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}