import type { ModelInfo } from './types';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'Llama 3.1 8b (Groq)';
export const DEFAULT_PROVIDER = 'Groq';

const staticModels: ModelInfo[] = [
  { name: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
  { name: 'deepseek/deepseek-coder', label: 'Deepseek-Coder V2 236B (OpenRouter)', provider: 'OpenRouter' },
  { name: 'google/gemini-flash-1.5', label: 'Google Gemini Flash 1.5 (OpenRouter)', provider: 'OpenRouter' },
  { name: 'google/gemini-pro-1.5', label: 'Google Gemini Pro 1.5 (OpenRouter)', provider: 'OpenRouter' },
  { name: 'mistralai/mistral-nemo', label: 'OpenRouter Mistral Nemo (OpenRouter)', provider: 'OpenRouter' },
  { name: 'qwen/qwen-110b-chat', label: 'OpenRouter Qwen 110b Chat (OpenRouter)', provider: 'OpenRouter' },
  { name: 'cohere/command', label: 'Cohere Command (OpenRouter)', provider: 'OpenRouter' },
  { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash', provider: 'Google' },
  { name: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro', provider: 'Google'},
  { name: 'llama-3.1-70b-versatile', label: 'llama-3.1-70b (Groq)', provider: 'Groq' },
  { name: 'llama-3.1-8b-instant', label: 'Llama 3.1 8b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-11b-vision-preview', label: 'Llama 3.2 11b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-3b-preview', label: 'Llama 3.2 3b (Groq)', provider: 'Groq' },
  { name: 'llama3-groq-8b-8192-tool-use-preview', label: 'llama3-groq-8b-8192-tool-use-preview (Groq)', provider: 'Groq' },
  { name: 'llama3-groq-70b-8192-tool-use-preview', label: 'llama3-groq-70b-8192-tool-use-preview (Groq)', provider: 'Groq' },
  { name: 'llama3-70b-8192', label: 'llama3-70b-8192 (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-90b-text-preview', label: 'llama-3.2-90b-text-preview (Groq)', provider: 'Groq' },
  { name: 'gemma-7b-it', label: 'gemma-7b-it (Groq)', provider: 'Groq' },
  { name: 'gemma2-9b-it', label: 'gemma2-9b-it (Groq)', provider: 'Groq' },
  { name: 'llava-v1.5-7b-4096-preview', label: 'llava-v1.5-7b-4096-preview (Groq)', provider: 'Groq' },
  { name: 'mixtral-8x7b-32768', label: 'mixtral-8x7b-32768 (Groq)', provider: 'Groq' },
  { name: 'claude-3-opus-20240229', label: 'Claude 3 Opus', provider: 'Anthropic' },
  { name: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { name: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'Anthropic' },
  { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI' },
  { name: 'gpt-4', label: 'GPT-4', provider: 'OpenAI' },
  { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { name: 'codestral-2405', label: 'Codestral', provider: 'Mistral' },
  { name: 'open-mistral-7b', label: 'open-mistral-7b', provider: 'Mistral' },
  { name: 'open-mixtral-8x7b', label: 'open-mixtral-8x7b', provider: 'Mistral' },
  { name: 'open-mixtral-8x22b', label: 'open-mixtral-8x22b', provider: 'Mistral' },
  { name: 'mistral-small-2409', label: 'mistral-small', provider: 'Mistral' },
  { name: 'mistral-medium', label: 'mistral-medium', provider: 'Mistral' },
  { name: 'mistral-large-2407', label: 'mistral-large', provider: 'Mistral' },
  { name: 'codestral-mamba-2407', label: 'codestral-mamba', provider: 'Mistral' },
  { name: 'open-mistral-nemo', label: 'open-mistral-nemo', provider: 'Mistral' },
  { name: 'pixtral-12b-2409', label: 'pixtral-12b', provider: 'Mistral' },
  { name: 'ministral-3b-2410', label: 'ministral-3b', provider: 'Mistral' },
  { name: 'ministral-8b-2410', label: 'ministral-8b', provider: 'Mistral' },
  { name: 'nvidia/mistral-nemo-minitron-8b-8k-instruct', label: 'nvidia/mistral-nemo-minitron-8b-8k-instruct', provider: 'Nvidia' },
];

export let MODEL_LIST: ModelInfo[] = [...staticModels];

async function getOllamaModels(): Promise<ModelInfo[]> {
  try {
    const response = await fetch(`http://localhost:11434/api/tags`);
    const data = await response.json();

    return data.models.map((model: any) => ({
      name: model.name,
      label: `${model.name} (${model.details.parameter_size})`,
      provider: 'Ollama',
    }));
  } catch (e) {
    return [];
  }
}

async function initializeModelList(): Promise<void> {
  const ollamaModels = await getOllamaModels();
  MODEL_LIST = [...ollamaModels, ...staticModels];
}
initializeModelList().then();
export { getOllamaModels, initializeModelList };
