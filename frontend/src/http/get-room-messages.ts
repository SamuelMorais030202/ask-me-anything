interface IGetRoomMessagesRequest {
  roomId: string
}

interface IGetRommMessagesResponse {
  id: string
  room_id: string
  message: string
  reaction_count: number
  answered: boolean
}

export async function getRoomMessages({ roomId }: IGetRoomMessagesRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`, {
    method: 'GET',
  })

  const data: IGetRommMessagesResponse[] = await response.json()

  return {
    messages: data.map((item => {
      return {
        id: item.id,
        text: item.message,
        amountOfReactions: item.reaction_count,
        answered: item.answered
      }
    }))
  }
}