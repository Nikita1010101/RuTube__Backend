import { TLike } from './like.types'
import { TSubscription } from './subscription.types'
import { TVideoSortingKeys } from './video.types'

export type TParsedQs = { [key: string]: undefined | string | string[] | TParsedQs | TParsedQs[] }

export type TLikeQuery = TParsedQs & TLike
export type TSubscriptionQuery = TParsedQs & TSubscription
export type TVideoQuery = TParsedQs & { _search: string, _sort: TVideoSortingKeys }
