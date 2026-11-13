interface CountryCodeProps {
  code: string;
  small?: boolean;
}

// Dvoslovna oznaka umesto emoji zastave — Windows emoji zastave prikazuje kao slova.
export default function CountryCode({ code, small = false }: CountryCodeProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid flex-none place-items-center rounded-xl border border-line-strong bg-surface-2 font-mono font-semibold tracking-wider text-accent ${
        small ? 'h-8 w-8 text-[11.5px]' : 'h-11 w-11 text-[13.5px]'
      }`}
    >
      {code}
    </span>
  );
}
