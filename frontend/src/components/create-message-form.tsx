import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used withing room page')
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomId) return

    try {
      await createMessage({ message, roomId })
    } catch {
      toast.error('Falha ao enviar pergunta')
    }
  }

  return (
    <form
      action={createMessageAction}
      className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
    >
      <input
        type="text"
        name="message"
        placeholder="Qual a sua pergunta"
        autoComplete="off"
        required
        className="flex-1 bg-transparent text-sm mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
      />

      <button
        type="submit"
        className="bg-orange-400 transition-colors hover:bg-orange-500 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm cursor-pointer"
      >
        Criar pergunta
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}