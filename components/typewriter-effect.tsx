'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Full Stack Developer',
  'Cloud Architect',
  'AI Enthusiast',
  'Problem Solver'
];

export function TypewriterEffect() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.slice(0, text.length + 1));
        if (text === currentRole) {
          setIsDeleting(true);
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        setText(currentRole.slice(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [text, roleIndex, isDeleting]);

  return (
    <span className="text-primary font-mono">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}
