import { useRef, useState, type CSSProperties, type DragEvent } from 'react';
import { color, line } from '@/styles/theme';

interface PhotoSlotProps {
  hint: string;
  radius?: number;
  aspect?: string;
  minHeight?: number;
  style?: CSSProperties;
}

// Stand-in for the prototype's <image-slot>: an empty 4:3 well an editor can
// drop a photo onto. Object-URL backed only — wire to the media API later.
export function PhotoSlot({ hint, radius = 16, aspect = '4/3', minHeight, style }: PhotoSlotProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) setSrc(URL.createObjectURL(file));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOver(false);
    accept(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        background: color.panelBlue,
        aspectRatio: aspect,
        minHeight,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        outline: over ? `2px dashed ${color.action}` : 'none',
        outlineOffset: -6,
        ...style,
      }}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => accept(e.target.files?.[0])} />
      {!src && (
        <span
          style={{
            fontSize: 12.5,
            letterSpacing: '.08em',
            color: color.faint,
            textAlign: 'center',
            padding: '0 18px',
            border: `1px dashed ${line(0.22)}`,
            borderRadius: 10,
            background: 'rgba(255,255,255,.55)',
            lineHeight: 2.6,
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
