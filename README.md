# Payment Integration with Razorpay

A robust, production-ready Next.js application demonstrating seamless payment integration using Razorpay. This project covers one-time payments, subscription management, and webhook handling, built with modern web technologies.

## 🚀 Features

- **One-Time Payments**: Secure checkout flow for single transactions.
- **Subscription Management**: Recurring billing integration with Razorpay Subscriptions.
- **Webhook Handling**: Robust processing of Razorpay webhooks (e.g., payment success, subscription activation).
- **Modern Tech Stack**: Built with Next.js 15 (App Router), React 19, and TypeScript.
- **Styling**: Responsive and clean UI using Tailwind CSS 4.
- **Developer Experience**: Integrated `mprocs` for running the dev server and ngrok tunnel simultaneously.
- **Environment Management**: Scripts to easily switch between local and production configurations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Payments**: [Razorpay SDK](https://razorpay.com/docs/)
- **Tooling**: [mprocs](https://github.com/pvolok/mprocs) (Process management), [ngrok](https://ngrok.com/) (Tunneling)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- A [Razorpay](https://razorpay.com/) account with Key ID and Key Secret.

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/asayushranjansinha/payment-integration.git
cd payment-integration
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

Open `.env` and populate the following variables:

```env
# Development/Local Setup
NGROK_URL="your-ngrok-url.ngrok-free.app" # Required for local webhook testing

# Payment Gateway - Razorpay
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_key_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"
NEXT_PUBLIC_PLAN_ID="plan_..." # Create a plan in Razorpay dashboard for subscriptions

# Application Settings
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Running the Application

You have two options for running the development environment:

**Option A: All-in-One (Recommended)**
Runs both the Next.js server and ngrok tunnel in a single terminal interface using `mprocs`.

```bash
npm run dev:all
```

**Option B: Standard**
Run the Next.js server only:

```bash
npm run dev
```

## 📜 Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run dev:all`: Runs Next.js and ngrok concurrently (requires `mprocs`).
- `npm run ngrok:dev`: Starts an ngrok tunnel to your local port 3000.
- `npm run use:local`: Configures the environment for local development (copies `.env.local` to `.env`).
- `npm run use:prod`: Configures the environment for production (copies `.env.prod` to `.env`).

## 📂 Project Structure

```
src/
├── app/
│   ├── api/             # API Routes
│   │   ├── razorpay/    # Payment creation endpoints
│   │   └── webhooks/    # Razorpay webhook listener
│   ├── payments/        # Payment page
│   ├── subscription/    # Subscription page
│   └── page.tsx         # Home page
├── features/
│   └── payments/
│       ├── razorpay/    # Razorpay specific logic/components
│       └── utils/       # Payment utilities
```

## 🔗 Webhooks

To test webhooks locally:

1. Run `npm run dev:all` (or start ngrok manually).
2. Copy the forwarding URL from ngrok (e.g., `https://your-id.ngrok-free.app`).
3. Add the webhook URL to your Razorpay Dashboard: `https://your-id.ngrok-free.app/api/webhooks`.
4. Select the events you want to listen to (e.g., `payment.captured`, `subscription.activated`).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Contact

**Ayush Ranjan Sinha**

- GitHub: [@asayushranjansinha](https://github.com/asayushranjansinha)
- LinkedIn: [Ayush Ranjan Sinha](https://linkedin.com/in/asayushranjansinha)
- Email: asayushranjansinha@gmail.com

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Ayush Ranjan Sinha](https://github.com/asayushranjansinha)
