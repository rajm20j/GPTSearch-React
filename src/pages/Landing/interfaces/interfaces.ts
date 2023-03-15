export type ISearchQuery = {
  body: ISearchBody;
};

export type ISearchResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: IUsage;
  choices: IChoice[];
};

type ISearchBody = {
  model: string;
  messages: IMessage[];
};

export type IChoice = {
  message: IMessage;
  finish_reason?: any;
  index: number;
};

export type IMessage = {
  role: string;
  content: string;
};

type IUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
