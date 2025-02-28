import { Header, Hero, PrimaryFeatures } from './components'

export const LandingPage = () => (
  <div className="flex flex-col">
    <Header />

    <main className="flex flex-col">
      <Hero />
      <PrimaryFeatures />
    </main>
  </div>
)

export default LandingPage
