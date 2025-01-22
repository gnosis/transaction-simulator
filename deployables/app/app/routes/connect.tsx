import { PilotType, ZodiacOsPlain } from '@zodiac/ui'

const Connect = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex items-center gap-4">
        <ZodiacOsPlain className="h-6 lg:h-8" />
        <PilotType className="h-8 lg:h-10 dark:invert" />
      </div>
    </div>
  )
}

export default Connect
