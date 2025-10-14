# SaaS Dashboard Frontend

A modern, responsive authentication system built with React, Redux Toolkit, Redux Saga, and Tailwind CSS.

## Features

- **Sign In/Sign Up Pages**: Beautiful, responsive authentication forms
- **Redux State Management**: Centralized state management with Redux Toolkit
- **Redux Saga**: Side effect management for API calls
- **Tailwind CSS**: Modern, utility-first CSS framework
- **Reusable Components**: Modular UI components for consistency
- **Form Validation**: Client-side validation with error handling
- **Protected Routes**: Route protection based on authentication status
- **Responsive Design**: Mobile-first responsive design

## Tech Stack

- **React 19.1.1**: Modern React with hooks
- **Redux Toolkit**: Efficient Redux state management
- **Redux Saga**: Side effect management
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Logo.jsx       # Logo component
│   │   ├── Card.jsx       # Card container
│   │   ├── Input.jsx      # Form input with icons
│   │   ├── Button.jsx     # Button component
│   │   ├── Link.jsx       # Link component
│   │   └── index.js       # Component exports
│   ├── icons/             # SVG icon components
│   │   └── index.js       # Icon exports
│   └── ProtectedRoute.jsx # Route protection component
├── pages/                 # Page components
│   ├── SignIn.jsx         # Sign in page
│   ├── SignUp.jsx         # Sign up page
│   └── Dashboard.jsx      # Protected dashboard
├── store/                 # Redux store
│   ├── authSlice.js       # Authentication slice
│   ├── authSaga.js        # Authentication saga
│   └── index.js           # Store configuration
├── App.jsx                # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Authentication

The app includes a complete authentication system:

- **Sign In**: Use `test@example.com` / `password` for demo login
- **Sign Up**: Create a new account with any valid email
- **Protected Routes**: Dashboard is only accessible when authenticated

### Components

#### Logo Component
```jsx
import { Logo } from './components/ui';

<Logo size="md" /> // sm, md, lg, xl
```

#### Input Component
```jsx
import { Input } from './components/ui';
import { EnvelopeIcon } from './components/icons';

<Input
  type="email"
  placeholder="Email Address"
  icon={EnvelopeIcon}
  error={error}
  value={value}
  onChange={handleChange}
/>
```

#### Button Component
```jsx
import { Button } from './components/ui';

<Button
  variant="primary" // primary, secondary, outline, ghost, danger
  size="md"        // sm, md, lg, xl
  loading={loading}
  onClick={handleClick}
>
  Click Me
</Button>
```

### Redux Store

The app uses Redux Toolkit with the following structure:

```javascript
// Auth slice actions
dispatch(signInStart({ email, password }));
dispatch(signUpStart({ name, email, password }));
dispatch(signOut());
dispatch(clearErrors());
```

### Styling

The app uses Tailwind CSS with custom color palette:

- **Primary**: Blue tones (#667eea)
- **Secondary**: Yellow tones (#facc15)
- **Accent**: Purple tones (#a855f7)

Custom utility classes are available:
- `.btn-primary`, `.btn-secondary`
- `.input-field`
- `.card`

## API Integration

The current implementation uses mock API calls. To integrate with a real API:

1. Update the API functions in `src/store/authSaga.js`
2. Replace mock responses with actual API calls
3. Update error handling for real API responses

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality. Key rules:
- React hooks rules
- Modern JavaScript features
- Consistent formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.