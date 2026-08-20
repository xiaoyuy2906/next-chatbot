import { conversations } from "./store"
import type { Config } from "./types"



function useConfigInput<K extends keyof Config>(key: K) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const raw = e.target.value
    const current = conversations.config[key]
    const value = (typeof current === 'number' ? Number(raw) : raw) as Config[K]
    conversations.updateConfig(key, value)
  }

  return { value: conversations.config[key], onChange }
}





export { useConfigInput }