import { SiDiscord, SiGithub, SiX } from '@icons-pack/react-simple-icons'
import { GhostLinkButton, PilotType, ZodiacOsPlain } from '@zodiac/ui'
import { Container } from './Container'

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="py-16">
          <div className="flex items-center justify-center gap-4">
            <ZodiacOsPlain className="h-10 w-auto" />
            <PilotType className="h-6 dark:invert" />
          </div>

          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <GhostLinkButton to="/#features">Features</GhostLinkButton>
              <GhostLinkButton to="/#testimonials">
                Testimonials
              </GhostLinkButton>
              <GhostLinkButton to="/#pricing">Pricing</GhostLinkButton>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex">
            <GhostLinkButton
              iconOnly
              icon={SiGithub}
              to="https://github.com/gnosisguild/zodiac-pilot"
            >
              View on GitHub
            </GhostLinkButton>

            <GhostLinkButton
              iconOnly
              to="https://twitter.com/gnosisguild"
              icon={SiX}
            >
              Follow us on X
            </GhostLinkButton>

            <GhostLinkButton
              iconOnly
              to="https://discord.com/channels/881881751369175040/884777203332710460"
              icon={SiDiscord}
            >
              Contact us on Discord
            </GhostLinkButton>
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()}{' '}
            <a href="https://gnosisguild.org" className="underline">
              Gnosis Guild
            </a>
            . All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
