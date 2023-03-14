export type IAnswer = {
  type: "code" | "message",
  content: string | IAnswerContent
}

export type IAnswerContent = {
  language: string,
  code: string,
}