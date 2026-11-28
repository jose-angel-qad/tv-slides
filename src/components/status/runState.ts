import type { MaterialIconName } from '../icon/MaterialIcon.vue'
import type { Status } from './status'

// Run states a line can be in, with their status and filled Material Symbol (Run status badge).
export type RunState = 'running' | 'slow' | 'ramp-up' | 'changeover' | 'stopped' | 'breakdown' | 'inactive'

export const RUN_STATE: Record<RunState, { label: string; status: Status; icon: MaterialIconName }> = {
  running: { label: 'Running', status: 'positive', icon: 'play_arrow_fill' },
  slow: { label: 'Slow running', status: 'warning', icon: 'resume_fill' },
  'ramp-up': { label: 'Ramp up', status: 'neutral', icon: 'trending_up_fill' },
  changeover: { label: 'Changeover', status: 'neutral', icon: 'swap_horiz_fill' },
  stopped: { label: 'Stopped', status: 'negative', icon: 'stop_fill' },
  breakdown: { label: 'Breakdown', status: 'negative', icon: 'error_fill' },
  inactive: { label: 'Inactive', status: 'neutral', icon: 'do_not_disturb_on_fill' },
}
