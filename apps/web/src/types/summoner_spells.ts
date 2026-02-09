export type SummonerSpells = {
  type: string
  version: string
  data: {
    SummonerSpell: {
      id: string
      name: string
      description: string
      tooltip: string
      maxrank: number
      cooldown: Array<number>
      cooldownBurn: string
      cost: Array<number>
      costBurn: string
      datavalues: {}
      effect: Array<Array<number> | undefined>
      effectBurn: Array<string | undefined>
      vars: Array<any>
      key: string
      summonerLevel: number
      modes: Array<string>
      costType: string
      maxammo: string
      range: Array<number>
      rangeBurn: string
      image: {
        full: string
        sprite: string
        group: string
        x: number
        y: number
        w: number
        h: number
      }
      resource: string
    }
  }
}