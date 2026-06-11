import Link from 'next/link';

type DooodLogoProps = {
  compact?: boolean;
};

export const DooodLogo = ({ compact = false }: DooodLogoProps) => {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="DOOOD home">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white text-brand-black shadow-[0_0_28px_rgb(109_40_217/0.35)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.55),transparent_30%),linear-gradient(135deg,#ffffff_0%,#d8ccff_52%,#7c3aed_100%)]" />
        <div className="absolute left-2 top-2 h-6 w-6 rounded-full border-[5px] border-brand-black" />
        <div className="absolute left-[18px] top-[18px] h-4 w-4 rounded-full border-[5px] border-brand-black" />
        <div className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-brand-gold" />
      </div>
      <div className="leading-none">
        <span className="block text-xl font-black tracking-tight text-white transition-colors group-hover:text-brand-gold">
          DOOOD
        </span>
        {!compact ? (
          <span className="hidden text-[9px] font-black uppercase tracking-[0.2em] text-white/35 sm:block">
            Day One Or One Day
          </span>
        ) : null}
      </div>
    </Link>
  );
};
