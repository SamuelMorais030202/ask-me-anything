import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface IMessageProps {
  text: string
  amountOfReactions: number
  answered?: boolean
  id: string
}

export function Message({ amountOfReactions, text, answered = false, id: messageId }: IMessageProps) {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used withing room page')
  }

  const [hasReacted, setHasReacted] = useState(false)

  async function createMessageReactionAction() {
    if (!roomId) return

    try {
      await createMessageReaction({ messageId, roomId })
    } catch {
      toast.error("Falha ao curtir menssagem, tente novamente.")
    }

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) return

    try {
      await removeMessageReaction({ messageId, roomId })
    } catch {
      toast.error("Falha ao remover reação, tente novamente.")
    }

    setHasReacted(false)
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}

      {
        hasReacted ? (
          <button
            type="button"
            onClick={removeMessageReactionAction}
            className="mt-3 flex items-center gap-2 text-orange-400 text-sm cursor-pointer font-medium hover:text-orange-500"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta ({amountOfReactions})
          </button>

        ) : (
          <button
            type="button"
            onClick={createMessageReactionAction}
            className="mt-3 flex items-center gap-2 text-zinc-400 text-sm cursor-pointer font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta ({amountOfReactions})
          </button>
        )
      }

    </li>
  )
}