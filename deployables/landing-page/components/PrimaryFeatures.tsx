import accountOverviewDark from '@/images/features/account-overview-dark.png'
import accountOverviewLight from '@/images/features/account-overview-light.png'
import balancesDark from '@/images/features/balances-dark.png'
import balancesLight from '@/images/features/balances-light.png'
import editDark from '@/images/features/edit-account-dark.png'
import editLight from '@/images/features/edit-account-light.png'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import backgroundImage from '../images/background-features.jpg'
import { Container } from './Container'

const features = [
  {
    title: 'Secure Execution for Smart Accounts',
    description:
      'Pilot powers institutional-grade treasury management, helping DAOs and other onchain entities reduce overhead and optimize operations through secure, efficient execution.',
    image: [accountOverviewLight, accountOverviewDark],
  },
  {
    title: 'Seamless Interactions with Dapps',
    description:
      'Pilot integrates Safe workflows directly into dapp interactions, making transactions smooth, intuitive, and cost-efficient.',
    image: [balancesLight, balancesDark],
  },
  {
    title: 'Maximize Efficiency, Reduce Risk',
    description:
      'Pilot eliminates transaction uncertainty with its advanced batching capabilities and industry-first simulation forks, providing a secure environment to test workflows before execution and maximizing capital efficiency.',
    image: [editLight, editDark],
  },
  {
    title: 'Delegate Securely with Advanced Permissions',
    description:
      'Pilot enables secure delegation with fine-grained permissions using Zodiac Roles Modifier — the most expressive conditions system for permissioning EVM calls.',
    image: [],
  },
]

export function PrimaryFeatures() {
  const [tabOrientation, setTabOrientation] = useState<
    'horizontal' | 'vertical'
  >('horizontal')

  useEffect(() => {
    const lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden pb-28 pt-20 sm:py-32 dark:bg-teal-700"
    >
      <img
        className="dark:hue-rotate-305 absolute top-0 w-full brightness-125 contrast-75 hue-rotate-30 dark:brightness-75 dark:contrast-75"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything you need to manage your accounts.
          </h2>
          <p className="mt-6 text-balance text-lg tracking-tight text-blue-100">
            Build transactions confidently and efficiently through an intuitive
            browser side panel, powered by advanced batching,
            institutional-grade permissions, and an industry-first sandbox
            environment. Reduce risk, minimize costs, and streamline treasury
            management, governance, and DeFi workflows—all in one streamlined
            interface.
          </p>
        </div>
        <TabGroup
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <TabList className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={classNames(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5',
                      )}
                    >
                      <h3>
                        <Tab
                          className={classNames(
                            'font-display data-selected:not-data-focus:outline-hidden text-lg',
                            selectedIndex === featureIndex
                              ? 'text-blue-600 lg:text-white'
                              : 'text-blue-100 hover:text-white lg:text-white',
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={classNames(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-blue-100 group-hover:text-white',
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </TabList>
              </div>
              <TabPanels className="lg:col-span-7">
                {features.map(
                  ({ title, description, image: [light, dark] }) => (
                    <TabPanel key={title} unmount={false}>
                      <div className="relative sm:px-6 lg:hidden">
                        <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl dark:ring-black/10" />
                        <p className="relative mx-auto max-w-2xl text-balance text-base text-white sm:text-center">
                          {description}
                        </p>
                      </div>
                      <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                        <img
                          className="block w-full dark:hidden"
                          src={light}
                          alt=""
                          sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        />
                        <img
                          className="hidden w-full dark:block"
                          src={dark}
                          alt=""
                          sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        />
                      </div>
                    </TabPanel>
                  ),
                )}
              </TabPanels>
            </>
          )}
        </TabGroup>
      </Container>
    </section>
  )
}
