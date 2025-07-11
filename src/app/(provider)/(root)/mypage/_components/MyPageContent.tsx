'use client';
import LinkCard from './LinkCard';

interface Link {
  title: string;
  href: string;
}

interface MyPageContentProps {
  links: Link[];
}

export function MyPageContent({ links }: MyPageContentProps) {
  return (
    <>
      {links.map((link) => (
        <div key={link.title}>
          <LinkCard title={link.title} href={link.href} />
        </div>
      ))}
    </>
  );
}
