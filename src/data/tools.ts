import { Tool } from "@/types"

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting and tree view.",
    category: "json",
    icon: "braces",
    path: "/tools/json-formatter",
    featured: true,
    trending: true,
    tags: ["json", "formatter", "beautify", "validate", "prettify"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the JSON Formatter",
        content: 'Using ToolNova\'s JSON Formatter is simple. Paste your JSON code into the input area and click Format. The tool instantly validates your JSON syntax, highlights any errors, and displays a beautifully formatted output with proper indentation. You can also minify JSON for production use or switch to tree view for navigating complex nested structures.'
      },
      {
        title: "Features",
        content: 'ToolNova JSON Formatter includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>JSON validation with error highlighting</li><li>Auto-formatting with customizable indentation</li><li>Tree view for navigating nested objects</li><li>Minify option for production</li><li>Copy formatted output with one click</li><li>100% browser-based, no data sent to servers</li></ul>'
      },
      {
        title: "Why Use an Online JSON Formatter?",
        content: 'Validating and formatting JSON manually is error-prone and time-consuming. An online JSON formatter helps developers debug API responses, prepare configuration files, and maintain consistent formatting across teams. ToolNova makes this process instant and free.'
      }
    ],
    faq: [
      { question: "How do I format JSON online?", answer: "Paste your JSON code into ToolNova's JSON Formatter and click Format. The tool automatically beautifies your JSON with proper indentation." },
      { question: "Does ToolNova validate JSON?", answer: "Yes. The JSON Formatter validates your JSON syntax and highlights any errors with their exact location." },
      { question: "Is my JSON data safe?", answer: "Yes. All processing happens in your browser - your data never leaves your device." },
      { question: "Can I minify JSON?", answer: "Yes. ToolNova includes a minify option that compresses your JSON for production use." }
    ],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) instantly. Copy with one click.",
    category: "developer",
    icon: "key",
    path: "/tools/uuid-generator",
    featured: true,
    tags: ["uuid", "guid", "generator", "random", "id"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the UUID Generator",
        content: 'Click the Generate button to create a random UUID v4. Each click produces a new unique identifier. Use the copy button to copy the UUID to your clipboard instantly. You can generate as many UUIDs as you need - there are no limits.'
      },
      {
        title: "What is a UUID?",
        content: 'A UUID (Universally Unique Identifier) is a 128-bit label used for unique identification in computer systems. UUID v4 generates random identifiers that are practically impossible to duplicate, making them ideal for database keys, session IDs, transaction IDs, and distributed systems.'
      },
      {
        title: "Common Use Cases",
        content: 'UUIDs are widely used for: <br><br><ul class="list-disc pl-5 space-y-1"><li>Database primary keys</li><li>API resource identifiers</li><li>Session and request tracking</li><li>File and asset naming</li><li>Distributed system coordination</li></ul>'
      }
    ],
    faq: [
      { question: "What is a UUID?", answer: "A UUID is a 128-bit universally unique identifier. UUID v4 uses random numbers to create identifiers that are practically unique." },
      { question: "Are UUIDs truly unique?", answer: "UUID v4 generates 122 random bits, making the probability of collision extremely low - about 1 in 5.3\u00d710^36." },
      { question: "Is the UUID Generator free?", answer: "Yes. ToolNova's UUID Generator is completely free with no usage limits." },
      { question: "Can I copy UUIDs easily?", answer: "Yes. Each UUID has a copy button that copies it to your clipboard with one click." }
    ],
  },
  {
    id: "qr-generator",
    name: "QR Generator",
    description: "Create custom QR codes with colors, logos, and sizes. Download as PNG or SVG.",
    category: "qr",
    icon: "qr-code",
    path: "/tools/qr-generator",
    featured: true,
    trending: true,
    tags: ["qr", "code", "generator", "barcode", "scan"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the QR Generator",
        content: 'Enter the text or URL you want to encode, then customize the colors, add a logo, and choose your size. Click Generate to preview your QR code instantly. Once satisfied, download it as PNG or SVG for use on business cards, flyers, or product packaging.'
      },
      {
        title: "Features",
        content: 'ToolNova QR Generator offers: <br><br><ul class="list-disc pl-5 space-y-1"><li>Custom foreground and background colors</li><li>Logo image overlay support</li><li>Adjustable size and error correction</li><li>Download as PNG or SVG</li><li>Instant preview on every change</li><li>No uploads - everything runs in your browser</li></ul>'
      },
      {
        title: "Why Use a Custom QR Code?",
        content: 'Branded QR codes with custom colors and logos attract more scans and look professional. Whether you are sharing a link, WiFi credentials, or contact information, ToolNova makes it easy to generate beautiful QR codes in seconds.'
      }
    ],
    faq: [
      { question: "What can I encode in a QR code?", answer: "You can encode URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, and more." },
      { question: "Can I add a logo to my QR code?", answer: "Yes. ToolNova's QR Generator lets you upload a logo image that is placed in the center of the QR code." },
      { question: "What formats can I download?", answer: "You can download QR codes as PNG for web use or SVG for print and scaling." },
      { question: "Are my QR codes free to use?", answer: "Yes. All QR codes generated on ToolNova are completely free with no watermark or usage limits." }
    ],
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs with real-time statistics.",
    category: "text",
    icon: "type",
    path: "/tools/word-counter",
    featured: true,
    tags: ["words", "counter", "characters", "sentences", "text"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Word Counter",
        content: 'Type or paste your text into the editor. The word counter updates in real time, displaying word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. It is perfect for writers, students, and SEO professionals.'
      },
      {
        title: "Features",
        content: 'ToolNova Word Counter provides: <br><br><ul class="list-disc pl-5 space-y-1"><li>Real-time word and character counting</li><li>Sentence and paragraph detection</li><li>Reading time estimation</li><li>Speaking time estimation</li><li>Character count with and without spaces</li><li>Top keywords density analysis</li></ul>'
      },
      {
        title: "Why Track Word Count?",
        content: 'Whether you are writing an essay, a blog post, or a social media update, staying within length limits is crucial. ToolNova Word Counter helps you meet requirements for academic submissions, SEO meta descriptions, and content guidelines effortlessly.'
      }
    ],
    faq: [
      { question: "Does the word counter count characters?", answer: "Yes. It counts characters with and without spaces, words, sentences, and paragraphs in real time." },
      { question: "Is there a text limit?", answer: "No. You can paste or type as much text as you want with no limits." },
      { question: "Does it work offline?", answer: "Yes. All processing is done locally in your browser - no internet connection required once the page loads." },
      { question: "Can I check reading time?", answer: "Yes. The tool estimates both reading time and speaking time based on average rates." }
    ],
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more.",
    category: "text",
    icon: "case-sensitive",
    path: "/tools/case-converter",
    trending: true,
    tags: ["case", "converter", "camel", "snake", "kebab", "pascal"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Case Converter",
        content: 'Paste or type your text into the input area and select the desired case format. ToolNova instantly converts your text to camelCase, PascalCase, snake_case, kebab-case, UPPER CASE, lower case, Title Case, and more. Copy the result with one click.'
      },
      {
        title: "Features",
        content: 'ToolNova Case Converter supports: <br><br><ul class="list-disc pl-5 space-y-1"><li>camelCase conversion</li><li>PascalCase conversion</li><li>snake_case conversion</li><li>kebab-case conversion</li><li>UPPER CASE and lower case</li><li>Title Case and Sentence case</li></ul>'
      },
      {
        title: "Why Use a Case Converter?",
        content: 'Developers frequently need to switch between naming conventions for different programming languages and frameworks. ToolNova Case Converter saves time and prevents errors when renaming variables, files, or database fields across your projects.'
      }
    ],
    faq: [
      { question: "What case formats are supported?", answer: "camelCase, PascalCase, snake_case, kebab-case, UPPER CASE, lower case, Title Case, Sentence case, and more." },
      { question: "Is the converter free?", answer: "Yes. ToolNova's Case Converter is completely free with no usage limits." },
      { question: "Can I convert multiple words at once?", answer: "Yes. Paste any amount of text and convert it all at once." },
      { question: "Does it work with programming code?", answer: "Yes. It works great for converting variable names, function names, and file names between conventions." }
    ],
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    description: "Generate URL-friendly slugs from any text. Perfect for SEO-friendly URLs.",
    category: "seo",
    icon: "link",
    path: "/tools/slug-generator",
    tags: ["slug", "url", "seo", "generator", "permalink"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Slug Generator",
        content: 'Type your title or text into the input field and watch as ToolNova generates a clean, URL-friendly slug in real time. The tool removes special characters, converts spaces to hyphens, lowercases everything, and strips accents. Copy your slug with one click.'
      },
      {
        title: "Features",
        content: 'ToolNova Slug Generator includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>Real-time slug generation as you type</li><li>Automatic special character removal</li><li>Accent and diacritic stripping</li><li>Custom separator support</li><li>Lowercase conversion</li><li>One-click copy to clipboard</li></ul>'
      },
      {
        title: "Why Slugs Matter for SEO?",
        content: 'Clean, descriptive URLs improve click-through rates and help search engines understand your content. ToolNova Slug Generator helps you create optimized URL slugs for blog posts, product pages, and any web content, boosting your SEO performance.'
      }
    ],
    faq: [
      { question: "What is a URL slug?", answer: "A slug is the part of a URL that identifies a specific page in a human-readable format, like /my-blog-post." },
      { question: "Why are slugs important for SEO?", answer: "Descriptive slugs help search engines understand page content and improve click-through rates in search results." },
      { question: "Can I customize the separator?", answer: "Yes. You can choose between hyphens, underscores, or other separators for your slugs." },
      { question: "Does it handle special characters?", answer: "Yes. The slug generator automatically removes or replaces special characters and accents." }
    ],
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images without losing quality. Supports JPEG, PNG, WebP, and AVIF.",
    category: "image",
    icon: "image",
    path: "/tools/image-compressor",
    featured: true,
    trending: true,
    tags: ["image", "compress", "optimize", "reduce", "size"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Image Compressor",
        content: 'Upload an image by clicking or dragging it onto the upload area. Choose your desired output format (JPEG, PNG, WebP, or AVIF) and adjust the quality slider. The tool shows a live preview with file size comparison. Download your compressed image when ready.'
      },
      {
        title: "Features",
        content: 'ToolNova Image Compressor offers: <br><br><ul class="list-disc pl-5 space-y-1"><li>Lossless and lossy compression modes</li><li>Support for JPEG, PNG, WebP, and AVIF</li><li>Adjustable quality slider with live preview</li><li>Batch compression support</li><li>Before and after size comparison</li><li>100% browser-based processing</li></ul>'
      },
      {
        title: "Why Compress Images?",
        content: 'Smaller images load faster, use less bandwidth, and improve website performance. Compressed images boost your PageSpeed score, enhance user experience on mobile devices, and reduce hosting costs. ToolNova makes compression quick and effortless.'
      }
    ],
    faq: [
      { question: "What image formats are supported?", answer: "JPEG, PNG, WebP, and AVIF for both input and output." },
      { question: "Is the compression lossless?", answer: "You can choose between lossless compression (no quality loss) or lossy compression (smaller file size with minimal quality reduction)." },
      { question: "Are my images uploaded to a server?", answer: "No. All compression happens in your browser - your images never leave your device." },
      { question: "What is the maximum file size?", answer: "There is no strict limit, but very large images may take longer to process in the browser." }
    ],
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact dimensions. Maintain aspect ratio or crop to fit.",
    category: "image",
    icon: "crop",
    path: "/tools/image-resizer",
    tags: ["image", "resize", "dimensions", "crop", "scale"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Image Resizer",
        content: 'Upload your image, then enter the desired width and height. Choose whether to maintain the aspect ratio or crop to fit exact dimensions. The preview updates in real time. Download your resized image in your preferred format.'
      },
      {
        title: "Features",
        content: 'ToolNova Image Resizer provides: <br><br><ul class="list-disc pl-5 space-y-1"><li>Custom width and height input</li><li>Aspect ratio lock and unlock</li><li>Crop to exact dimensions mode</li><li>Real-time preview</li><li>Multiple output formats</li><li>Batch resize support</li></ul>'
      },
      {
        title: "Why Resize Images?",
        content: 'Properly sized images improve page load times and ensure your visuals look crisp on all devices. Whether you are preparing images for a website, social media, or print, ToolNova Image Resizer helps you get the perfect dimensions every time.'
      }
    ],
    faq: [
      { question: "Can I resize multiple images at once?", answer: "Yes. The batch resize feature lets you upload and resize multiple images simultaneously." },
      { question: "Does it maintain aspect ratio?", answer: "Yes. You can lock the aspect ratio to keep proportions intact, or unlock it to crop freely." },
      { question: "What output formats are available?", answer: "You can download resized images as JPEG, PNG, WebP, or AVIF." },
      { question: "Is my data safe?", answer: "Yes. All processing is done in your browser - no images are uploaded to any server." }
    ],
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick colors from anywhere. Get HEX, RGB, HSL, and OKLCH values instantly.",
    category: "color",
    icon: "palette",
    path: "/tools/color-picker",
    featured: true,
    tags: ["color", "picker", "hex", "rgb", "hsl", "palette"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Color Picker",
        content: 'Click on the color area to pick a color, or enter a HEX, RGB, HSL, or OKLCH value directly. The tool displays the color visually and shows all color format conversions in real time. Copy any value with one click for use in your CSS or design files.'
      },
      {
        title: "Features",
        content: 'ToolNova Color Picker includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>Visual color picker with eyedropper</li><li>HEX, RGB, HSL, and OKLCH values</li><li>Color history for quick access</li><li>Color palette generation</li><li>Accessibility contrast checking</li><li>One-click copy for all formats</li></ul>'
      },
      {
        title: "Why Use a Color Picker?",
        content: 'Designers and developers need consistent color values across projects. ToolNova Color Picker makes it easy to explore colors, convert between formats, and ensure accessibility with contrast ratio checks. It is an essential tool for anyone working with color.'
      }
    ],
    faq: [
      { question: "What color formats are supported?", answer: "HEX, RGB, HSL, and OKLCH color formats are all supported with real-time conversion." },
      { question: "Can I pick colors from my screen?", answer: "Yes. The eyedropper tool lets you pick colors from anywhere on your screen." },
      { question: "Does it check color contrast?", answer: "Yes. The tool includes an accessibility checker that calculates contrast ratios against WCAG guidelines." },
      { question: "Can I save my favorite colors?", answer: "Yes. The color history feature saves your recently picked colors for quick access." }
    ],
  },
  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description: "Create beautiful CSS gradients with multiple color stops and angle controls.",
    category: "color",
    icon: "gradient",
    path: "/tools/gradient-generator",
    tags: ["gradient", "css", "color", "generator", "design"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Gradient Generator",
        content: 'Select two or more colors and adjust the gradient angle to create a custom linear gradient. Add multiple color stops and fine-tune their positions. Preview the gradient in real time and copy the generated CSS code for use in your projects.'
      },
      {
        title: "Features",
        content: 'ToolNova Gradient Generator offers: <br><br><ul class="list-disc pl-5 space-y-1"><li>Linear and radial gradient support</li><li>Multiple color stops with adjustable positions</li><li>Angle control with visual dial</li><li>Real-time live preview</li><li>CSS code output with browser prefixes</li><li>Color picker for each stop</li></ul>'
      },
      {
        title: "Why Use a Gradient Generator?",
        content: 'CSS gradients add depth and visual interest to web designs without needing image files. ToolNova Gradient Generator helps you create stunning gradients visually and instantly get the production-ready CSS code, saving hours of manual trial and error.'
      }
    ],
    faq: [
      { question: "What types of gradients can I create?", answer: "You can create linear gradients with custom angles and radial gradients with custom shapes." },
      { question: "How many color stops can I add?", answer: "You can add as many color stops as you need and adjust each one's position independently." },
      { question: "Can I copy the CSS code?", answer: "Yes. The generated CSS code is ready to copy and paste into your stylesheets." },
      { question: "Does it support browser prefixes?", answer: "Yes. The CSS output includes necessary vendor prefixes for cross-browser compatibility." }
    ],
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable options and strength meter.",
    category: "generator",
    icon: "lock",
    path: "/tools/password-generator",
    featured: true,
    trending: true,
    tags: ["password", "security", "generator", "strong", "random"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Password Generator",
        content: 'Select your password requirements: length, uppercase letters, lowercase letters, numbers, and symbols. The strength meter updates in real time as you adjust options. Click Generate to create a secure password, then copy it with one click. All generation happens locally in your browser.'
      },
      {
        title: "Features",
        content: 'ToolNova Password Generator includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>Customizable password length</li><li>Uppercase, lowercase, numbers, and symbols toggles</li><li>Real-time strength meter with color coding</li><li>Avoid ambiguous characters option</li><li>Bulk generate multiple passwords</li><li>One-click copy to clipboard</li></ul>'
      },
      {
        title: "Why Use a Strong Password?",
        content: 'Weak passwords are the leading cause of account breaches. ToolNova Password Generator creates cryptographically random passwords that are resistant to brute-force attacks, dictionary attacks, and common hacking techniques. Stay safe with strong, unique passwords for every account.'
      }
    ],
    faq: [
      { question: "How strong are the generated passwords?", answer: "Passwords are generated using cryptographically random numbers and can include uppercase, lowercase, numbers, and symbols for maximum strength." },
      { question: "Are passwords stored or sent anywhere?", answer: "No. All generation happens locally in your browser - passwords are never stored or transmitted." },
      { question: "What password length should I use?", answer: "We recommend at least 12 characters for most uses and 16+ characters for sensitive accounts." },
      { question: "Can I exclude ambiguous characters?", answer: "Yes. You can toggle the option to exclude characters like 0, O, l, and 1 that are easy to confuse." },
      { question: "Can I generate multiple passwords at once?", answer: "Yes. The bulk generate feature lets you create multiple passwords in one click." }
    ],
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    description: "Create professional invoices with customizable fields. Download as PDF.",
    category: "business",
    icon: "file-text",
    path: "/tools/invoice-generator",
    tags: ["invoice", "business", "pdf", "generator", "billing"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Invoice Generator",
        content: 'Fill in your business details, client information, line items with quantities and rates, and optional tax and discount fields. Preview the invoice in real time. When ready, download as a professional PDF that is ready to email or print.'
      },
      {
        title: "Features",
        content: 'ToolNova Invoice Generator provides: <br><br><ul class="list-disc pl-5 space-y-1"><li>Customizable invoice fields and line items</li><li>Automatic totals, tax, and discount calculation</li><li>Professional PDF export</li><li>Invoice numbering and date tracking</li><li>Multiple currency support</li><li>No account or sign-up required</li></ul>'
      },
      {
        title: "Why Use an Online Invoice Generator?",
        content: 'Creating invoices manually in spreadsheets or word processors is time-consuming and error-prone. ToolNova Invoice Generator helps freelancers and small businesses create professional invoices in minutes, with automatic calculations and PDF export, completely free.'
      }
    ],
    faq: [
      { question: "Is the invoice generator free?", answer: "Yes. ToolNova's Invoice Generator is completely free with no limits on the number of invoices you can create." },
      { question: "Can I add my company logo?", answer: "Yes. You can upload your logo to appear on the invoice header." },
      { question: "What currencies are supported?", answer: "Multiple currencies including USD, EUR, GBP, INR, CAD, AUD, and more." },
      { question: "Can I download as PDF?", answer: "Yes. Invoices are exported as professional PDF files ready to share." },
      { question: "Do I need an account?", answer: "No. You can create and download invoices without signing up or creating an account." }
    ],
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate monthly EMI, total interest, and payment schedule for loans.",
    category: "finance",
    icon: "calculator",
    path: "/tools/emi-calculator",
    tags: ["emi", "loan", "calculator", "interest", "finance"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the EMI Calculator",
        content: 'Enter the loan amount, interest rate, and loan tenure. The EMI calculator instantly shows your monthly payment, total interest payable, and total amount. A detailed amortization schedule breaks down each payment into principal and interest components.'
      },
      {
        title: "Features",
        content: 'ToolNova EMI Calculator includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>Instant EMI calculation</li><li>Total interest and total payment display</li><li>Full amortization schedule table</li><li>Principal vs interest pie chart</li><li>Monthly, quarterly, and yearly views</li><li>Adjustable loan tenure in months or years</li></ul>'
      },
      {
        title: "Why Calculate EMI Before Taking a Loan?",
        content: 'Understanding your monthly obligations helps you plan your finances and choose the right loan. ToolNova EMI Calculator helps you compare different loan amounts, interest rates, and tenures to find the most affordable option for your budget.'
      }
    ],
    faq: [
      { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment - the fixed monthly payment you make to repay a loan." },
      { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: P x R x (1+R)^N / ((1+R)^N - 1), where P is principal, R is monthly interest rate, and N is number of months." },
      { question: "Can I see the amortization schedule?", answer: "Yes. The tool displays a complete breakup showing principal and interest for each payment." },
      { question: "Is this calculator free?", answer: "Yes. ToolNova's EMI Calculator is completely free with no usage limits." }
    ],
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, days, hours, minutes, and seconds.",
    category: "calculator",
    icon: "calendar",
    path: "/tools/age-calculator",
    tags: ["age", "calculator", "birthday", "date", "time"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Age Calculator",
        content: 'Enter your date of birth and optionally a reference date (defaults to today). The age calculator instantly shows your exact age in years, months, days, hours, minutes, and seconds. It also displays your next birthday and the time remaining until it.'
      },
      {
        title: "Features",
        content: 'ToolNova Age Calculator provides: <br><br><ul class="list-disc pl-5 space-y-1"><li>Exact age in years, months, and days</li><li>Age in hours, minutes, and seconds</li><li>Countdown to next birthday</li><li>Zodiac sign display</li><li>Birthstone and birth flower info</li><li>Custom reference date support</li></ul>'
      },
      {
        title: "Why Use an Age Calculator?",
        content: 'Whether you are calculating age for forms, verifying eligibility, or just curious, ToolNova Age Calculator gives you precise results down to the second. It is also great for finding out fun facts like your zodiac sign and birthstone.'
      }
    ],
    faq: [
      { question: "How accurate is the age calculation?", answer: "The age calculator provides precision down to years, months, days, hours, minutes, and seconds." },
      { question: "Can I use a different reference date?", answer: "Yes. You can set a custom reference date instead of using today's date." },
      { question: "Does it show my zodiac sign?", answer: "Yes. The tool displays your zodiac sign based on your birth date." },
      { question: "Is this tool free?", answer: "Yes. ToolNova's Age Calculator is completely free to use." }
    ],
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and get health category insights.",
    category: "calculator",
    icon: "activity",
    path: "/tools/bmi-calculator",
    tags: ["bmi", "health", "calculator", "weight", "fitness"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the BMI Calculator",
        content: 'Enter your weight and height using either metric (kg/cm) or imperial (lbs/ft) units. The BMI calculator instantly shows your BMI value and categorizes you as underweight, normal, overweight, or obese based on WHO standards. A visual gauge makes the result easy to understand.'
      },
      {
        title: "Features",
        content: 'ToolNova BMI Calculator offers: <br><br><ul class="list-disc pl-5 space-y-1"><li>Metric and imperial unit support</li><li>WHO-standard BMI categories</li><li>Interactive BMI gauge visualization</li><li>Healthy weight range for your height</li><li>BMI for children and adults</li><li>Color-coded category indicators</li></ul>'
      },
      {
        title: "Why Track Your BMI?",
        content: 'Body Mass Index is a useful screening tool for identifying weight-related health risks. While it does not measure body fat directly, it correlates with health outcomes. ToolNova BMI Calculator helps you understand your BMI category and track changes over time.'
      }
    ],
    faq: [
      { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults according to WHO standards." },
      { question: "Is BMI accurate for athletes?", answer: "BMI may overestimate body fat in athletes with high muscle mass. It is a screening tool, not a diagnostic measure." },
      { question: "Can I switch between metric and imperial?", answer: "Yes. You can toggle between kg/cm and lbs/ft units at any time." },
      { question: "Is the BMI calculator free?", answer: "Yes. ToolNova's BMI Calculator is completely free with no usage limits." }
    ],
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, discounts, tips, and ratios with ease.",
    category: "calculator",
    icon: "percent",
    path: "/tools/percentage-calculator",
    tags: ["percentage", "calculator", "discount", "ratio", "math"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Percentage Calculator",
        content: 'Choose from common percentage calculations: what is X% of Y, X is what percent of Y, percentage increase/decrease, and tip calculator. Enter your values and get instant results. Perfect for shopping discounts, financial calculations, and everyday math.'
      },
      {
        title: "Features",
        content: 'ToolNova Percentage Calculator includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>What is X% of Y calculator</li><li>X is what percent of Y calculator</li><li>Percentage increase/decrease calculator</li><li>Tip calculator with bill splitting</li><li>Discount amount and final price</li><li>Ratio and proportion support</li></ul>'
      },
      {
        title: "Why Use a Percentage Calculator?",
        content: 'Percentage calculations are everywhere - from shopping discounts and tax rates to investment returns and statistics. ToolNova Percentage Calculator handles all common percentage scenarios instantly, eliminating mental math errors and saving time.'
      }
    ],
    faq: [
      { question: "What percentage calculations are supported?", answer: "Percentage of a number, percentage change, percentage increase/decrease, tips, discounts, and ratios." },
      { question: "Can I calculate tips with splitting?", answer: "Yes. The tip calculator lets you add a tip percentage and split the bill among any number of people." },
      { question: "Is there a discount calculator?", answer: "Yes. Enter the original price and discount percentage to see the final price and amount saved." },
      { question: "Is this tool free?", answer: "Yes. ToolNova's Percentage Calculator is completely free with no usage limits." }
    ],
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Encode and decode text or files to and from Base64 format instantly.",
    category: "developer",
    icon: "binary",
    path: "/tools/base64-encoder",
    tags: ["base64", "encode", "decode", "binary", "text"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Base64 Encoder",
        content: 'Type or paste text into the input area, or upload a file to encode it to Base64. Choose between Encode and Decode modes. The tool processes your input instantly and displays the result. Copy the encoded or decoded output with one click for use in API calls, data URIs, or storage.'
      },
      {
        title: "Features",
        content: 'ToolNova Base64 Encoder provides: <br><br><ul class="list-disc pl-5 space-y-1"><li>Encode text and files to Base64</li><li>Decode Base64 back to readable text</li><li>File upload support for encoding</li><li>Real-time encoding and decoding</li><li>One-click copy output</li><li>Base64 URL-safe mode support</li></ul>'
      },
      {
        title: "Why Use Base64 Encoding?",
        content: 'Base64 encoding is essential for transmitting binary data in text-based formats like JSON, XML, and HTML. It is commonly used for embedding images in CSS, encoding API payloads, and storing binary data in databases. ToolNova makes encoding and decoding instant and hassle-free.'
      }
    ],
    faq: [
      { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters." },
      { question: "Can I encode files?", answer: "Yes. You can upload files to encode them to Base64, which is useful for data URIs and API payloads." },
      { question: "Can I decode Base64?", answer: "Yes. Paste a Base64 string and switch to Decode mode to convert it back to readable text." },
      { question: "Is there a size limit?", answer: "There is no strict limit, but very large files may take longer to process in the browser." },
      { question: "Is my data secure?", answer: "Yes. All encoding and decoding happens entirely in your browser - no data is sent to any server." }
    ],
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to readable dates and vice versa in multiple formats.",
    category: "developer",
    icon: "clock",
    path: "/tools/timestamp-converter",
    tags: ["timestamp", "unix", "date", "converter", "time"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Timestamp Converter",
        content: 'Enter a Unix timestamp (in seconds or milliseconds) to convert it to a human-readable date, or enter a date to get its Unix timestamp. The tool supports multiple output formats including ISO 8601, UTC, and local time. Copy any result with one click.'
      },
      {
        title: "Features",
        content: 'ToolNova Timestamp Converter includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>Unix timestamp to date conversion</li><li>Date to Unix timestamp conversion</li><li>Support for seconds and milliseconds</li><li>ISO 8601, UTC, and local time formats</li><li>Relative time display (2 hours ago)</li><li>Timezone offset information</li></ul>'
      },
      {
        title: "Why Use a Timestamp Converter?",
        content: 'Developers frequently work with Unix timestamps in databases, API responses, and logs. ToolNova Timestamp Converter makes it easy to translate between machine-readable timestamps and human-readable dates, debugging time-related issues faster.'
      }
    ],
    faq: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since January 1, 1970, 00:00:00 UTC." },
      { question: "Does it support milliseconds?", answer: "Yes. The converter works with both second-based and millisecond-based timestamps." },
      { question: "What date formats are available?", answer: "ISO 8601, UTC string, local date string, and relative time formats." },
      { question: "Is this tool free?", answer: "Yes. ToolNova's Timestamp Converter is completely free with no usage limits." }
    ],
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens. View header, payload, and signature.",
    category: "developer",
    icon: "shield",
    path: "/tools/jwt-decoder",
    tags: ["jwt", "token", "decode", "json", "auth"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the JWT Decoder",
        content: 'Paste your JWT token into the input area. The tool automatically decodes the header and payload sections, displaying them as formatted JSON. It shows the token\'s expiration time, issuer, subject, and other claims. Note that the signature is verified but the tool does not store or transmit your tokens.'
      },
      {
        title: "Features",
        content: 'ToolNova JWT Decoder offers: <br><br><ul class="list-disc pl-5 space-y-1"><li>Automatic JWT header and payload decoding</li><li>Formatted JSON display with syntax highlighting</li><li>Expiration time and remaining validity</li><li>Issuer, subject, and audience extraction</li><li>Signature verification status</li><li>100% client-side processing</li></ul>'
      },
      {
        title: "Why Decode JWTs?",
        content: 'Debugging authentication issues often requires inspecting JWT tokens to verify claims, check expiration times, and validate signatures. ToolNova JWT Decoder makes this process transparent and secure by keeping all processing in your browser.'
      }
    ],
    faq: [
      { question: "What is a JWT?", answer: "A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and information exchange between parties." },
      { question: "Can I verify JWT signatures?", answer: "Yes. The tool checks the signature and shows whether it is valid, but for security reasons, signature verification is basic." },
      { question: "Are my tokens stored?", answer: "No. All decoding happens locally in your browser - tokens are never stored or sent to any server." },
      { question: "What claims does the tool show?", answer: "Standard claims like iss, sub, aud, exp, nbf, iat, jti, as well as any custom claims in the payload." }
    ],
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching and explanation.",
    category: "developer",
    icon: "search-code",
    path: "/tools/regex-tester",
    tags: ["regex", "regular expression", "tester", "pattern", "match"],
    publishedAt: "2026-01-01",
    content: [
      {
        title: "How to Use the Regex Tester",
        content: 'Enter your regular expression pattern and choose flags (g, i, m, s, u, y). Type your test string in the text area and see all matches highlighted in real time. The tool shows match details, capture groups, and provides a plain-English explanation of what your regex does.'
      },
      {
        title: "Features",
        content: 'ToolNova Regex Tester includes: <br><br><ul class="list-disc pl-5 space-y-1"><li>Real-time regex matching and highlighting</li><li>All RegExp flags support (g, i, m, s, u, y)</li><li>Capture group extraction</li><li>Regex explanation in plain English</li><li>Common regex pattern library</li><li>Error highlighting for invalid patterns</li></ul>'
      },
      {
        title: "Why Use a Regex Tester?",
        content: 'Regular expressions are powerful but notoriously tricky to get right. ToolNova Regex Tester helps you develop and debug patterns interactively, with instant feedback and explanations. It is an indispensable tool for developers working with text processing, validation, and data extraction.'
      }
    ],
    faq: [
      { question: "What regex engine is used?", answer: "The tool uses JavaScript's RegExp engine, which is similar to Perl-compatible regex (PCRE) with some differences." },
      { question: "Does it support capture groups?", answer: "Yes. Capture groups are highlighted and extracted separately in the results panel." },
      { question: "Can I save my regex patterns?", answer: "The tool includes a library of common regex patterns for emails, URLs, phone numbers, and more." },
      { question: "Does it explain regex syntax?", answer: "Yes. The tool provides a plain-English explanation of what your regex pattern matches." },
      { question: "Is this tool free?", answer: "Yes. ToolNova's Regex Tester is completely free with no usage limits." }
    ],
  },
]

export const featuredTools = tools.filter(t => t.featured)
export const trendingTools = tools.filter(t => t.trending)
export const newTools = tools.filter(t => t.new)

export function getToolById(id: string) {
  return tools.find(t => t.id === id)
}

export function getToolByPath(path: string) {
  return tools.find(t => t.path === path)
}

export function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category)
}

export function searchTools(query: string) {
  const q = query.toLowerCase()
  return tools.filter(
    t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
  )
}
