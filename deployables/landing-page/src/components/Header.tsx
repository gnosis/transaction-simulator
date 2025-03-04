import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { SiGooglechrome } from '@icons-pack/react-simple-icons'
import {
  GhostButton,
  GhostLinkButton,
  PilotType,
  PrimaryLinkButton,
  ZodiacOsPlain,
} from '@zodiac/ui'
import { Menu } from 'lucide-react'
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

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton iconOnly as={GhostButton} icon={Menu}>
        Toggle Navigation
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="data-closed:opacity-0 data-enter:ease-out data-leave:ease-in fixed inset-0 bg-zinc-300/50 backdrop-blur duration-150 dark:bg-zinc-800/50"
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
              <GhostLinkButton reloadDocument to="#features">
                Features
              </GhostLinkButton>
              <GhostLinkButton reloadDocument to="#testimonials">
                Testimonials
              </GhostLinkButton>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden gap-x-5 md:flex md:gap-x-8">
              <PrimaryLinkButton
                openInNewWindow
                to="https://chrome.google.com/webstore/detail/zodiac-pilot/jklckajipokenkbbodifahogmidkekcb"
                icon={SiGooglechrome}
              >
                Add to Chrome
              </PrimaryLinkButton>
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
