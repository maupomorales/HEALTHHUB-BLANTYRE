# Health Hub Blantyre - Mobile App

A comprehensive mobile health directory application for Blantyre, Malawi, built with React Native.

## Features

- **Healthcare Directory**: Find pharmacies, dentists, opticians, gyms, and skincare services
- **Emergency Services**: Quick access to emergency contacts, hospitals, and health centers
- **Location-based Search**: Search healthcare providers by area (Blantyre, Limbe, Chichiri, etc.)
- **Contact Integration**: Direct calling and WhatsApp messaging with healthcare providers
- **Emergency Tips**: Important guidelines for different emergency situations
- **Contact Form**: Get in touch with the Health Hub team

## Screens

1. **Home Screen**: Overview of services and featured providers
2. **Search Screen**: Find healthcare services by area and category
3. **Emergency Screen**: Emergency contacts, hospitals, and response tips
4. **Contact Screen**: Contact form and business information

## Technology Stack

- **React Native 0.73.0**
- **React Navigation 6.x**
- **React Native Paper** (Material Design components)
- **React Native Vector Icons**
- **React Native Linear Gradient**
- **TypeScript**

## Prerequisites

Before running the app, make sure you have:

- Node.js (>= 16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HEALTHHUB-BLANTYRE
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Install Android SDK and build tools
   - Create an Android Virtual Device (AVD) or connect a physical device

## Running the App

### Development Mode

1. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android**
   ```bash
   npm run android
   # or
   yarn android
   ```

3. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   # or
   yarn ios
   ```

### Building for Production

1. **Android APK**
   ```bash
   npm run build-android
   # or
   yarn build-android
   ```

2. **iOS** (requires macOS and Xcode)
   - Open `ios/HealthHubBlantyre.xcworkspace` in Xcode
   - Select your target device or simulator
   - Build and run

## Project Structure

```
├── src/
│   ├── screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── EmergencyScreen.tsx
│   │   └── ContactScreen.tsx
│   └── theme/            # App theme configuration
│       └── theme.ts
├── android/              # Android-specific files
├── ios/                  # iOS-specific files
├── App.tsx              # Main app component
├── index.js             # App entry point
└── package.json         # Dependencies and scripts
```

## Key Features Implementation

### Navigation
- Stack navigation for screen transitions
- Custom header styling
- Back button handling

### Healthcare Data
- Comprehensive database of healthcare providers
- Categorized by service type and location
- Contact information and ratings

### Emergency Services
- Quick access emergency numbers
- Hospital and clinic listings
- Emergency response guidelines

### Contact Integration
- Direct phone calling
- WhatsApp messaging
- Email integration
- Map navigation

## Customization

### Adding New Healthcare Providers
Edit the service data in the respective screen files:
- `SearchScreen.tsx` - Main service directory
- `EmergencyScreen.tsx` - Emergency services

### Styling
- Theme configuration: `src/theme/theme.ts`
- Component styles: Individual screen files
- Material Design: React Native Paper components

### Icons
- Vector icons: React Native Vector Icons
- Icon sets: Material Icons, FontAwesome, etc.

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **iOS build issues**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Vector icons not showing**
   - For iOS: Ensure fonts are linked in Info.plist
   - For Android: Ensure fonts are in android/app/src/main/assets/fonts/

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both platforms
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: healthhubconnect071@gmail.com
- Phone: +265 897976524

## About

Health Hub Blantyre is your complete health directory for Blantyre, Malawi. We connect residents with trusted healthcare providers, making it easier to find quality care when you need it most.

---

**Built with ❤️ for the people of Blantyre, Malawi**