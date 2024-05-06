# Take Home assesment

Demo: https://take-home-assessment-theta.vercel.app/
To start the app: after going into your projects directory run the following commands in your terminal

- npm install
- npm run dev

In the login screen, i prepopulate the login and password with valid user data to be able to access the database and save data and images for testing.

## Library/Tools used
- Vite
- React
- React query
- Shadcn (Radix UI, Tailwind CSS)

## Unit test
- Vitest
- React testing library

## Backend used
Appwrite - https://appwrite.io/

## Hosting
Hostinger

## Known Issue 
There seems to be some issue on the vercel server when i deploy it. Some conflict on appwrite server maybe and sometimes the session was not save/unsaved. 
if you encounter such issue upon login, just refresh the page to redirect to main screen. 

## Needs Improvement

- UI design - did not spend time on the design itself due to time constraint.
- Loading list should use skeleton loader
- Tokens and other sensitive informations should be in .ENV file (better in server)
- Unit test - dont have enough time to add more
