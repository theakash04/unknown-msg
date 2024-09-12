## Unknown Message

[Un-Message](https://un-msg.vercel.app) lets you receive anonymous messages via a unique link. Share your link to collect messages without registration, read them anonymously, and manage message acceptance. The platform is responsive and works on any device.

### Features

- **Get anonymous messages** from anyone with your unique link
- **Read messages** without knowing who sent them
- **No registration or login required** for sending messages
- **Control** when you want to accept messages
- **Responsive design** for seamless experience on any device

### How to Use

1. Go to the website: [https://un-msg.vercel.app/](https://un-msg.vercel.app/)
2. Login or create Account
3. Get your unique link and share it to the other peoples
4. Now peoples can send their messages to you annonymously
5. Read the recieved messages in dashboard

### Installation

To run the project locally:

Clone the repository:

```bash
git clone https://github.com/theakash04/unknown-msg
```

giving this file so that you can make your own env and run this project locally and the .env.example data inyour .env with your configuration `url`

```bash
vim .env.example
touch .env
```

Install dependencies:

```bash
cd unlnown-msg
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000`

### Technologies Used

- **Next.js** for building the user interface and backend
- **Vercel** for hosting the website
- **Resend** for sending emails without a backend server
- **shadcn/ui** for modern UI development and theming
- **ZOD** for schema validation and ensuring data integrity by validating inputs
- **MongoDB** for storing messages and user data
- **NextAuth** for signIn authentication


### Contributing

If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/theakash04/unknown-msg).

### License

This project is licensed under the [MIT License](LICENSE).
