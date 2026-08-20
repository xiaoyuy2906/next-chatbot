import { NavLink } from "react-router"
import { useInput } from "./hooks"
import { conversations } from "./store.tsx"
import { useEffect } from "react"


function Settings() {
  const { config } = conversations
  const apiBase = useInput(config.apiBase)
  const apiKey = useInput(config.apiKey)
  const temperature = useInput(config.temperature)
  const topP = useInput(config.topP)
  const frequencyPenalty = useInput(config.frequencyPenalty)
  const maxCompletionTokens = useInput(config.maxCompletionTokens)
  const reasoningEffort = useInput(config.reasoningEffort)
  const defaultModel = useInput(config.defaultModel)




  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-5 py-4 flex grow-0 border-b-amber-100 border-b  justify-between items-center">
        <div className="flex flex-col items-start">
          <h2>
            Settings
          </h2>
          <div className="text-sm">
            All settings
          </div>
        </div>
        <NavLink to='/'>
          <div className="border rounded-xl flex items-center justify-center w-8 h-8">
            x
          </div>
        </NavLink>
      </div>

      <div className="p-5 h-full overflow-auto flex flex-col space-y-5">



        <div className="flex flex-col border rounded-lg">
          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 flex items-center w-full justify-between">
              Default model
              <div className="flex  px-2.5 py-1.5 border rounded-lg justify-between text-sm items-center">
                <select className="outline-none" {...defaultModel}>
                  <optgroup label="OpenAI">
                    <option value="gpt-5.6-sol">GPT-5.6 Sol</option>
                    <option value="gpt-5.6-luna">GPT-5.6 Luna</option>
                    <option value="gpt-5-nano">GPT-5 nano</option>
                  </optgroup>

                  <optgroup label="Anthropic">
                    <option value="claude-opus-5">Claude Opus 5</option>
                    <option value="claude-sonnet-5">Claude Sonnet 5</option>
                    <option value="claude-haiku-4-5">Claude Haiku 4.5</option>
                  </optgroup>

                  <optgroup label="xAI">
                    <option value="grok-4.5">Grok 4.5</option>
                    <option value="grok-code-fast">Grok Code Fast</option>
                  </optgroup>

                  <optgroup label="DeepSeek">
                    <option value="deepseek-v4-pro">DeepSeek V4 Pro</option>
                    <option value="deepseek-v4-flash">DeepSeek V4 Flash</option>
                  </optgroup>

                  <optgroup label="Kimi (Moonshot)">
                    <option value="kimi-k3">Kimi K3</option>
                    <option value="kimi-k2.6">Kimi K2.6</option>
                  </optgroup>

                  <optgroup label="GLM (Z.AI)">
                    <option value="glm-5.3">GLM-5.3</option>
                    <option value="glm-4.7">GLM-4.7</option>
                  </optgroup>

                  <optgroup label="Meta">
                    <option value="llama-4-maverick">Llama 4 Maverick</option>
                    <option value="llama-4-scout">Llama 4 Scout</option>
                  </optgroup>

                  <optgroup label="Google">
                    <option value="gemini-3.1-pro">Gemini 3.1 Pro</option>
                    <option value="gemini-3.6-flash">Gemini 3.6 Flash</option>
                    <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash Lite</option>
                    <option value="gemini-3.7-flash">Gemini 3.7 Flash</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>



          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 flex items-center w-full justify-between">
              API base
              <input type="text" className="w-60 text-center text-xs bg-transparent outline-none px-2.5 rounded-lg h-10 border" {...apiBase} />
            </div>
          </div>

          <div className="px-5 py-2.5  flex justify-between">
            <div className="h-10 flex w-full items-center justify-between">
              API Key
              <input type="password" className="w-60 text-center text-xs bg-transparent outline-none px-2.5 rounded-lg h-10 border " {...apiKey} />
            </div>
          </div>
        </div>



        <div className="flex flex-col border rounded-lg">
          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 w-full flex items-center justify-between">
              Temperature
              <div className="flex  px-2.5 py-1.5 border rounded-lg w-50 justify-between text-xs items-center">
                <span>{temperature.value}</span>
                <input type="range" max="2" min="0" step="0.1" {...temperature} />
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 flex items-center w-full justify-between">
              <span className="inline-block">
                Top P
              </span>
              <div className="flex  px-2.5 py-1.5 border rounded-lg w-50 justify-between text-xs items-center">
                <span>{topP.value}</span>
                <input type="range" max="2" min="0" step="0.1" {...topP} />
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 flex items-center w-full justify-between">
              Frequency Penalty
              <div className="flex  px-2.5 py-1.5 border rounded-lg w-50 justify-between text-xs items-center">
                <span>{frequencyPenalty.value}</span>
                <input type="range" max="2" min="0" step="0.1" {...frequencyPenalty} />
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 flex items-center w-full justify-between">
              Max Completion Tokens
              <div className="flex  px-2.5 py-1.5 border rounded-lg w-50 justify-between text-xs items-center">
                <span>{maxCompletionTokens.value}</span>
                <input type="range" max="128000" min="4000" step="2000" {...maxCompletionTokens} />
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5  flex justify-between border-b">
            <div className="h-10 flex items-center w-full justify-between">
              Reasoning Effort
              <div className="flex  px-2.5 py-1.5 border rounded-lg justify-between text-sm items-center">
                <select className="outline-none" {...reasoningEffort} >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5  flex justify-between">
            <div className="h-10 flex items-center">
              <span className="inline-block">
                Reset
              </span>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Settings