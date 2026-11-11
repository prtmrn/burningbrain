'use client';

// ─────────────────────────────────────────────────────────────
// AnswerInput.tsx — champ unique : autofocus, Entrée pour soumettre,
// désactivé hors phase 'answering' (verrou UI, spec §A.6).
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

export interface AnswerInputProps {
  value: string;
  disabled: boolean;
  maxLength: number;
  onChange(input: string): void;
  onSubmit(input: string): void;
  placeholder?: string;
}

export function AnswerInput({
  value,
  disabled,
  maxLength,
  onChange,
  onSubmit,
  placeholder = 'Ta réponse…',
}: AnswerInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  // Autofocus dès que la saisie devient possible
  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && value.trim() !== '') onSubmit(value);
      }}
    >
      <input
        ref={ref}
        type="text"
        role="textbox"
        aria-label="Ta réponse"
        data-testid="answer-input"
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
}
