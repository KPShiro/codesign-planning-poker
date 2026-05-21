---
name: create-component
description: >
    Generates production-ready React components following the user's personal coding style:
    functional components with TypeScript, Tailwind CSS for styling, and Zod schemas for
    prop validation. Use this skill whenever the user asks to create, scaffold, build, or
    generate a React component — even if they describe a UI element they want coded.
    Trigger also when the user says "button", "modal", "form", "card", "input", "navbar",
    "sidebar", "table", "dropdown", or any other UI building block — if it sounds like
    a React component, use this skill. Always generate a complete, file-ready component,
    never just a snippet.
---

# React Component Creator

Generates complete, production-ready React components following the user's personal style.

## User's Stack

- **Framework**: React (functional components)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **Prop validation**: Zod schema + inferred TypeScript types
- **Exports**: named export
- **File**: one `.tsx` file per component

---

## Component Creation Workflow

### 1. Understand the requirements

Before writing any code, answer these questions:

- What is the **name** of the component? (kebab-case)
- What **props** does it accept? (types, optionality, default values)
- Is it **stateful** (has local state) or **presentational** (display only)?

If anything is unclear — ask the user before writing code.

### 2. File structure (always in this order)

```
1. Imports (React, external libraries, local)
2. Zod schema (ComponentNameSchema)
3. Inferred Props type from Zod
4. Component definition (export const ComponentName = ...)
```

### 3. Component template

Always use this template as a starting point:

```tsx
import { z } from "zod";

const {ComponentName}Schema = z.object({
  // props here
});

type {ComponentName}Props = z.infer<typeof {ComponentName}Schema>;

export function {ComponentName}({ ...props }: {ComponentName}Props) {
  return (
    <div>
      {/* content */}
    </div>
  );
};
```

---

## Tailwind CSS Rules

- Use **utility classes** directly in JSX — no separate CSS files
- Handle style variants via a **lookup object** (never string concatenation):

```tsx
const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
} satisfies Record<string, string>;
```

- For conditional classes use `cn` helper available in `/utils`, otherwise a template literal with a ternary
- Always add **focus:**, **hover:**, **disabled:**, **enabled:** states where applicable
- Use only colors defined as design tokens in `index.css` theme (e.g. primary, on-primary, danger, on-danger, surface-0, on-surface-0, etc.)
- Accessibility: always use `aria-*` attributes and semantic HTML

---

## TypeScript Rules

- **Strict mode** — no `any`, no unjustified `as` casts
- Props always **inferred from Zod**, never written manually
- For event handlers use built-in React types: `React.MouseEventHandler<HTMLButtonElement>`
- Type `children` as `React.ReactNode` (add to the schema if needed)

---

## Zod Schema Rules

- Schema name: `{ComponentName}Schema`
- Use `.optional()` for optional props
- Use `.default()` for default values
- Use `z.enum([...])` for props with a fixed set of values
- For callbacks, omit from Zod and extend the type manually (see below)

### Callbacks in Zod

Zod does not validate functions at runtime — add them directly to the type intersection:

```tsx
const ButtonSchema = z.object({
    label: z.string(),
    variant: z.enum(['primary', 'secondary']).default('primary'),
    disabled: z.boolean().default(false),
});

// Extend the type with callbacks
type ButtonProps = z.infer<typeof ButtonSchema> & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
```

---

## Pre-delivery Checklist

- [ ] Zod schema with correct types
- [ ] Props type inferred from Zod (+ manual callbacks if needed)
- [ ] Tailwind classes — variants via lookup object
- [ ] Semantic HTML + aria attributes (for buttons, inputs, dialogs)
- [ ] Default prop values via `.default()` in Zod or destructuring
- [ ] Named export
- [ ] No `any`, no unjustified `as` casts
- [ ] Component works out of the box in a standard Vite/Next project with Tailwind and Zod

---

## Output

Always generate:

1. **Component file** — complete `.tsx` ready to copy
2. **Short description** — what the component does, what props it accepts, how to use it (2–4 sentences)
3. **Usage example** — one JSX snippet showing typical usage

Do not generate tests, Storybook stories, or folder structure unless the user explicitly asks for them.
