import { Link } from 'react-router-dom';
import PixelIcon from '../components/PixelIcon';

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[80vh] flex-col items-center justify-center pt-[130px] text-center">
      <p className="font-mono text-[13px] font-medium tracking-[0.08em] text-accent uppercase">Greška</p>
      <p className="grad mt-2 font-head text-[clamp(96px,18vw,180px)] leading-none font-bold tracking-[-0.04em]">404</p>
      <h1 className="mt-4 font-head text-2xl font-bold tracking-tight sm:text-3xl">Stranica nije pronađena.</h1>
      <Link to="/" className="btn btn-primary focus-ring mt-9">
        Nazad na početnu
        <PixelIcon name="arrow" />
      </Link>
    </div>
  );
}
