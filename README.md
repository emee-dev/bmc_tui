# 🧃 TUI BuyMeACoffee Clone

This is a developer-focused clone of [BuyMeACoffee](https://www.buymeacoffee.com), reimagined with **terminal-inspired aesthetics** using [WebTUI](https://webtui.ironclad.sh/). It's designed to feel native to developers who live in the terminal.

> ⚠️ Note: This is my first time working with TUI (Terminal UI) frameworks, so this project represents a personal exploration of WebTUI, and how far it can be pushed to create expressive UIs for the web.

## 💡 Motivation

The goal of this project is to combine the minimalist charm of terminal UIs with a donation-based app experience — ideal for OSS maintainers, indie hackers, and developers.

To bridge the familiarity gap, I adapted WebTUI components to a ShadCN-inspired component structure. Instead of placing components under `@/components/ui`, they live under `@/components/tui`, reflecting their terminal-centric design philosophy.

## 🧩 Components Used

I’ve successfully ported and customized the following WebTUI components:

- ✅ **Button** – Styled for both light/dark themes with terminal consistency
- ✅ **Dialog** – Modal-like interface for user confirmations
- ✅ **Tooltip** – Helpful hints in a minimal terminal style

## 🧪 Tech Stack

- [WebTUI CSS](https://webtui.ironclad.sh/)
- [Next.js](https://nextjs.org/)
- Tailwind CSS v4 (using the new `tailwindcss/colors` and utility-first theming)

## 📸 Demo

Check out the deployed app:

👉 [Vercel](https://bmc-tui.vercel.app/)
👉 [Github](https://github.com/emee-dev/bmc_tui)
