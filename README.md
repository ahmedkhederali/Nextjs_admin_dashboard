# 🛠️ Mini Admin Dashboard – Next.js 15 Assessment

This is a **Mini Admin Dashboard** built with **Next.js 15 (App Router)**. It showcases modern frontend skills such as routing, protected middleware, state management, internationalization, API integration, form handling, and reusable components.

---
## How To Work 
- run **npm i --legacy-peer-deps**
- add file .env.local that conation 
-NEXT_PUBLIC_STATIC_TOKEN that have the token add                
-NEXT_PUBLIC_URL=https://mini-admin-portal.vercel.app/api/users

## 🚀 Features

### ✅ **Authentication**
- Local-only login with hardcoded credentials.
- Middleware-protected routes (e.g., `/dashboard`, `/users/:id`).
- Token-based authentication stored in cookies and localStorage.

### 🌍 **Localization**
- English and Arabic support with dynamic RTL switching.
- Route-based locale detection using `next-intl`.

### 👤 **User Management**
- Dashboard listing users with pagination, sorting, and filtering.
- User details page via dynamic route.
- Modals for creating, editing, and deleting users with form validation.

### 🎯 **State Management**
- Redux Toolkit for managing global state (e.g., users, authentication).

### 🧪 **API Integration**
- Proxy API routes for fetching, creating, updating, and deleting users.
- Secure token-based API requests.

### 💅 **UI/UX**
- Tailwind CSS + shadcn/ui components for a modern and responsive design.
- Accessible forms and modals.

### 🧪 **Testing**
- Unit tests for components and hooks using Jest & React Testing Library.

---

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.dev/)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)
- **Utilities**: `clsx`, `tailwind-merge`

---

## 📁 Project Structure


![Image](https://github.com/user-attachments/assets/dba9038a-2026-461e-bb8e-a65655a67f1e)
![Image](https://github.com/user-attachments/assets/df3af489-0b94-463c-81f1-45d6aa3da2f8)
![Image](https://github.com/user-attachments/assets/93d03e92-6cc9-4191-8342-91626923a277)
![Image](https://github.com/user-attachments/assets/cc333004-9b10-43e8-9957-8675ca321f43)
![Image](https://github.com/user-attachments/assets/d6c282f8-8f2b-47a4-89e3-95bbfeed3b3d)
![Image](https://github.com/user-attachments/assets/cf0a686c-8076-4615-b5a5-c8fa1e405ba4)
![Image](https://github.com/user-attachments/assets/ef6ade93-9dc5-46fb-b5a3-a1476dc44592)
![Image](https://github.com/user-attachments/assets/7c16a390-bf90-406f-b956-a71bef7e4221)
![Image](https://github.com/user-attachments/assets/4aa08ee2-19ac-4d3d-a52d-e3c0eda3f6d6)
![Image](https://github.com/user-attachments/assets/df076548-ed60-4fea-b446-d15ca648a394)
![Image](https://github.com/user-attachments/assets/45e03311-87f5-451e-b084-f73d31b2a97d)