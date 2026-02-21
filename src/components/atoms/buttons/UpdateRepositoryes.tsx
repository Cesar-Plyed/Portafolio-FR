import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode, useState } from 'react';
import SecondaryButton from './SecondaryButton';
import { fetchRepositories } from 'src/services/githubService';

type BaseProps = {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'ghost' | 'subtle';
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  type?: never;
};

type SecondaryButtonProps = ButtonProps | AnchorProps;

export default function UpdateRepository({
  children,
  size = 'md',
  variant = 'outline',
  href,
  className = '',
  type = 'button',
  ...props
}: SecondaryButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: any) => {
    // allow any external onClick to run
    try {
      setLoading(true);
      const repos = await fetchRepositories('Cesar-Plyed');
      // Broadcast an event so other client components can react and refresh
      try {
        window.dispatchEvent(new CustomEvent('repos-updated', { detail: repos }));
      } catch (err) {
        // ignore
      }
    } catch (err) {
      console.error('Failed to fetch repositories', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecondaryButton
      size={size}
      variant={variant}
      className={className}
      type={type as 'button' | 'submit' | 'reset'}
      onClick={handleClick}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading ? 'Updating…' : (children ?? 'Update repositories')}
    </SecondaryButton>
  );
}
