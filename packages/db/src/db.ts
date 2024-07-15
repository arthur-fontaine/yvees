import type { journeySteps } from './schema/journey-steps'
import type { journeys } from './schema/journeys'
import type { museums } from './schema/museums'
import type { users } from './schema/users'
import type { visits } from './schema/visits'

export type Journey = typeof journeys.$inferSelect
export type User = typeof users.$inferSelect
export type Visit = typeof visits.$inferSelect
export type JourneyStep = typeof journeySteps.$inferSelect
export type Museum = typeof museums.$inferSelect
