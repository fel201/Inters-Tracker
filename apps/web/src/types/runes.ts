export type Runes = Array<{
  id: number
  key: string
  icon: string
  name: string
  slots: Array<{
    runes: Array<{
      id: number
      key: string
      icon: string
      name: string
      shortDesc: string
      longDesc: string
    }>
  }>
}>
