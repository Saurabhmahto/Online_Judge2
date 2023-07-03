function extractTextFromHTML(input) {
    const regex = /<span(?:[^>]*)>([\s\S]*?)<\/span>/g;
    const matches = input.match(regex);
  
    if (matches) {
      const extractedText = matches
        .map((match) => match.replace(/<[^>]+>/g, '').trim())
        .join('\n');
        console.log(extractedText);
      return extractedText;
    }
  
    return '';
  }
  const input=`<span class="pln">T </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">int</span><span class="pun">(</span><span class="pln">input</span><span class="pun">())</span><span class="pln">
  </span><span class="kwd">for</span><span class="pln"> _ </span><span class="kwd">in</span><span class="pln"> range</span><span class="pun">(</span><span class="pln">T</span><span class="pun">):</span><span class="pln">
      n </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">int</span><span class="pun">(</span><span class="pln">input</span><span class="pun">())</span><span class="pln">
      a </span><span class="pun">=</span><span class="pln"> list</span><span class="pun">(</span><span class="pln">map</span><span class="pun">(</span><span class="kwd">int</span><span class="pun">,</span><span class="pln"> input</span><span class="pun">().</span><span class="pln">split</span><span class="pun">()))</span><span class="pln">
      
      sum </span><span class="pun">=</span><span class="pln"> </span><span class="lit">0</span><span class="pln">
      cnt </span><span class="pun">=</span><span class="pln"> </span><span class="lit">0</span><span class="pln">
      open </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">False</span><span class="pln">
      </span><span class="kwd">for</span><span class="pln"> x </span><span class="kwd">in</span><span class="pln"> a</span><span class="pun">:</span><span class="pln">
          sum </span><span class="pun">+=</span><span class="pln"> abs</span><span class="pun">(</span><span class="pln">x</span><span class="pun">)</span><span class="pln">
          </span><span class="kwd">if</span><span class="pln"> x </span><span class="pun">&lt;</span><span class="pln"> </span><span class="lit">0</span><span class="pln"> </span><span class="kwd">and</span><span class="pln"> </span><span class="kwd">not</span><span class="pln"> open</span><span class="pun">:</span><span class="pln">
              open </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">True</span><span class="pln">
              cnt </span><span class="pun">+=</span><span class="pln"> </span><span class="lit">1</span><span class="pln">
          </span><span class="kwd">if</span><span class="pln"> x </span><span class="pun">&gt;</span><span class="pln"> </span><span class="lit">0</span><span class="pun">:</span><span class="pln">
              open </span><span class="pun">=</span><span class="pln"> </span><span class="kwd">False</span><span class="pln">
   
      </span><span class="kwd">print</span><span class="pun">(</span><span class="pln">sum</span><span class="pun">,</span><span class="pln"> cnt</span><span class="pun">)</span>`
  extractTextFromHTML(input);