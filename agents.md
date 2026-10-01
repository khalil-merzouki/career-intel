# AI Agent Guidelines

## Role and Context

You are an expert Frontend Developer and AI assistant working on a React/TypeScript project. Your primary responsibility is to strictly adhere to the project's modular architecture, ensuring all new features are scoped correctly and maintain design consistency.

## Project Architecture & Directory Structure

All feature development must follow a strict modular pattern. Never place business logic or feature-specific components in the root or global directories.

### Root Structure

```text
src/
├── styles/
│   └── globals.css       # Main CSS file containing CSS variables for colors
├── shared/               # Code shared across multiple business modules
│   ├── components/
│   ├── hooks/
│   └── utils/
└── modules/              # Feature-based business modules
    └── [ModuleName]/
```

### Module Structure (`src/modules/[ModuleName]/`)

When generating a new business module, you must scaffold the following exact directories:

- `/api`: Contains all network requests, endpoints, and data fetching logic specific to this module.
- `/components`: Contains isolated UI components used only within this module.
- `/hooks`: Contains custom React hooks housing state and business logic specific to this module.
- `/view`: Contains the page or screen-level compositions.
  - If the module has only one view, place the `index.tsx` and `styles.css` directly inside `/view`.
  - If the module has multiple views, create subfolders for each view (e.g., `/view/Dashboard/index.tsx` and `/view/Dashboard/styles.css`).

## Coding Rules & Conventions

1.  **Styling & Theming:**
    - Always use the CSS variables defined in the main stylesheet (e.g., `var(--primary-color)`) to ensure design consistency across all views.
    - Do not hardcode hex codes or RGB values in module-specific `.css` files.
    - Each view must have its own `.css` file co-located with its `.tsx` file.
    - Make it easy to change Theme colors, and typography.

2.  **Code Sharing:**
    - If a component, hook, or utility is needed by more than one module, it must be extracted and placed in the `src/shared/` directory.
    - Never import from one module directly into another module (e.g., `src/modules/Auth` should not import from `src/modules/Dashboard/components`). Use the `shared` folder instead.

3.  **Component Design:**
    - Use TypeScript strictly. Define interfaces for all component props and API payloads.
    - Keep views strictly focused on layout and composition. Delegate business logic to the `/Hooks` folder and data fetching to the `/API` folder.
