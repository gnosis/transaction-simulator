import {
  CallToAction,
  Footer,
  Header,
  Hero,
  PrimaryFeatures,
  SecondaryFeatures,
  Testimonials,
} from '@/components'
import { DuneClient } from '@duneanalytics/client-sdk'
import { invariantResponse } from '@epic-web/invariant'
import type { Route } from './+types/LandingPage'

export const loader = async ({ context }: Route.LoaderArgs) => {
  const dune = new DuneClient(context.cloudflare.env.DUNE_ANALYTICS_API_KEY)
  const { result } = await dune.getLatestResult({ queryId: 4175289 })

  invariantResponse(result != null, 'Could not load TTV')

  const [row] = result.rows

  const usdFormatter = new Intl.NumberFormat('en-us', {
    currency: 'USD',
    style: 'currency',
  })

  return {
    ttv: usdFormatter.format(row['total_usd_value'] as number),
  }
}

export const LandingPage = ({ loaderData: { ttv } }: Route.ComponentProps) => {
  return (
    <div className="flex flex-col">
      <Header ttv={ttv} />

      <main className="flex flex-col">
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
