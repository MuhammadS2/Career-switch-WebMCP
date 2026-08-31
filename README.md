# 🚀 Career Switch Canvas (powered by WebMCP)

> **O'z:** Sun'iy intellekt va WebMCP texnologiyasi yordamida kasbini o'zgartirmoqchi bo'lganlar uchun interaktiv ko'nikmalar xaritasi.
>
> **En:** Nowadays, as technology rapidly transforms job markets, many people face the urgent need to switch careers. However, traditional text outputs from AI make it difficult to clearly understand the learning roadmap. This project turns complex career pathways into an interactive, visual skill canvas powered by the new WebMCP protocol.

---

## 💡 What is this project?

While traditional generative AI models provide helpful career advice, their text-heavy outputs are often overwhelming and hard to follow. Since humans digest visual information significantly faster, representing skill trees directly on an interactive canvas makes career planning intuitive and clear. 

By leveraging the native WebMCP API (document.modelContext), browser-based AI agents can dynamically build and modify the interface in real time. Users no longer need to manually copy-paste recommendations or analyze plain text — the AI agent directly renders and updates the visual roadmap right on the web page.

---

## 🛠️ WebMCP Tools Registered

Our application exposes two core tools to the browser's AI context via document.modelContext:

1. build_skill_tree
   - Description: Builds an interactive skill tree canvas for a target career path.
   - Parameters: role (string), skills (array of objects containing id, label, category).

2. highlight_skill_gaps
   - Description: Highlights missing skills or prerequisites on the canvas in red to show learning gaps.
   - Parameters: missingNodeIds (array of strings).

---

## 💻 Tech Stack

- Framework: Next.js (React)
- Styling: Tailwind CSS
- Interactive Canvas: React Flow (@xyflow/react)
- Protocol: WebMCP API (document.modelContext)
- Deployment: Vercel

---

## 🚀 How to Run & Test Locally

1. Clone the repository:
   git clone [https://github.com/MuhammadS2/Career-switch-WebMCP.git](https://github.com/MuhammadS2/Career-switch-WebMCP.git)
   cd Career-switch-WebMCP

2. Install dependencies:
   npm install

3. Run development server:
   npm run dev

4. Test WebMCP Integration:
   - Enable the WebMCP testing flag in Chrome: chrome://flags/#enable-webmcp-testing -> Enabled.
   - Open Developer Tools (F12) and check registered tools via Console:
     document.modelContext.getTools().then(console.log);
   - Execute a tool directly or interact via a WebMCP-enabled browser agent!