import { useRef, useState, type DragEvent } from 'react';

interface HeroPhotoSlotProps {
  placeholder: string;
}

// Real-app stand-in for the prototype's <image-slot>: lets an editor drop or
// browse for a property photo, which becomes the blurred hero background.
// Backed by an object URL only — wire to the media upload API when ready.
export function HeroPhotoSlot({ placeholder }: HeroPhotoSlotProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      setSrc(URL.createObjectURL(file));
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => acceptFile(e.target.files?.[0])}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'blur(18px) saturate(1.08)',
          transform: 'scale(1.14)',
          backgroundImage: src ? `url(${src})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {!src && (
        <div
          style={{
            position: 'absolute',
            right: 22,
            top: 20,
            border: `1px dashed rgba(226,181,88,${dragOver ? 0.9 : 0.55})`,
            borderRadius: 6,
            padding: '8px 13px',
            fontSize: 10.5,
            letterSpacing: '.14em',
            color: '#E2B558',
            background: 'rgba(8,26,47,.35)',
            pointerEvents: 'none',
          }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
