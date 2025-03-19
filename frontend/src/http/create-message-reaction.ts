interface ICreateMessageReactionRequest {
  roomId: string
  messageId: string
}

export async function createMessageReaction({ messageId, roomId }: ICreateMessageReactionRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'PATCH',
  })
}