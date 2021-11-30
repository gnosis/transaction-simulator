import React, { useEffect } from 'react'

import { useWalletConnectProvider } from '../WalletConnectProvider'
import { Address, Box, Flex } from '../components'
import { updateLocation } from '../location'

import AddressBar from './AddressBar'
import BrowserFrame from './Frame'
import classNames from './index.module.css'

const Browser: React.FC = () => {
  const { provider } = useWalletConnectProvider()
  const avatarAddress = localStorage.getItem('avatarAddress')
  const targetAddress = localStorage.getItem('targetAddress')

  const redirectToSettings = !avatarAddress || !targetAddress
  useEffect(() => {
    if (redirectToSettings) {
      updateLocation('settings')
    }
  }, [redirectToSettings])

  if (redirectToSettings) {
    return null
  }

  return (
    <div className={classNames.browser}>
      <div className={classNames.topBar}>
        <Flex gap={3}>
          <AddressBar />
          <a href="#settings">
            <Box roundedLeft>
              <Address address={provider.accounts[0]} />
            </Box>
          </a>
        </Flex>
      </div>
      <div className={classNames.main}>
        <Box className={classNames.frame} double>
          <BrowserFrame
            avatarAddress={avatarAddress}
            targetAddress={targetAddress}
          />
        </Box>
      </div>
    </div>
  )
}

export default Browser
