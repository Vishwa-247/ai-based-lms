
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("OpenAI Edge function invoked");
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set in environment variables");
      return new Response(JSON.stringify({
        success: false,
        error: 'OpenAI API key is not configured. Please set it in the Supabase Edge Function secrets.'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, prompt } = await req.json();
    console.log(`Processing ${action} request with prompt: ${prompt.substring(0, 100)}...`);

    // Set a timeout for the API call
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2048
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from OpenAI API:', errorText);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log(`OpenAI API response received successfully for ${action}`);
      
      // Extract the text from the response
      let text = '';
      try {
        text = responseData.choices[0].message.content || '';
        console.log(`Extracted text (first 100 chars): ${text.substring(0, 100)}...`);
      } catch (extractError) {
        console.error('Error extracting text from response:', extractError);
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: responseData,
        text: text
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fetchError) {
      clearTimeout(timeout);
      if (fetchError.name === 'AbortError') {
        console.error('OpenAI API request timed out');
        throw new Error('API request timed out. Please try again later.');
      }
      throw fetchError;
    }
    
  } catch (error) {
    console.error('Error in openai-api function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error during OpenAI API processing'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
