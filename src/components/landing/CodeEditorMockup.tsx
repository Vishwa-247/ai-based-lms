const CodeEditorMockup = () => {
  return (
    <div className="mac-window w-full max-w-2xl">
      {/* Mac Titlebar */}
      <div className="mac-titlebar">
        <div className="flex gap-2">
          <div className="mac-button mac-button-close" />
          <div className="mac-button mac-button-minimize" />
          <div className="mac-button mac-button-maximize" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-4">
          agentic_evaluator.py — StudyMate
        </span>
      </div>

      {/* Code Editor Content */}
      <div className="code-editor p-4 min-h-[320px]">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-[#6E7681] text-right pr-4 select-none border-r border-[#21262D] mr-4">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto">
            <div className="leading-6">
              <span className="code-keyword">class</span>{" "}
              <span className="code-type">AgenticEvaluator</span>:
            </div>
            <div className="leading-6">
              <span className="code-comment">    """Evaluate candidate reasoning patterns"""</span>
            </div>
            <div className="leading-6">&nbsp;</div>
            <div className="leading-6">
              <span className="code-keyword">    def</span>{" "}
              <span className="code-function">evaluate_response</span>
              <span>(self, response: </span>
              <span className="code-type">str</span>
              <span>):</span>
            </div>
            <div className="leading-6">
              <span>        metrics = self.</span>
              <span className="code-function">analyze</span>
              <span>(response)</span>
            </div>
            <div className="leading-6">&nbsp;</div>
            <div className="leading-6">
              <span className="code-keyword">        return</span>
              <span> {`{`}</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "clarity"</span>
              <span>: </span>
              <span className="code-number">0.92</span>
              <span>,</span>
              <span className="text-[#28C840] ml-4"># High</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "tradeoffs"</span>
              <span>: </span>
              <span className="code-number">0.88</span>
              <span>,</span>
              <span className="text-[#28C840] ml-4"># Good</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "adaptability"</span>
              <span>: </span>
              <span className="code-number">0.65</span>
              <span>,</span>
              <span className="text-[#FEBC2E] ml-4"># Needs Work</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "failure_aware"</span>
              <span>: </span>
              <span className="code-number">0.78</span>
              <span>,</span>
              <span className="text-[#28C840] ml-4"># Good</span>
            </div>
            <div className="leading-6">
              <span>        {`}`}</span>
            </div>
            <div className="leading-6">&nbsp;</div>
            <div className="leading-6">
              <span className="code-comment">    # Agentic reasoning loop</span>
            </div>
            <div className="leading-6">
              <span className="code-keyword">    def</span>{" "}
              <span className="code-function">iterate</span>
              <span>(self) -{">"} </span>
              <span className="code-type">Feedback</span>
              <span>:</span>
            </div>
            <div className="leading-6">
              <span className="code-keyword">        while</span>
              <span> self.</span>
              <span className="code-variable">needs_improvement</span>
              <span>:</span>
            </div>
            <div className="leading-6">
              <span>            self.</span>
              <span className="code-function">refine_thinking</span>
              <span>()</span>
            </div>
          </div>
        </div>

        {/* Evaluation Labels Overlay */}
        <div className="mt-4 pt-4 border-t border-[#21262D]">
          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <span className="text-[#8B949E]">Clarity:</span>
              <span className="text-[#28C840]">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <span className="text-[#8B949E]">Tradeoffs:</span>
              <span className="text-[#28C840]">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <span className="text-[#8B949E]">Adaptability:</span>
              <span className="text-[#FEBC2E]">Needs Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <span className="text-[#8B949E]">Awareness:</span>
              <span className="text-[#28C840]">Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorMockup;
