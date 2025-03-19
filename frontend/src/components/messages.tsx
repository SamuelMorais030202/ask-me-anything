import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used withing room page')
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  })

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)

    ws.onopen = () => {
      console.log('Websocket conected!')
    }

    return () => {
      ws.close()
    }
  }, [roomId])

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {data.messages.map((message) => (
        <Message
          id={message.id}
          text={message.text}
          amountOfReactions={message.amountOfReactions}
          answered={message.answered}
          key={message.id}
        />
      ))}
    </ol>
  )
}