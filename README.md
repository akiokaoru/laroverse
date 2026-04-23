# Laroverse - Family Games Collection

Laroverse is a web application featuring a collection of family-friendly games, starting with the popular social deduction game "One Night Werewolf".

## 🎮 Games Included

### One Night Werewolf
A fast-paced social deduction game where players try to identify werewolves among them before it's too late.

#### Features:
- **3-6 Players**: Supports small to medium groups
- **Multiple Roles**: Werewolf, Villager, Seer, Robber, Troublemaker, and Insomniac
- **Night & Day Phases**: Complete game flow with role actions
- **Voting System**: Democratic elimination process
- **Modern UI**: Beautiful, responsive design with Tailwind CSS

#### Game Rules:
1. Each player receives a secret role
2. During the night phase, special roles perform their actions
3. During the day phase, players discuss and vote
4. Werewolves win if they equal or outnumber villagers
5. Villagers win if all werewolves are eliminated

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Icons**: Emoji characters for universal compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd laroverse
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
laroverse/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── page.tsx         # Home page
│   │   ├── werewolf/        # One Night Werewolf game
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Reusable React components
│   │   └── werewolf/        # Game-specific components
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   └── app/                 # App router pages
├── public/                  # Static assets
└── README.md
```

## 🎯 Game Components

### Core Components:
- **GameSetup**: Player configuration and game initialization
- **NightPhase**: Role-specific night actions
- **DayPhase**: Discussion and voting
- **VotingPhase**: Results and elimination
- **GameOver**: Winner announcement and replay options

### Game Logic:
- **useWerewolfGame**: Central game state management
- **Role System**: Dynamic role allocation based on player count
- **Win Conditions**: Automatic winner detection

## 🎨 Design Features

- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Easy on the eyes during gameplay
- **Glass Morphism**: Modern UI with backdrop blur effects
- **Smooth Animations**: Transitions and hover states
- **Accessibility**: Semantic HTML and keyboard navigation

## 🔧 Configuration

### Game Settings (in `src/hooks/useWerewolfGame.ts`):
- Player count limits
- Role distribution
- Game phase timing
- Win conditions

### Styling (in `tailwind.config.js`):
- Custom color scheme
- Theme extensions
- Component variants

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Future Games

Planned additions to the Laroverse collection:
- Codenames
- The Resistance
- Secret Hitler
- Custom game creator

## 🐛 Bug Reports

If you encounter any issues, please:
1. Check the existing issues
2. Create a new issue with details
3. Include steps to reproduce
4. Add screenshots if applicable

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Based on the "One Night Werewolf" board game by Bezier Games
- Built with modern web technologies for the best gaming experience
- Designed for family fun and social interaction
