const CodeEditorMockup = () => {
  return (
    <div className="mac-window w-full max-w-2xl">
      {/* Mac Titlebar */}
      <div className="mac-titlebar">
        <div className="flex gap-1.5">
          <div className="mac-button mac-button-close" />
          <div className="mac-button mac-button-minimize" />
          <div className="mac-button mac-button-maximize" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-4 truncate">
          evaluator.py — StudyMate
        </span>
      </div>

      {/* Code Editor Content */}
      <div className="code-editor p-4 min-h-[340px]">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-[#484f58] text-right pr-4 select-none font-mono text-xs">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto text-xs">
            <div className="leading-6">
              <span className="code-keyword">class</span>{" "}
              <span className="code-type">AgenticEvaluator</span>:
            </div>
            <div className="leading-6">
              <span className="code-comment">    """Evaluate reasoning patterns"""</span>
            </div>
            <div className="leading-6">&nbsp;</div>
            <div className="leading-6">
              <span className="code-keyword">    def</span>{" "}
              <span className="code-function">evaluate</span>
              <span className="text-[#e6edf3]">(self, response: </span>
              <span className="code-type">str</span>
              <span className="text-[#e6edf3]">):</span>
            </div>
            <div className="leading-6">
              <span className="text-[#e6edf3]">        metrics = self.</span>
              <span className="code-function">analyze</span>
              <span className="text-[#e6edf3]">(response)</span>
            </div>
            <div className="leading-6">&nbsp;</div>
            <div className="leading-6">
              <span className="code-keyword">        return</span>
              <span className="text-[#e6edf3]"> {`{`}</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "clarity"</span>
              <span className="text-[#e6edf3]">: </span>
              <span className="code-number">0.92</span>
              <span className="text-[#e6edf3]">,</span>
              <span className="text-[#238636] ml-4"># High</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "tradeoffs"</span>
              <span className="text-[#e6edf3]">: </span>
              <span className="code-number">0.88</span>
              <span className="text-[#e6edf3]">,</span>
              <span className="text-[#238636] ml-4"># Good</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "adaptability"</span>
              <span className="text-[#e6edf3]">: </span>
              <span className="code-number">0.65</span>
              <span className="text-[#e6edf3]">,</span>
              <span className="text-[#d29922] ml-4"># Needs Work</span>
            </div>
            <div className="leading-6">
              <span className="code-string">            "awareness"</span>
              <span className="text-[#e6edf3]">: </span>
              <span className="code-number">0.78</span>
              <span className="text-[#e6edf3]">,</span>
              <span className="text-[#238636] ml-4"># Good</span>
            </div>
            <div className="leading-6">
              <span className="text-[#e6edf3]">        {`}`}</span>
            </div>
            <div className="leading-6">&nbsp;</div>
            <div className="leading-6">
              <span className="code-keyword">    def</span>{" "}
              <span className="code-function">iterate</span>
              <span className="text-[#e6edf3]">(self) -{">"} </span>
              <span className="code-type">Feedback</span>
              <span className="text-[#e6edf3]">:</span>
            </div>
            <div className="leading-6">
              <span className="code-keyword">        while</span>
              <span className="text-[#e6edf3]"> self.</span>
              <span className="code-variable">needs_work</span>
              <span className="text-[#e6edf3]">:</span>
            </div>
            <div className="leading-6">
              <span className="text-[#e6edf3]">            self.</span>
              <span className="code-function">refine</span>
              <span className="text-[#e6edf3]">()</span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 pt-3 border-t border-[#21262d]">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#238636]/15 border border-[#238636]/25">
              <div className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
              <span className="text-[#7ee787]">Clarity: High</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#238636]/15 border border-[#238636]/25">
              <div className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
              <span className="text-[#7ee787]">Tradeoffs: Good</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#d29922]/15 border border-[#d29922]/25">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d29922]" />
              <span className="text-[#e3b341]">Adapt: Needs Work</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#238636]/15 border border-[#238636]/25">
              <div className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
              <span className="text-[#7ee787]">Aware: Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorMockup;