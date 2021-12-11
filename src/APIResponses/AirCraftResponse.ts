export interface AirCraftResponse {
  pagination: {
    offset: number,
    limit: number,
    total: number,
  },
  data: [
    {
      ident: string,
      type: string,
      economySeats: number,
      base: string
    }
  ]
}