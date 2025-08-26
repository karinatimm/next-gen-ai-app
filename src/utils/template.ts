const template = [
  {
    name: "Blog Ideas",
    desc: "An AI tool that generate blog ideas based on the topic you provide",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
    aiPrompt:
      "You are an expert blog strategist.\n\nGenerate 5 unique blog topic ideas in bullet points for the following niche or topic. Use Markdown formatting with appropriate headings (##, ###), paragraphs, and lists if needed. Be creative and ensure topics are relevant, engaging, and useful.\n\n### Topic:\n",
    slug: "ai-blog-title",
    form: [
      {
        label: "Enter your blog topic",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Blog Content",
    desc: "An AI tool that serves as your personal blog writer, generating high quality SEO ready blog posts in seconds.",
    category: "blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4905/4905454.png",
    slug: "ai-blog-content",
    aiPrompt:
      "You are a professional blog writer and SEO expert.\n\nWrite a high-quality, engaging, and SEO-optimized blog post based on the following title. Structure it using Markdown with proper headings, bullet points, and examples if necessary.\n\n### Title:\n ",
    form: [
      {
        label: "Enter your blog title",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "SMS",
    desc: "An AI tool that serves as your friend to write awesome message replies in seconds.",
    category: "sms",
    icon: "https://cdn-icons-png.flaticon.com/128/890/890260.png",
    slug: "ai-message",
    aiPrompt:
      "You are an expert in communication.\n\nGenerate a short, smart, and friendly reply to the following message. Make it sound natural and appropriate for a conversation.\n\n### Message:\n",
    form: [
      {
        label: "Enter the message you want to reply to",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Email Reply",
    desc: "An AI tool that serves as your personal assistant to write professional email replies in seconds.",
    category: "email",
    icon: "https://cdn-icons-png.flaticon.com/128/944/944948.png",
    slug: "ai-email",
    aiPrompt:
      "You are a professional email assistant.\n\nWrite a polite, clear, and professional reply to the following email. Structure the response in Markdown.\n\n### Email:\n",
    form: [
      {
        label: "Enter your youtube video topic keyowords",
        field: "textarea",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Food Research",
    desc: "An AI tool that serves as your personal dietitian, generating healthy and delicious recipes based on your preferences.",
    category: "food",
    icon: "https://cdn-icons-png.flaticon.com/128/706/706164.png",
    slug: "ai-food",
    aiPrompt:
      "You are a health expert and nutrition researcher.\n\nExplain the health benefits, nutritional value, and interesting facts about the following food item. Format the response using Markdown.\n\n### Food Item:\n",
    form: [
      {
        label: "Enter the food name",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Chef AI",
    desc: "An AI tool that serves as your personal chef, generating healthy and delicious recipes based on your preferences.",
    category: "recipes",
    icon: "https://cdn-icons-png.flaticon.com/128/1830/1830839.png",
    slug: "ai-chef",

    aiPrompt:
      "You are a professional chef and nutritionist.\n\nCreate a simple, healthy, and delicious recipe for the following dish or ingredients. Format it in Markdown with sections for Ingredients, Instructions, and Tips.\n\n### Dish or Ingredients:\n",

    form: [
      {
        label: "Enter your youtube title",
        field: "input",
        name: "title",
        required: true,
      },
    ],
  },

  {
    name: "Rewrite Article",
    desc: "Use this tool to rewrite existing Article or Blog Post which can bypass AI detectors and also make it plagiarism free.",
    icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
    category: "Rewriting Tool",
    slug: "ai-rewrite-article",
    aiPrompt:
      "You are a professional content writer and rewriter.\n\nRewrite the following article or blog post to make it 100% unique, plagiarism-free, and natural-sounding. Ensure the meaning stays the same and the text can bypass AI detectors. Format the output in **rich text Markdown**.Use Markdown formatting with appropriate headings (##, ###), paragraphs, and lists if needed.\n\n### Original Content:\n",
    form: [
      {
        label:
          "🤖 Provide your Article/Blogpost or any other content to rewrite.",
        field: "textarea",
        name: "article",
        required: true,
      },
    ],
  },
  {
    name: "Word Counter",
    desc: "This handy tool counts the number of words in your text, helping you stay within the word limit for your essays, articles, and more.",
    icon: "https://cdn-icons-png.flaticon.com/128/1686/1686815.png",
    category: "writing",
    slug: "ai-word-counter",
    aiPrompt:
      "You are a text analysis assistant.\n\nAnalyze the following text and provide:\n1. Total word count\n2. Total character count\n3. Number of unique words\n4. Top 10 most frequent words with their count\n\nFormat the output in Markdown.\n\n### Text:\n",
    form: [
      {
        label: "Enter the text you want to count the words for",
        field: "textarea",
        name: "word-counter",
        required: true,
      },
    ],
  },
  {
    name: "Add Emojis to Text",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
    icon: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
    category: "blog",
    slug: "ai-emoji-to-text",
    aiPrompt:
      "You are a creative writer assistant.\n\nEnhance the following text by adding contextually appropriate emojis. Ensure readability, avoid clutter, and place emojis where they naturally add emotion or clarity. Format the output in rich text Markdown.\n\n### Text:\n",
    form: [
      {
        label: "Enter your text to add emojis",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post Generator",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
    icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
    category: "blog",

    slug: "ai-instagram-post-generator",
    aiPrompt:
      "You are a social media expert.\n\nGenerate 3 catchy Instagram captions for the given keywords. Make them engaging, audience-friendly, and optimized for social media. Format each caption as a bullet point in Markdown.\n\n### Keywords:\n",
    form: [
      {
        label: "Enter Keywords for your post",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Hash Tag Generator",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
    icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
    category: "blog",

    slug: "ai-instagram-hash-tag-generator",
    aiPrompt:
      "You are an Instagram hashtag strategist.\n\nGenerate 15 relevant, trending, and high-visibility hashtags for the following keywords. Format the output as a hashtag list in Markdown.\n\n### Keywords:\n",
    form: [
      {
        label: "Enter Keywords for your instagram hastag",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    desc: "An AI tool that generate New and trending instagram idea depends on your niche",
    icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
    category: "instagram",

    slug: "ai-instagram-post-idea-generator",
    aiPrompt:
      "You are a content strategist for Instagram.\n\nGenerate 5–10 creative and trending ideas for Instagram posts or reels based on the given niche or keywords. Format the output in a numbered list using Markdown.\n\n### Niche / Keywords:\n",
    form: [
      {
        label: "Enter Keywords / Niche for your instagram idea",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "English Grammer Check",
    desc: "AI Model to Correct your english grammer by providing the text",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    category: "english",

    slug: "ai-english-grammer-checker",
    aiPrompt:
      "You are a professional English proofreader.\n\nCorrect all grammatical, spelling, and punctuation errors in the following text without changing its original meaning. Use natural phrasing. Format the corrected text in Markdown.\n\n### Original Text:\n",
    form: [
      {
        label: "Enter text to correct the grammer",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Write Code",
    desc: "AI Model to generate programming code in any language",
    icon: "https://cdn-icons-png.flaticon.com/128/6062/6062646.png",
    category: "Coding",

    slug: "ai-write-code",
    aiPrompt:
      "You are an expert software developer.\n\nWrite code according to the description provided. Include helpful comments and best practices. Format the output in a Markdown code block.\n\n### Code Requirements:\n",
    form: [
      {
        label:
          "Enter description of code you want along with Programming Language",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    desc: "AI Model to explain programming code in any language",
    icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
    category: "Coding",

    slug: "ai-explain-code",
    aiPrompt:
      "You are a senior software engineer.\n\nExplain what the following code does, line by line. Include details on logic, function, and flow. Format the explanation using Markdown and code blocks.\n\n### Code:\n",
    form: [
      {
        label: "Enter code which you want to understand",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in a straightforward, user-friendly way.",
    icon: "https://cdn-icons-png.flaticon.com/128/4426/4426267.png",
    category: "code-bug-detector",

    slug: "ai-code-bug-detector",
    aiPrompt:
      "You are a debugging assistant.\n\nAnalyze the code for bugs, logical errors, or bad practices. Suggest a fix and provide the corrected version of the code. Format the explanation and solution using Markdown and code blocks.\n\n### Code:\n",
    form: [
      {
        label: "Enter code which you want to test bug",
        field: "textarea",
        name: "codeInput",
        required: true,
      },
    ],
  },
  {
    name: "Tagline Generator",
    desc: "Struggling to find the perfect tagline for your brand? Let our AI-tool assist you in creating a tagline that stands out.",
    icon: "https://cdn-icons-png.flaticon.com/128/2178/2178616.png",
    category: "Marketting",

    slug: "ai-tagline-generator",
    aiPrompt:
      "You are a brand messaging expert.\n\nGenerate 5–10 catchy and creative taglines for the product described below. Use the product name and marketing outline for context. Format each tagline as a bullet point in Markdown.\n\n### Product Name:\n{{productName}}\n\n### Description:\n",
    form: [
      {
        label: "Product/Brand Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "What you are selling / Marketting",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Product Description",
    desc: "This is your AI-powered SEO expert, creating captivating and keyword-rich e-commerce product descriptions to boost your online sales.",
    icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
    category: "Marketting",

    slug: "ai-product-description",
    aiPrompt:
      "You are an e-commerce copywriter.\n\nCreate a short, compelling, and SEO-friendly product description using the provided product name and details. Format the output in Markdown.\n\n### Product Name:\n{{productName}}\n\n### Product Details:\n",
    form: [
      {
        label: "Product Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "Product Details",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
];

export default template;
