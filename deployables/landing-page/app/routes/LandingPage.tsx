import {
  CallToAction,
  Header,
  Hero,
  PrimaryFeatures,
  SecondaryFeatures,
  Testimonials,
} from './components'

export const LandingPage = () => (
  <div className="flex flex-col">
    <Header />

    <main className="flex flex-col">
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Testimonials />
    </main>
  </div>
)

export default LandingPage
