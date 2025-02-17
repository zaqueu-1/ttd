# tá pago - your workout buddy 🏋️‍♂️

A React-based workout planning application that helps you organize and track your exercises. Create, edit, and manage your workout routines with an intuitive interface.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Features 🚀

- **Exercise Management**: Add, edit, and delete exercises
- **Workout Details**: Track sets, reps, and weights for each exercise
- **Progress Tracking**: Mark exercises as completed
- **Data Export**: Export your workouts to Excel files or as images
- **Data Import**: Load previously saved workout routines
- **Quick Access**: Save and manage your favorite workouts
- **Workout Sharing**: Share workouts via URL
- **Local Storage**: Your data persists between sessions
- **Responsive Design**: Works on both desktop and mobile devices
- **Internationalization**: Full support for English and Portuguese languages

## Live Demo 🌐

Check out the live application: [Try on Vercel](https://tapago-fit.vercel.app/)

## Installation 💻

1. Clone the repository:

```bash
git clone https://github.com/zaqueu-1/ttd.git
```

2. Navigate to the project directory:

```bash
cd ttd
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Technologies Used 🛠️

- React.js
- JavaScript (ES6+)
- CSS3
- React Icons
- React Toastify
- XLSX (for Excel file handling)
- html2canvas (for image export)
- Animate.css
- LocalStorage API
- React-i18next (for internationalization)

## Project Structure 📁

```
src/
├── components/
│   ├── exercisesForm/
│   │   ├── ExercisesForm.jsx
│   │   └── exercisesForm.css
│   ├── saveModal/
│   │   ├── SaveModal.jsx
│   │   └── saveModal.css
│   ├── saveControls/
│   │   ├── SaveControls.jsx
│   │   └── saveControls.css
│   └── noExercises/
│       ├── NoExercises.jsx
│       └── noExercises.css
├── translations/
│   ├── en.json
│   └── pt.json
├── i18n.js
├── App.js
└── index.js
```

## Features in Detail 📝

### Exercise Management

- Create new exercises with name, sets, reps, and weight
- Edit existing exercises
- Delete exercises
- Mark exercises as completed

### Data Persistence & Sharing

- All data is automatically saved to localStorage
- Export workouts to Excel files for spreadsheet compatibility
- Export workouts as high-quality PNG images for easy sharing
- Quick Access system for favorite workouts
  - Save workouts with custom names
  - Access saved workouts with one click
  - Update existing workouts
  - Delete saved workouts
  - Instant loading of saved routines
- Share workouts directly via URL
  - Generate shareable links with encoded workout data
  - Recipients can load workouts instantly by opening the link
  - Automatic workout import from shared URLs
  - Clean URLs (workout data is removed after loading)
- Import previously saved workout files

### Export Options

- **Excel Export**: Generate a structured Excel file with exercise details
- **Image Export**: Create a high-quality PNG image of your workout list
  - Clean, visually appealing format
  - Perfect for sharing on social media or messaging apps
  - Maintains the app's visual style
  - 2x scale for crisp display on all devices
- **Quick Access**: Save workouts for easy access
  - Dedicated "My Workouts" section
  - Simple save and load functionality
  - Manage multiple workout routines
  - Quick switching between different workouts
- **URL Sharing**: Share workouts via direct links
  - One-click link generation
  - Automatic clipboard copy
  - Instant workout loading for recipients
  - Works across all devices and platforms

### User Interface

- Clean and intuitive design
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Interactive hover effects
- Toast notifications for user feedback

## Internationalization (i18n) 🌐

The application supports multiple languages through React-i18next:

### Supported Languages

- 🇺🇸 English (default)
- 🇧🇷 Portuguese

### Language Features

- Automatic language detection based on browser settings
- Language persistence through LocalStorage
- Easy language switching through the interface
- Full translation coverage for all UI elements including:
  - Form labels and placeholders
  - Buttons and controls
  - Success and error messages
  - Modal dialogs
  - Helper texts

### Translation Structure

Translations are organized in JSON files under the `src/translations` directory:

- `en.json` - English translations
- `pt.json` - Portuguese translations

Each translation file follows a structured hierarchy for easy maintenance and scalability.

### Adding New Languages

To add support for a new language:

1. Create a new translation file in `src/translations`
2. Add the language option to the language switcher
3. Import and configure the new language in `i18n.js`

## Upcoming Features 🔜

- [ ] User authentication
- [ ] Cloud data synchronization
- [ ] Workout history tracking
- [ ] Exercise categories
- [ ] Progress charts

## Support 💪

If you like this project, please give it a ⭐️!
