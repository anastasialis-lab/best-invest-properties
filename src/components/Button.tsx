import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { color, line } from '@/styles/theme';

export type ButtonTone = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkGhost' | 'danger' | 'approve';

const base: CSSProperties = {
  border: 0,
  borderRadius: 40,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '.14em',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '14px 24px',
  minHeight: 40,
  textAlign: 'center',
};

const tones: Record<ButtonTone, CSSProperties> = {
  primary: { background: color.actionBright, color: '#fff', boxShadow: '0 10px 24px rgba(23,75,103,.22)' },
  secondary: { background: '#fff', color: color.link, border: `1px solid ${line(0.2)}`, boxShadow: '0 10px 24px rgba(23,75,103,.22)' },
  ghost: { background: 'transparent', color: color.body, border: `1px solid ${line(0.18)}` },
  onDark: { background: '#fff', color: color.link, boxShadow: '0 14px 30px rgba(4,14,26,.34)' },
  onDarkGhost: { background: 'rgba(255,255,255,.08)', color: '#fff', border: '1px solid rgba(255,255,255,.4)', fontWeight: 600 },
  danger: { background: 'transparent', color: color.danger, border: `1px solid ${color.danger}66` },
  approve: { background: color.success, color: '#fff' },
};

interface CommonProps {
  tone?: ButtonTone;
  children: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  title?: string;
}

export function Button({
  tone = 'primary',
  children,
  style,
  onClick,
  disabled,
  type = 'button',
  title,
}: CommonProps & { onClick?: () => void; type?: 'button' | 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{ ...base, ...tones[tone], ...(disabled ? { opacity: 0.55, cursor: 'not-allowed' } : null), ...style }}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ tone = 'primary', children, style, to, title }: CommonProps & { to: string }) {
  return (
    <Link to={to} title={title} style={{ ...base, ...tones[tone], ...style }}>
      {children}
    </Link>
  );
}
