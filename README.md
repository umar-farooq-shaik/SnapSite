# SnapSite

![SnapSite Banner](https://drive.google.com/uc?export=view&id=1LzlTzGBhKC7xwqmKMJr_Rlzaw5tSNHtz)

SnapSite is a powerful web application that allows users to prompt, run, edit, and deploy full-stack web applications. It leverages modern technologies like Next.js, Tailwind CSS, and Convex to provide a seamless and intuitive experience for developers and non-developers alike.
🎥 [![Watch the Demo Video](public/thumbnail.png)](https://drive.google.com/file/d/1FQMUe2VaoyTS8RJr1djsZy7Y5LLVe1Cy/view?usp=drivesdk)

## Features

- **AI-Powered Code Generation**: Generate React-based projects with Tailwind CSS styling using AI prompts.
- **Workspace Management**: Save and manage your workspaces for easy access to previous projects.
- **Live Code Preview**: Use Sandpack to edit and preview your code in real-time.
- **Token-Based System**: Manage your usage with tokens and upgrade plans as needed.
- **User Authentication**: Secure login with Google OAuth.
- **Responsive Design**: Fully responsive UI for both desktop and mobile devices.
- **Integrated Payments**: Upgrade your plan using PayPal for additional tokens.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Convex for database and serverless functions
- **AI Integration**: Google Generative AI for code and chat responses
- **Authentication**: Google OAuth
- **Payments**: PayPal integration
- **Real-Time Code Editing**: Sandpack by CodeSandbox



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Convex CLI  
  ```bash
  npm install -g convex
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/snapsite.git
   cd snapsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_CONVEX_URL=<your_convex_url>
   NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=<your_google_client_id>
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your_paypal_client_id>
   NEXT_PUBLIC_GEMINI_API_KEY=<your_google_gen_ai_api_key>
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) **in your browser to see the result.**

## Deployment

SnapSite can be deployed on platforms like **Vercel** or **Netlify**. Follow the platform-specific instructions for deploying a Next.js application.

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

## Contact

For any inquiries or support, please contact:  
📧 [umarfarooqshaik414@gmail.com](mailto:umarfarooqshaik414@gmail.com)
