# 🏠 INFO CASAS CHALLENGE 🏠

## Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as completed with visual feedback
- ✅ Filter tasks (All, Completed)
- ✅ Search tasks by name
- ✅ Cross-platform support (iOS, Android, Web)
- ✅ Local storage (AsyncStorage for mobile, localStorage for web)
- ✅ Modern UI/UX with InfoCasas-inspired design
- ✅ Responsive design optimized for both mobile and web

## Prerequisites

- **Node.js**: Version 18.0.0 or higher (Tested with v24.1.0)
- **npm**: Version 8.0.0 or higher (Tested with v11.4.2)
- **Expo CLI**: Latest version

### Project Dependencies

This project uses the following exact versions:

- **React**: 19.0.0
- **React Native**: 0.79.5
- **Expo**: ~53.0.20
- **TypeScript**: ~5.8.3

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/eliasg52/infocasas-challenge
   cd ic-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory with the following content:

   ```
   EXPO_PUBLIC_API_URL=https://dummyjson.com/todos
   ```

   > **Note**: The `.env` file is already in `.gitignore` to keep sensitive data out of the repository.

## Running the Application

### For Web Development

```bash
npm run web
```

The application will open in your default browser at `http://localhost:8081`

### For iOS Development

```bash
# First, generate native iOS files
npx expo prebuild --clean

# Then run the iOS app
npm run ios
```

### For Android Development

```bash
# First, generate native Android files
npx expo prebuild --clean

# Then run the Android app
npm run android
```

## Key Components

- **AddTask**: Input component for adding new tasks
- **TaskList**: Main list component with filtering and search
- **TaskItem**: Individual task item with edit/delete actions
- **TaskFilter**: Filter buttons (All, Completed)
- **TaskSearch**: Search functionality
- **EditTaskModal**: Modal for editing tasks
- **useTasks**: Custom hook for task management

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **AsyncStorage**: Local storage for mobile
- **localStorage**: Local storage for web
- **Expo Linear Gradient**: Gradient backgrounds
- **Ionicons**: Icon library

## Platform-Specific Features

### Web

- Responsive design with max-width container
- Visible scroll indicators
- Larger typography and spacing
- localStorage for data persistence

### Mobile

- Native mobile UI/UX
- AsyncStorage for data persistence
- Touch-optimized interactions
- Platform-specific styling

## Development Notes

- The app automatically detects the platform and uses appropriate storage methods
- All UI components are responsive and adapt to different screen sizes
- The design follows modern mobile-first principles with web optimization
- Environment variables are prefixed with `EXPO_PUBLIC_` for client-side access

## Troubleshooting

If you encounter issues:

1. **Clear cache**: `npx expo start --clear`
2. **Reset project**: `npm run reset-project`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. **Regenerate native files**: `npx expo prebuild --clean`
