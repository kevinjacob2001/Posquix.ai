# Posquix.ai - AI-Powered Posture Analysis

![Posture Analysis Demo](public/demo.gif)

Posquix.ai is a real-time AI-powered posture analysis web application that helps users maintain proper sitting posture. Using advanced machine learning model, it provides instant feedback on your posture alignment.

## Features

- 🎯 **Real-time Posture Detection**: Analyzes ear-to-shoulder alignment in real-time
- 🤖 **AI-Powered Analysis**: Utilizes TensorFlow.js and PoseNet for accurate pose estimation
- 🔄 **Instant Feedback**: Provides immediate visual and textual feedback on posture
- 🌓 **Dark/Light Mode**: Supports both dark and light themes for comfortable viewing
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- 🎨 **Modern UI**: Features a clean, professional interface with smooth animations

## Tech Stack

- **Frontend Framework**: Next.js 15.3
- **AI/ML**: TensorFlow.js, PoseNet
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **UI Components**: Custom components with Heroicons

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- A modern web browser with camera access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kevinjacob2001/Posquix.ai
   cd Posquix.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## How It Works

1. **Pose Detection**: Uses PoseNet to detect key body points in real-time
2. **Posture Analysis**: 
   - Measures ear-to-shoulder alignment
   - Checks head tilt and shoulder levelness
   - Analyzes vertical and horizontal positioning
3. **Feedback System**:
   - Visual indicators for good/bad posture
   - Real-time posture improvement suggestions
   - Status updates with specific alignment guidance

## Project Structure

```
posquix-ai/
├── app/
│   ├── components/         # React components
│   ├── theme/             # Theme configuration
│   ├── utils/             # Utility functions
│   ├── layout.tsx         # App layout
│   └── page.tsx           # Main page
├── public/                # Static assets
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TensorFlow.js team for the amazing ML tools
- PoseNet contributors for the pose estimation model
- Next.js team for the excellent framework

## Contact

Kevin Jacob 

Project Link: [https://github.com/kevinjacob2001/Posquix.ai](https://github.com/kevinjacob2001/Posquix.ai)

---

Made with ❤️ by Kevin Jacob
