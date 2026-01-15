const CodeEditorMockup = () => {
  return (
    <div className="mac-window w-full max-w-2xl relative">
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
      <div className="code-editor p-5 min-h-[360px]">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-[#6e7681] text-right pr-4 select-none border-r border-[#21262d] mr-4">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="leading-6 text-xs">{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto text-[13px]">
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
              <span className="text-[#28c840] ml-4 text-xs"># High</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "tradeoffs"</span>
              <span>: </span>
              <span className="code-number">0.88</span>
              <span>,</span>
              <span className="text-[#28c840] ml-4 text-xs"># Good</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "adaptability"</span>
              <span>: </span>
              <span className="code-number">0.65</span>
              <span>,</span>
              <span className="text-[#febc2e] ml-4 text-xs"># Needs Work</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "failure_aware"</span>
              <span>: </span>
              <span className="code-number">0.78</span>
              <span>,</span>
              <span className="text-[#28c840] ml-4 text-xs"># Good</span>
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
        <div className="mt-5 pt-4 border-t border-[#21262d]">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#28c840]/10 border border-[#28c840]/20">
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
              <span className="text-[#8b949e]">Clarity:</span>
              <span className="text-[#28c840] font-medium">High</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#28c840]/10 border border-[#28c840]/20">
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
              <span className="text-[#8b949e]">Tradeoffs:</span>
              <span className="text-[#28c840] font-medium">Good</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#febc2e]/10 border border-[#febc2e]/20">
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="text-[#8b949e]">Adaptability:</span>
              <span className="text-[#febc2e] font-medium">Needs Work</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#28c840]/10 border border-[#28c840]/20">
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
              <span className="text-[#8b949e]">Awareness:</span>
              <span className="text-[#28c840] font-medium">Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorMockup;
