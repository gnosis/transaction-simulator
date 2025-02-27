import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { SiChromewebstore } from '@icons-pack/react-simple-icons'
import {
  GhostLinkButton,
  PilotType,
  PrimaryLinkButton,
  ZodiacOsPlain,
} from '@zodiac/ui'
import classNames from 'classnames'
import { Container } from './Container'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={'a'} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={classNames(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={classNames(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="focus:not-data-focus:outline-hidden relative z-10 flex h-8 w-8 items-center justify-center"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="data-closed:opacity-0 data-enter:ease-out data-leave:ease-in fixed inset-0 bg-slate-300/50 duration-150"
      />
      <PopoverPanel
        transition
        className="data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
      >
        <MobileNavLink href="#features">Features</MobileNavLink>
        <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
        <MobileNavLink href="#pricing">Pricing</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <MobileNavLink href="/login">Sign in</MobileNavLink>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a href="/#" className="flex items-center gap-4" aria-label="Home">
              <ZodiacOsPlain className="h-10 w-auto" />
              <PilotType className="h-6 dark:invert" />
            </a>
            <div className="hidden md:flex md:gap-x-6">
              <GhostLinkButton to="#features">Features</GhostLinkButton>
              <GhostLinkButton to="#testimonials">Testimonials</GhostLinkButton>
              <GhostLinkButton to="#pricing">Pricing</GhostLinkButton>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <GhostLinkButton to="/login">Sign in</GhostLinkButton>
            </div>
            <PrimaryLinkButton
              openInNewWindow
              to="https://chrome.google.com/webstore/detail/zodiac-pilot/jklckajipokenkbbodifahogmidkekcb"
              icon={SiChromewebstore}
            >
              Add to Chrome
            </PrimaryLinkButton>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
