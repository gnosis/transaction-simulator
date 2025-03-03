import { SiGooglechrome } from '@icons-pack/react-simple-icons'
import { PrimaryLinkButton } from '@zodiac/ui'
import backgroundImage from '../images/background-call-to-action.jpg'
import { Container } from './Container'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <img
        className="dark:hue-rotate-305 absolute top-0 w-full brightness-125 contrast-75 hue-rotate-30 dark:brightness-75 dark:contrast-75"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Start Using Zodiac Pilot
          </h2>
          <p className="mb-10 mt-4 text-lg tracking-tight text-white">
            Pilot moves execution beyond manual approvals and fragmented dapp
            interactions. It enables composable, risk-free, and highly
            controlled transaction flows — bridging the gap between programmable
            execution and real-world operational needs.
          </p>

          <div className="flex justify-center">
            <PrimaryLinkButton
              icon={SiGooglechrome}
              to="https://chrome.google.com/webstore/detail/zodiac-pilot/jklckajipokenkbbodifahogmidkekcb"
            >
              Add Pilot to Your Browser
            </PrimaryLinkButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
