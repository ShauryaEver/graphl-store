export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    console.log("Generating image for prompt:", prompt);
    console.log("HF Key exists:", !!process.env.HUGGINGFACE_API_KEY);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: 512,
            height: 512,
            num_inference_steps: 20,
          },
          options: {
            wait_for_model: true, // ← this waits for model to load instead of failing
          },
        }),
      }
    );

    console.log("HF Response status:", response.status);

    if (!response.ok) {
  const text = await response.text();
  console.error("HF Response:", text);
  throw new Error(text);
}

    const imageBlob = await response.arrayBuffer();
    const base64 = Buffer.from(imageBlob).toString("base64");
    const imageDataUrl = `data:image/png;base64,${base64}`;

    return Response.json({ image: imageDataUrl });

  } catch (error) {
    console.error("FULL ERROR:", error);

    return Response.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}