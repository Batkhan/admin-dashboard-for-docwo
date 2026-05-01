# Admin Dashboard

A simple and scalable React dashboard for managing users. Built with Vite, Tailwind CSS, and Zustand.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Key Decisions

### Architecture
I used a feature-based folder structure inside the `app/` directory to keep things organized:
- `components/ui/`: Reusable UI elements like buttons and inputs.
- `features/users/`: Everything related to the user list, search, and pagination.
- `services/`: API call logic (kept separate from the UI).
- `store/`: Zustand state for the search and pagination.

### State Management
I used **Zustand** for the global UI state (search and page number). It's much simpler than Redux and fits this project perfectly without adding too much boilerplate. For data fetching, I used a custom hook (`useUsers`) to handle loading and error states instead of putting that logic directly in the components.

### Performance
- **Code Splitting:** Used React Router v7's built-in routing to automatically lazy-load pages.
- **Search Debouncing:** Added a `useDebounce` hook so the API isn't called on every single keystroke.
- **URL Params:** Synced the search and pagination with the URL so that refreshing the page doesn't reset your filters.

### Assumptions & Trade-offs
- **Tailwind v4:** I used the new Tailwind v4 where the theme is configured directly in the CSS file. It's faster and avoids having a separate config file.
- **No React Query:** I decided to write a custom fetching hook instead of using `react-query` to keep the bundle size small and because I don't know react-query.
- **Native CSS:** I didn't use `clsx` or `tailwind-merge` to keep the styling logic straightforward and easy to read.
