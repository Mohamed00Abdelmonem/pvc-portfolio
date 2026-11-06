import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  tag: string;
  eyebrow?: string;
  titlePart1: string;
  titlePart2?: string;
  lead?: string;
  dark?: boolean;
  align?: 'left' | 'center' | 'start';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  eyebrow,
  titlePart1,
  titlePart2,
  lead,
  dark = false,
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-3.5 flex-wrap"
      >
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
          dark
            ? 'bg-brand-navy-dark text-brand-sky border-brand-sky/30'
            : 'bg-brand-light text-brand-primary border-brand-light-border'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-brand-sky' : 'bg-brand-primary'}`} />
          <span>{tag}</span>
        </span>

        {eyebrow && (
          <span className={`text-[11px] font-semibold tracking-wider uppercase ${
            dark ? 'text-brand-sky-pale' : 'text-brand-muted'
          }`}>
            {eyebrow}
          </span>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-heading text-3xl sm:text-4xl md:text-5xl font-black leading-[1.2] tracking-tight ${
          dark ? 'text-white' : 'text-brand-slate'
        }`}
      >
        {titlePart1}{' '}
        {titlePart2 && (
          <span className={dark ? 'text-brand-sky font-normal' : 'text-brand-primary font-normal'}>
            {titlePart2}
          </span>
        )}
      </motion.h2>

      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 max-w-2xl text-base md:text-lg font-normal leading-relaxed ${
            dark ? 'text-brand-sky-pale' : 'text-brand-muted'
          }`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
};
