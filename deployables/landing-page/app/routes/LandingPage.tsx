import { Header, Hero, PrimaryFeatures, SecondaryFeatures } from './components'

export const LandingPage = () => (
  <div className="flex flex-col">
    <Header />

    <main className="flex flex-col">
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
    </main>
  </div>
)

export default LandingPage
