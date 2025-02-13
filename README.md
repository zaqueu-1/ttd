# tá pago - your workout buddy 🏋️‍♂️

A React-based workout planning application that helps you organize and track your exercises. Create, edit, and manage your workout routines with an intuitive interface.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Features 🚀

- **Exercise Management**: Add, edit, and delete exercises
- **Workout Details**: Track sets, reps, and weights for each exercise
- **Progress Tracking**: Mark exercises as completed
- **Data Export**: Export your workouts to Excel files
- **Data Import**: Load previously saved workout routines
- **Local Storage**: Your data persists between sessions
- **Responsive Design**: Works on both desktop and mobile devices

## Live Demo 🌐

Check out the live application: [Try on Vercel](https://ttd-kappa.vercel.app/)

## Installation 💻

1. Clone the repository:
\`\`\`bash
git clone https://github.com/zaqueu-1/ttd.git
\`\`\`

2. Navigate to the project directory:
\`\`\`bash
cd ttd
\`\`\`

3. Install dependencies:
\`\`\`bash
npm install
\`\`\`

4. Start the development server:
\`\`\`bash
npm start
\`\`\`

## Technologies Used 🛠️

- React.js
- JavaScript (ES6+)
- CSS3
- React Icons
- React Toastify
- XLSX (for Excel file handling)
- Animate.css
- LocalStorage API

## Project Structure 📁

\`\`\`
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
├── App.js
└── index.js
\`\`\`

## Features in Detail 📝

### Exercise Management
- Create new exercises with name, sets, reps, and weight
- Edit existing exercises
- Delete exercises
- Mark exercises as completed

### Data Persistence
- All data is automatically saved to localStorage
- Export workouts to Excel files
- Import previously saved workout files

### User Interface
- Clean and intuitive design
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Interactive hover effects
- Toast notifications for user feedback

## Upcoming Features 🔜

- [ ] User authentication
- [ ] Cloud data synchronization
- [ ] Workout history tracking
- [ ] Exercise categories
- [ ] Progress charts

## Support 💪

If you like this project, please give it a ⭐️!" 