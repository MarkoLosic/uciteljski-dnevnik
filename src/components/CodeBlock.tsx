import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import PixelIcon from './PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { copyText } from '../lib/clipboard';

type Status = 'idle' | 'copied' | 'failed';

/** <pre> iz Markdowna sa dugmetom „Kopiraj“ (npr. gotovi promptovi). */
export default function CodeBlock(props: ComponentPropsWithoutRef<'pre'>) {
  const { t } = useLocale();
  const preRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function handleCopy() {
    const text = preRef.current?.textContent?.replace(/\n$/, '') ?? '';
    setStatus((await copyText(text)) ? 'copied' : 'failed');
  }

  const label = status === 'copied' ? t.blog.codeCopied : status === 'failed' ? t.blog.copyFailed : t.blog.copyCode;

  return (
    <div className="code-block">
      <pre ref={preRef} {...props} />
      <button type="button" onClick={handleCopy} className="code-copy focus-ring">
        <PixelIcon name={status === 'copied' ? 'mark' : 'copy'} size={13} />
        <span aria-live="polite">{label}</span>
      </button>
    </div>
  );
}
