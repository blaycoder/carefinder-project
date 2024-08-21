This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


**Features**
Hospital Search: Users can search for hospitals within their region by inputting their location or selecting from a list of nearby cities. The platform displays hospitals along with their contact details, including address, phone number, and email.

**Export Hospitals**: Users can export the list of hospitals to a CSV file, allowing them to save and share the information easily. This feature leverages Firebase's file storage capabilities.

**Share Hospitals**: Users can share the hospital list via email or by generating a shareable link, utilizing Firebase's email and link-sharing functionalities.

**User Authentication:** Admin users must create an account to access the platform's admin features. This is implemented using Firebase's authentication feature, supporting multiple authentication methods like email/password and social media logins.

**Markdown Support:** Admin users can create hospital entries and corresponding details using markdown, which allows for easy formatting, link insertion, and image embedding. A simple text editor with markdown syntax support is provided.

**Prerequisites**
1. Node.js and npm installed on your machine.
2. Firebase account set up for backend service
