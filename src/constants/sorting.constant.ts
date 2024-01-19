import { TVideoSortingOptions } from '../types/video.types'

export const VIDEO_SORTING_OPTIONS: TVideoSortingOptions = {
  last: [['updatedAt', 'DESC']],
  old: [['updatedAt', 'ASC']],
  popular: [['views', 'DESC']],
}
