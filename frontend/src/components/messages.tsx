import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../hooks/use-messages-web-sockets";

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used withing room page')
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  })

  useMessagesWebSockets({ roomId })

  const sortedMessages = data.messages.sort((a, b) =>
    b.amountOfReactions - a.amountOfReactions)

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => (
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