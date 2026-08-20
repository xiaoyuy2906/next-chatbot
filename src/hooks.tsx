import { useCallback, useState } from 'react'


function useInput(init: string | number) {
  const [value, setValue] = useState(() => init)
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setValue(e.target.value)
  }, [])

  return { value, onChange }
}


export { useInput }